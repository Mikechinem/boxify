import { NextRequest, NextResponse } from "next/server";

type FulfilmentRequestPayload = {
  name?: string;
  email?: string;
  whatsappNumber?: string;
  businessName?: string;
  productCategory?: string;
  fulfilmentLocation?: string;
  averageOrders?: string;
  podNeed?: string;
  deliveryChallenge?: string;
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
  businessName: string;
  productCategory: string;
  fulfilmentLocation: string;
  averageOrders: string;
  podNeed: string;
  deliveryChallenge: string;
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
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  if (!number) {
    return "https://wa.me/YOURNUMBER";
  }

  const cleanedNumber = number.replace(/[^\d]/g, "");

  return `https://wa.me/${cleanedNumber}`;
}

function buildWhatsAppMessage(data: CleanFulfilmentRequest) {
  return `
Hi Boxify, I just submitted my fulfilment request.

Name: ${data.name}
Email: ${data.email}
WhatsApp: ${data.whatsappNumber}
Business: ${data.businessName}
Product: ${data.productCategory}
Fulfilment Location: ${data.fulfilmentLocation}
Average Orders: ${data.averageOrders}
POD Need: ${data.podNeed}
Biggest Delivery Challenge: ${data.deliveryChallenge}

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

    const payload: CleanFulfilmentRequest = {
      name: cleanText(body.name),
      email: cleanText(body.email).toLowerCase(),
      whatsappNumber: cleanText(body.whatsappNumber),
      businessName: cleanText(body.businessName),
      productCategory: cleanText(body.productCategory),
      fulfilmentLocation: cleanText(body.fulfilmentLocation),
      averageOrders: cleanText(body.averageOrders),
      podNeed: cleanText(body.podNeed),
      deliveryChallenge: cleanText(body.deliveryChallenge),
      leadSource: cleanText(body.leadSource || "Boxify landing page"),
      sourceSection: cleanText(body.sourceSection || "unknown"),
      sourceLabel: cleanText(body.sourceLabel || "Boxify CTA"),
      eventId: cleanText(body.eventId || ""),
    };

    if (!payload.name) {
      return NextResponse.json(
        { success: false, error: "Please enter your name." },
        { status: 400 }
      );
    }

    if (!payload.email || !isValidEmail(payload.email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!payload.whatsappNumber) {
      return NextResponse.json(
        { success: false, error: "Please enter your WhatsApp number." },
        { status: 400 }
      );
    }

    if (!payload.businessName) {
      return NextResponse.json(
        { success: false, error: "Please enter your business name." },
        { status: 400 }
      );
    }

    if (!payload.productCategory) {
      return NextResponse.json(
        { success: false, error: "Please tell us what you sell." },
        { status: 400 }
      );
    }

    if (!payload.fulfilmentLocation) {
      return NextResponse.json(
        { success: false, error: "Please select your fulfilment location." },
        { status: 400 }
      );
    }

    if (!payload.averageOrders) {
      return NextResponse.json(
        { success: false, error: "Please select your average orders per week." },
        { status: 400 }
      );
    }

    if (!payload.podNeed) {
      return NextResponse.json(
        { success: false, error: "Please select your POD/cash collection need." },
        { status: 400 }
      );
    }

    if (!payload.deliveryChallenge) {
      return NextResponse.json(
        {
          success: false,
          error: "Please describe your biggest delivery challenge.",
        },
        { status: 400 }
      );
    }

    const mailerLitePayload = {
      email: payload.email,
      name: payload.name,
      groups: [groupId],
      fields: removeEmptyValues({
        business_name: payload.businessName,
        whatsapp_number: payload.whatsappNumber,
        product_category: payload.productCategory,
        fulfilment_location: payload.fulfilmentLocation,
        average_orders: payload.averageOrders,
        pod_need: payload.podNeed,
        delivery_challenge: payload.deliveryChallenge,
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