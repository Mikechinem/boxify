import { TRACKING } from "@/lib/constants";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

type LeadClickPayload = {
  label: string;
  destination: string;
  section?: string;
};

type AttributionData = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  utm_id?: string;
  utm_source_platform?: string;
  fbclid?: string;
  gclid?: string;
  msclkid?: string;
  ttclid?: string;
  landing_page?: string;
  current_url?: string;
  referrer?: string;
  captured_at?: string;
};

const LEAD_STORAGE_KEY = "boxify_whatsapp_lead_tracked_at";
const FIRST_TOUCH_KEY = "boxify_first_touch_attribution";
const LATEST_TOUCH_KEY = "boxify_latest_touch_attribution";
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
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeLocalStorageSet(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore storage errors so tracking never breaks the page.
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

function createEventId(eventName: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${eventName}_${crypto.randomUUID()}`;
  }

  return `${eventName}_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function getCurrentAttribution(): AttributionData {
  const url = new URL(window.location.href);

  const attribution: AttributionData = {
    landing_page: `${url.origin}${url.pathname}`,
    current_url: window.location.href,
    referrer: document.referrer || undefined,
    captured_at: new Date().toISOString(),
  };

  TRACKING_PARAM_KEYS.forEach((key) => {
    const value = url.searchParams.get(key);

    if (value) {
      attribution[key] = value;
    }
  });

  return attribution;
}

function hasTrackableParams(attribution: AttributionData) {
  return TRACKING_PARAM_KEYS.some((key) => Boolean(attribution[key]));
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

function getAttributionPayload() {
  captureAttributionFromCurrentUrl();

  const firstTouch = parseStoredAttribution(FIRST_TOUCH_KEY);
  const latestTouch = parseStoredAttribution(LATEST_TOUCH_KEY);

  return {
    first_utm_source: firstTouch.utm_source || "",
    first_utm_medium: firstTouch.utm_medium || "",
    first_utm_campaign: firstTouch.utm_campaign || "",
    first_utm_content: firstTouch.utm_content || "",
    first_utm_term: firstTouch.utm_term || "",
    first_utm_id: firstTouch.utm_id || "",
    first_utm_source_platform: firstTouch.utm_source_platform || "",
    first_fbclid: firstTouch.fbclid || "",
    first_gclid: firstTouch.gclid || "",
    first_msclkid: firstTouch.msclkid || "",
    first_ttclid: firstTouch.ttclid || "",

    latest_utm_source: latestTouch.utm_source || "",
    latest_utm_medium: latestTouch.utm_medium || "",
    latest_utm_campaign: latestTouch.utm_campaign || "",
    latest_utm_content: latestTouch.utm_content || "",
    latest_utm_term: latestTouch.utm_term || "",
    latest_utm_id: latestTouch.utm_id || "",
    latest_utm_source_platform: latestTouch.utm_source_platform || "",
    latest_fbclid: latestTouch.fbclid || "",
    latest_gclid: latestTouch.gclid || "",
    latest_msclkid: latestTouch.msclkid || "",
    latest_ttclid: latestTouch.ttclid || "",

    landing_page: firstTouch.landing_page || "",
    current_url: window.location.href,
    referrer: firstTouch.referrer || document.referrer || "",
  };
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

export function isWhatsAppDestination(destination: string) {
  return (
    destination.includes("wa.me") ||
    destination.includes("whatsapp.com") ||
    destination.includes("api.whatsapp.com")
  );
}

function buildFbcFromFbclid(fbclid?: string) {
  if (!fbclid) return undefined;

  return `fb.1.${Date.now()}.${fbclid}`;
}

export function trackLeadClick(payload: LeadClickPayload) {
  if (typeof window === "undefined") return;

  captureAttributionFromCurrentUrl();

  const isWhatsAppClick = isWhatsAppDestination(payload.destination);

  if (!isWhatsAppClick) return;

  const attributionPayload = getAttributionPayload();
  const alreadyTrackedLead = hasTrackedLeadRecently();

  const eventPayload = {
    event_category: "lead",
    event_label: payload.label,
    destination: payload.destination,
    section: payload.section || "unknown",
    button_text: payload.label,
    button_location: payload.section || "unknown",
    conversion_channel: "whatsapp",
    ...attributionPayload,
  };

  if (alreadyTrackedLead) {
    window.fbq?.("trackCustom", "WhatsAppCTARepeatClick", {
      ...eventPayload,
      lead_counted: false,
    });

    window.gtag?.("event", "whatsapp_cta_repeat_click", {
      ...eventPayload,
      lead_counted: false,
    });

    return;
  }

  const eventId = createEventId("lead");

  markLeadAsTracked();

  window.fbq?.(
    "track",
    "Lead",
    {
      content_name: payload.label,
      content_category: "Boxify Landing Page",
      destination: payload.destination,
      section: payload.section || "unknown",
      button_text: payload.label,
      button_location: payload.section || "unknown",
      conversion_channel: "whatsapp",
      ...attributionPayload,
    },
    {
      eventID: eventId,
    }
  );

  window.gtag?.("event", "generate_lead", {
    ...eventPayload,
    event_id: eventId,
    lead_counted: true,
  });

  if (!TRACKING.enableCapiForwarding) return;

  const latestTouch = parseStoredAttribution(LATEST_TOUCH_KEY);
  const fbp = getCookie("_fbp");
  const fbc = getCookie("_fbc") || buildFbcFromFbclid(latestTouch.fbclid);

  const serverPayload = {
    eventId,
    eventName: "Lead",
    eventSourceUrl: window.location.href,
    fbp,
    fbc,
    customData: {
      content_name: payload.label,
      content_category: "Boxify Landing Page",
      ...eventPayload,
    },
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
    // Fail silently so tracking never blocks the WhatsApp click.
  });
}