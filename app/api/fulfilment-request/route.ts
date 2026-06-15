import { NextRequest, NextResponse } from "next/server";

type FulfilmentRequestPayload = {
  name?: string;
  whatsappNumber?: string;
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
  };
};

type CleanFulfilmentRequest = {
  name: string;
  email: string;
  whatsappNumber: string;
  leadSource: string;
  sourceSection: string;
  sourceLabel: string;
  eventId: string;
};

function cleanText(value: unknown) {
  return String(value || "").trim();
}

function removeEmptyValues<T extends Record<string, unknown>>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => {
      return value !== undefined && value !== null && value !== "";
    })
  );
}

function normalizeNigerianPhone(value: string) {
  let number = value.replace(/[^\d]/g, "");

  if (number.startsWith("0")) {
    number = `234${number.slice(1)}`;
  }

  return number;
}

function buildFallbackEmailFromPhone(whatsappNumber: string) {
  const domain = process.env.LEAD_FALLBACK_EMAIL_DOMAIN || "myboxify.app";
  const phone = normalizeNigerianPhone(whatsappNumber);

  return `lead+${phone}@${domain}`;
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
WhatsApp: ${data.whatsappNumber}

Please explain how Boxify can help with my Abuja/Lagos fulfilment.
  `.trim();
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as FulfilmentRequestPayload;

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
    const whatsappNumber = cleanText(body.whatsappNumber);
    const normalizedWhatsappNumber = normalizeNigerianPhone(whatsappNumber);

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Please enter your name." },
        { status: 400 }
      );
    }

    if (!whatsappNumber) {
      return NextResponse.json(
        { success: false, error: "Please enter your WhatsApp number." },
        { status: 400 }
      );
    }

    if (normalizedWhatsappNumber.length < 10) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid WhatsApp number." },
        { status: 400 }
      );
    }

    const payload: CleanFulfilmentRequest = {
      name,
      email: buildFallbackEmailFromPhone(normalizedWhatsappNumber),
      whatsappNumber: normalizedWhatsappNumber,
      leadSource: cleanText(body.leadSource || "Boxify landing page"),
      sourceSection: cleanText(body.sourceSection || "unknown"),
      sourceLabel: cleanText(body.sourceLabel || "Boxify CTA"),
      eventId: cleanText(body.eventId || ""),
    };

    const mailerLitePayload = {
      email: payload.email,
      name: payload.name,
      groups: [groupId],
      fields: removeEmptyValues({
        whatsapp_number: payload.whatsappNumber,
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

    const message = buildWhatsAppMessage(payload);

    const whatsappUrl = `${getWhatsAppBaseUrl()}?text=${encodeURIComponent(
      message
    )}`;

    return NextResponse.json({
      success: true,
      whatsappUrl,
      subscriber: mailerLiteResult?.data || null,
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