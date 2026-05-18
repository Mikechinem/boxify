import { TRACKING } from "@/lib/constants";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

type AttributionData = {
  landingPage?: string;
  currentUrl?: string;
  referrer?: string;
  capturedAt?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  utmId?: string;
  utmSourcePlatform?: string;
  fbclid?: string;
  gclid?: string;
  msclkid?: string;
  ttclid?: string;
};

type CtaPayload = {
  label: string;
  section?: string;
  destination?: string;
};

type LeadPayload = {
  eventId: string;
  label: string;
  section?: string;
  email?: string;
  fulfilmentLocation?: string;
  averageOrders?: string;
  podNeed?: string;
};

type WhatsAppRedirectPayload = {
  eventId: string;
  label: string;
  section?: string;
  destination: string;
};

const FIRST_TOUCH_KEY = "boxify_first_touch_attribution";
const LATEST_TOUCH_KEY = "boxify_latest_touch_attribution";
const LEAD_STORAGE_KEY = "boxify_mailerlite_lead_tracked_at";
const LEAD_EXPIRY_HOURS = 24;

const TRACKING_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "utm_source_platform",
  "fbclid",
  "gclid",
  "msclkid",
  "ttclid",
] as const;

function safeLocalStorageGet(key: string) {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeLocalStorageSet(key: string, value: string) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Tracking should never break the page.
  }
}

function getCookie(name: string) {
  if (typeof document === "undefined") return undefined;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }

  return undefined;
}

function buildFbcFromFbclid(fbclid?: string) {
  if (!fbclid) return undefined;

  return `fb.1.${Date.now()}.${fbclid}`;
}

function toCamelAttribution(raw: Record<string, string | undefined>): AttributionData {
  return {
    landingPage: raw.landing_page,
    currentUrl: raw.current_url,
    referrer: raw.referrer,
    capturedAt: raw.captured_at,
    utmSource: raw.utm_source,
    utmMedium: raw.utm_medium,
    utmCampaign: raw.utm_campaign,
    utmContent: raw.utm_content,
    utmTerm: raw.utm_term,
    utmId: raw.utm_id,
    utmSourcePlatform: raw.utm_source_platform,
    fbclid: raw.fbclid,
    gclid: raw.gclid,
    msclkid: raw.msclkid,
    ttclid: raw.ttclid,
  };
}

function removeEmptyValues<T extends Record<string, unknown>>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => {
      return value !== undefined && value !== null && value !== "";
    })
  );
}

function getCurrentAttribution(): AttributionData {
  if (typeof window === "undefined") return {};

  const url = new URL(window.location.href);

  const raw: Record<string, string | undefined> = {
    landing_page: `${url.origin}${url.pathname}`,
    current_url: window.location.href,
    referrer: document.referrer || undefined,
    captured_at: new Date().toISOString(),
  };

  TRACKING_PARAM_KEYS.forEach((key) => {
    const value = url.searchParams.get(key);

    if (value) {
      raw[key] = value;
    }
  });

  return toCamelAttribution(raw);
}

function hasTrackableParams(attribution: AttributionData) {
  return Boolean(
    attribution.utmSource ||
      attribution.utmMedium ||
      attribution.utmCampaign ||
      attribution.utmContent ||
      attribution.utmTerm ||
      attribution.utmId ||
      attribution.utmSourcePlatform ||
      attribution.fbclid ||
      attribution.gclid ||
      attribution.msclkid ||
      attribution.ttclid
  );
}

function parseStoredAttribution(key: string): AttributionData {
  const raw = safeLocalStorageGet(key);

  if (!raw) return {};

  try {
    return JSON.parse(raw) as AttributionData;
  } catch {
    return {};
  }
}

function hasTrackedLeadRecently() {
  if (typeof window === "undefined") return true;

  const trackedAt = safeLocalStorageGet(LEAD_STORAGE_KEY);

  if (!trackedAt) return false;

  const trackedTime = Number(trackedAt);

  if (Number.isNaN(trackedTime)) return false;

  const expiryTime = LEAD_EXPIRY_HOURS * 60 * 60 * 1000;

  return Date.now() - trackedTime < expiryTime;
}

function markLeadAsTracked() {
  safeLocalStorageSet(LEAD_STORAGE_KEY, String(Date.now()));
}

function getAttributionEventPayload() {
  if (typeof window === "undefined") return {};

  const firstTouch = parseStoredAttribution(FIRST_TOUCH_KEY);
  const latestTouch = parseStoredAttribution(LATEST_TOUCH_KEY);

  return removeEmptyValues({
    first_utm_source: firstTouch.utmSource,
    first_utm_medium: firstTouch.utmMedium,
    first_utm_campaign: firstTouch.utmCampaign,
    first_utm_content: firstTouch.utmContent,
    first_utm_term: firstTouch.utmTerm,
    first_utm_id: firstTouch.utmId,
    first_utm_source_platform: firstTouch.utmSourcePlatform,
    first_fbclid: firstTouch.fbclid,
    first_gclid: firstTouch.gclid,
    first_msclkid: firstTouch.msclkid,
    first_ttclid: firstTouch.ttclid,

    latest_utm_source: latestTouch.utmSource,
    latest_utm_medium: latestTouch.utmMedium,
    latest_utm_campaign: latestTouch.utmCampaign,
    latest_utm_content: latestTouch.utmContent,
    latest_utm_term: latestTouch.utmTerm,
    latest_utm_id: latestTouch.utmId,
    latest_utm_source_platform: latestTouch.utmSourcePlatform,
    latest_fbclid: latestTouch.fbclid,
    latest_gclid: latestTouch.gclid,
    latest_msclkid: latestTouch.msclkid,
    latest_ttclid: latestTouch.ttclid,

    landing_page: firstTouch.landingPage,
    current_url: window.location.href,
    referrer: firstTouch.referrer || document.referrer,
  });
}

export function buildLeadEventId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `boxify_lead_${crypto.randomUUID()}`;
  }

  return `boxify_lead_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export function captureAttributionFromCurrentUrl() {
  if (typeof window === "undefined") return;

  const currentAttribution = getCurrentAttribution();

  const existingFirstTouch = safeLocalStorageGet(FIRST_TOUCH_KEY);

  if (!existingFirstTouch) {
    safeLocalStorageSet(FIRST_TOUCH_KEY, JSON.stringify(currentAttribution));
  }

  const existingLatestTouch = safeLocalStorageGet(LATEST_TOUCH_KEY);

  if (hasTrackableParams(currentAttribution) || !existingLatestTouch) {
    safeLocalStorageSet(LATEST_TOUCH_KEY, JSON.stringify(currentAttribution));
  }
}

export function getAttributionData(): AttributionData {
  if (typeof window === "undefined") return {};

  captureAttributionFromCurrentUrl();

  const firstTouch = parseStoredAttribution(FIRST_TOUCH_KEY);
  const latestTouch = parseStoredAttribution(LATEST_TOUCH_KEY);

  return removeEmptyValues({
    landingPage: firstTouch.landingPage || latestTouch.landingPage,
    currentUrl: window.location.href,
    referrer: firstTouch.referrer || latestTouch.referrer || document.referrer,

    utmSource: latestTouch.utmSource || firstTouch.utmSource,
    utmMedium: latestTouch.utmMedium || firstTouch.utmMedium,
    utmCampaign: latestTouch.utmCampaign || firstTouch.utmCampaign,
    utmContent: latestTouch.utmContent || firstTouch.utmContent,
    utmTerm: latestTouch.utmTerm || firstTouch.utmTerm,
    utmId: latestTouch.utmId || firstTouch.utmId,
    utmSourcePlatform:
      latestTouch.utmSourcePlatform || firstTouch.utmSourcePlatform,

    fbclid: latestTouch.fbclid || firstTouch.fbclid,
    gclid: latestTouch.gclid || firstTouch.gclid,
    msclkid: latestTouch.msclkid || firstTouch.msclkid,
    ttclid: latestTouch.ttclid || firstTouch.ttclid,
  }) as AttributionData;
}

/**
 * CTA click is only an intent signal.
 * It must NOT be counted as a Lead.
 */
export function trackCtaClick(payload: CtaPayload) {
  if (typeof window === "undefined") return;

  captureAttributionFromCurrentUrl();

  const eventPayload = {
    event_category: "engagement",
    event_label: payload.label,
    button_text: payload.label,
    button_location: payload.section || "unknown",
    destination: payload.destination || "fulfilment_request_modal",
    ...getAttributionEventPayload(),
  };

  window.fbq?.("trackCustom", "BoxifyCTAClick", eventPayload);

  window.gtag?.("event", "boxify_cta_click", eventPayload);
}

/**
 * Modal open is also an intent signal.
 * It must NOT be counted as a Lead.
 */
export function trackModalOpen(payload: CtaPayload) {
  if (typeof window === "undefined") return;

  captureAttributionFromCurrentUrl();

  const eventPayload = {
    event_category: "engagement",
    event_label: payload.label,
    button_text: payload.label,
    button_location: payload.section || "unknown",
    modal_name: "Boxify Fulfilment Request",
    ...getAttributionEventPayload(),
  };

  window.fbq?.("trackCustom", "BoxifyFulfilmentModalOpen", eventPayload);

  window.gtag?.("event", "boxify_fulfilment_modal_open", eventPayload);
}

/**
 * Form submit attempt is still not a Lead.
 * It only tells us the user tried submitting the modal.
 */
export function trackModalSubmitAttempt(payload: LeadPayload) {
  if (typeof window === "undefined") return;

  const eventPayload = {
    event_category: "form",
    event_label: payload.label,
    event_id: payload.eventId,
    button_text: payload.label,
    button_location: payload.section || "unknown",
    fulfilment_location: payload.fulfilmentLocation,
    average_orders: payload.averageOrders,
    pod_need: payload.podNeed,
    ...getAttributionEventPayload(),
  };

  window.fbq?.("trackCustom", "BoxifyFulfilmentSubmitAttempt", eventPayload);

  window.gtag?.("event", "boxify_fulfilment_submit_attempt", eventPayload);
}

/**
 * This is the REAL lead event.
 * Only call this after MailerLite successfully saves the subscriber.
 */
export function trackLeadAfterMailerLiteSuccess(payload: LeadPayload) {
  if (typeof window === "undefined") return;

  const attributionPayload = getAttributionEventPayload();

  const eventPayload = {
    content_name: "Boxify Fulfilment Request",
    content_category: "Boxify Landing Page",
    event_label: payload.label,
    button_text: payload.label,
    button_location: payload.section || "unknown",
    conversion_channel: "mailerlite_to_whatsapp",
    fulfilment_location: payload.fulfilmentLocation,
    average_orders: payload.averageOrders,
    pod_need: payload.podNeed,
    lead_storage: "mailerlite",
    ...attributionPayload,
  };

  const alreadyTrackedLead = hasTrackedLeadRecently();

  if (alreadyTrackedLead) {
    window.fbq?.("trackCustom", "BoxifyLeadRepeatSubmit", {
      ...eventPayload,
      event_id: payload.eventId,
      lead_counted: false,
    });

    window.gtag?.("event", "boxify_lead_repeat_submit", {
      ...eventPayload,
      event_id: payload.eventId,
      lead_counted: false,
    });

    return;
  }

  markLeadAsTracked();

  window.fbq?.(
    "track",
    "Lead",
    {
      ...eventPayload,
      lead_counted: true,
    },
    {
      eventID: payload.eventId,
    }
  );

  window.gtag?.("event", "generate_lead", {
    ...eventPayload,
    event_id: payload.eventId,
    lead_counted: true,
  });

  if (!TRACKING.enableCapiForwarding) return;

  const latestTouch = parseStoredAttribution(LATEST_TOUCH_KEY);
  const fbp = getCookie("_fbp");
  const fbc = getCookie("_fbc") || buildFbcFromFbclid(latestTouch.fbclid);

  const serverPayload = {
    eventId: payload.eventId,
    eventName: "Lead",
    eventSourceUrl: window.location.href,
    fbp,
    fbc,
    customData: eventPayload,
  };

  const blob = new Blob([JSON.stringify(serverPayload)], {
    type: "application/json",
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/track/lead", blob);
    return;
  }

  fetch("/api/track/lead", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(serverPayload),
    keepalive: true,
  }).catch(() => {
    // Fail silently so tracking never blocks the user.
  });
}

/**
 * This tracks the redirect after the lead has been saved.
 * It is not the Lead event itself.
 */
export function trackWhatsAppRedirect(payload: WhatsAppRedirectPayload) {
  if (typeof window === "undefined") return;

  const eventPayload = {
    event_category: "redirect",
    event_label: payload.label,
    event_id: payload.eventId,
    button_text: payload.label,
    button_location: payload.section || "unknown",
    destination: payload.destination,
    conversion_channel: "whatsapp",
    ...getAttributionEventPayload(),
  };

  window.fbq?.("trackCustom", "BoxifyWhatsAppRedirect", eventPayload);

  window.gtag?.("event", "boxify_whatsapp_redirect", eventPayload);
}