import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

type FulfilmentRequestPayload = {
  name?: string;
  email?: string;
  leadSource?: string;
  sourceSection?: string;
  sourceLabel?: string;
  eventId?: string;
  attribution?: {
    landingPage?: string;
    currentUrl?: string;
    referrer?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmContent?: string;
    utmTerm?: string;
    fbclid?: string;
    ttclid?: string;
  };
};

type CleanFulfilmentRequest = {
  name: string;
  email: string;
  leadSource: string;
  sourceSection: string;
  sourceLabel: string;
  eventId: string;
};

function cleanText(value: unknown) {
  return String(value || "").trim();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function removeEmptyValues<T extends Record<string, unknown>>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => {
      return value !== undefined && value !== null && value !== "";
    })
  );
}

function getWhatsAppBaseUrl() {
  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  if (!rawNumber) {
    throw new Error("Missing NEXT_PUBLIC_WHATSAPP_NUMBER environment variable.");
  }

  let cleanedNumber = rawNumber.replace(/[^\d]/g, "");

  if (cleanedNumber.startsWith("0")) {
    cleanedNumber = `234${cleanedNumber.slice(1)}`;
  }

  if (!cleanedNumber.startsWith("234")) {
    throw new Error(
      "NEXT_PUBLIC_WHATSAPP_NUMBER must be in Nigerian international format, for example 2347064969603."
    );
  }

  return `https://wa.me/${cleanedNumber}`;
}

function buildWhatsAppMessage(data: CleanFulfilmentRequest) {
  return `
Hi Boxify, I just submitted my fulfilment request.

Name: ${data.name}
Email: ${data.email}

Please explain how Boxify can help with my Abuja/Lagos fulfilment.
  `.trim();
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

function getCookie(req: NextRequest, name: string) {
  return req.cookies.get(name)?.value;
}

function sha256(value: string) {
  return crypto
    .createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex");
}

async function parseRequestBody(req: NextRequest) {
  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return (await req.json()) as FulfilmentRequestPayload;
  }

  const formData = await req.formData();

  return {
    name: String(formData.get("name") || ""),
    email: String(formData.get("email") || ""),
    leadSource: String(formData.get("leadSource") || ""),
    sourceSection: String(formData.get("sourceSection") || ""),
    sourceLabel: String(formData.get("sourceLabel") || ""),
    eventId: String(formData.get("eventId") || ""),
  } satisfies FulfilmentRequestPayload;
}

async function sendTikTokContactEvent({
  req,
  payload,
  attribution,
}: {
  req: NextRequest;
  payload: CleanFulfilmentRequest;
  attribution?: FulfilmentRequestPayload["attribution"];
}) {
  const pixelCode =
    process.env.TIKTOK_PIXEL_CODE || process.env.NEXT_PUBLIC_TIKTOK_PIXEL_CODE;
  const accessToken = process.env.TIKTOK_ACCESS_TOKEN;
  const testEventCode = process.env.TIKTOK_TEST_EVENT_CODE;

  if (!pixelCode || !accessToken) {
    return {
      skipped: true,
      reason: "Missing TIKTOK_PIXEL_CODE or TIKTOK_ACCESS_TOKEN.",
    };
  }

  const userAgent = req.headers.get("user-agent") || undefined;
  const ip = getClientIp(req);
  const ttp = getCookie(req, "_ttp");

  const tiktokPayload = removeEmptyValues({
    pixel_code: pixelCode,
    event: "Contact",
    event_id: payload.eventId,
    timestamp: new Date().toISOString(),

    context: removeEmptyValues({
      page: removeEmptyValues({
        url: attribution?.currentUrl || attribution?.landingPage,
        referrer: attribution?.referrer,
      }),

      user: removeEmptyValues({
        email: sha256(payload.email),
        ttclid: attribution?.ttclid,
        ttp,
        ip,
        user_agent: userAgent,
      }),
    }),

    properties: removeEmptyValues({
      content_name: "Boxify WhatsApp Contact",
      content_category: "Boxify Landing Page",
      lead_source: payload.leadSource,
      source_section: payload.sourceSection,
      source_label: payload.sourceLabel,
    }),

    ...(testEventCode
      ? {
          test_event_code: testEventCode,
        }
      : {}),
  });

  try {
    const response = await fetch(
      "https://business-api.tiktok.com/open_api/v1.3/event/track/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Token": accessToken,
        },
        body: JSON.stringify(tiktokPayload),
      }
    );

    const result = await response.json();

    return {
      skipped: false,
      ok: response.ok,
      status: response.status,
      result,
    };
  } catch (error) {
    return {
      skipped: false,
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "TikTok Events API request failed.",
    };
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await parseRequestBody(req);

    const apiToken = process.env.MAILERLITE_API_TOKEN;
    const groupId = process.env.MAILERLITE_GROUP_ID;

    if (!apiToken || !groupId) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing MAILERLITE_API_TOKEN or MAILERLITE_GROUP_ID environment variable.",
        },
        { status: 500 }
      );
    }

    const name = cleanText(body.name);
    const email = cleanText(body.email).toLowerCase();

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Please enter your name." },
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const payload: CleanFulfilmentRequest = {
      name,
      email,
      leadSource: cleanText(body.leadSource || "Boxify landing page"),
      sourceSection: cleanText(body.sourceSection || "unknown"),
      sourceLabel: cleanText(body.sourceLabel || "Boxify CTA"),
      eventId:
        cleanText(body.eventId) ||
        `boxify_contact_${Date.now()}_${Math.random()
          .toString(36)
          .slice(2)}`,
    };

    const mailerLitePayload = {
      email: payload.email,
      name: payload.name,
      groups: [groupId],
      fields: removeEmptyValues({
        lead_source: payload.leadSource,
      }),
    };

    const mailerLiteResponse = await fetch(
      "https://connect.mailerlite.com/api/subscribers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify(mailerLitePayload),
      }
    );

    const mailerLiteResult = await mailerLiteResponse.json();

    if (!mailerLiteResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error:
            mailerLiteResult?.message ||
            "MailerLite could not save this fulfilment request.",
          mailerLite: mailerLiteResult,
        },
        { status: mailerLiteResponse.status }
      );
    }

    const tiktok = await sendTikTokContactEvent({
      req,
      payload,
      attribution: body.attribution,
    });

    const message = buildWhatsAppMessage(payload);

    const whatsappUrl = `${getWhatsAppBaseUrl()}?text=${encodeURIComponent(
      message
    )}`;

    return NextResponse.json({
      success: true,
      whatsappUrl,
      subscriber: mailerLiteResult?.data || null,
      tiktok,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong while submitting your fulfilment request.",
      },
      { status: 500 }
    );
  }
}