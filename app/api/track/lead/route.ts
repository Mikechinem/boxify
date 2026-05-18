import { NextRequest, NextResponse } from "next/server";

type MetaLeadPayload = {
  eventId?: string;
  eventName?: string;
  eventSourceUrl?: string;
  fbp?: string;
  fbc?: string;
  customData?: Record<string, unknown>;
};

function removeEmptyValues<T extends Record<string, unknown>>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => {
      return value !== undefined && value !== null && value !== "";
    })
  );
}

function getClientIp(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim();
  }

  return (
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    undefined
  );
}

function getMetaDatasetIds() {
  const datasetIdsFromPluralEnv =
    process.env.META_DATASET_IDS?.split(",")
      .map((id) => id.trim())
      .filter(Boolean) ?? [];

  const fallbackDatasetId = process.env.META_DATASET_ID
    ? [process.env.META_DATASET_ID]
    : [];

  return Array.from(new Set([...fallbackDatasetId, ...datasetIdsFromPluralEnv]));
}

export async function GET() {
  return NextResponse.json({
    success: true,
    route: "/api/track/lead",
    message: "Meta lead tracking route is active.",
    datasetCount: getMetaDatasetIds().length,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as MetaLeadPayload;

    const datasetIds = getMetaDatasetIds();
    const accessToken = process.env.META_ACCESS_TOKEN;
    const apiVersion = process.env.META_GRAPH_API_VERSION || "v25.0";
    const testEventCode = process.env.META_TEST_EVENT_CODE;

    if (datasetIds.length === 0 || !accessToken) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing META_DATASET_ID/META_DATASET_IDS or META_ACCESS_TOKEN environment variable.",
        },
        { status: 500 }
      );
    }

    if (!body.eventId) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing eventId.",
        },
        { status: 400 }
      );
    }

    const clientIpAddress = getClientIp(req);
    const userAgent = req.headers.get("user-agent") || undefined;

    const metaEvent = removeEmptyValues({
      event_name: body.eventName || "Lead",
      event_time: Math.floor(Date.now() / 1000),
      event_id: body.eventId,
      action_source: "website",
      event_source_url: body.eventSourceUrl,

      user_data: removeEmptyValues({
        client_ip_address: clientIpAddress,
        client_user_agent: userAgent,
        fbp: body.fbp,
        fbc: body.fbc,
      }),

      custom_data: removeEmptyValues({
        content_name: "Boxify WhatsApp Lead",
        content_category: "Boxify Landing Page",
        ...body.customData,
      }),
    });

    const metaPayload = removeEmptyValues({
      data: [metaEvent],
      ...(testEventCode
        ? {
            test_event_code: testEventCode,
          }
        : {}),
    });

    const results = await Promise.all(
      datasetIds.map(async (datasetId) => {
        try {
          const response = await fetch(
            `https://graph.facebook.com/${apiVersion}/${datasetId}/events?access_token=${accessToken}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(metaPayload),
            }
          );

          const result = await response.json();

          return {
            datasetId,
            success: response.ok,
            status: response.status,
            meta: result,
          };
        } catch (error) {
          return {
            datasetId,
            success: false,
            status: 500,
            meta: {
              error:
                error instanceof Error
                  ? error.message
                  : "Meta CAPI request failed.",
            },
          };
        }
      })
    );

    const failedResults = results.filter((result) => !result.success);

    if (failedResults.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "One or more Meta CAPI requests failed.",
          results,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      results,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong while sending the Meta CAPI event.",
      },
      { status: 500 }
    );
  }
}