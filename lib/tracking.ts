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

export function trackLeadClick(payload: LeadClickPayload) {
  if (typeof window === "undefined") return;

  const eventPayload = {
    event_category: "lead",
    event_label: payload.label,
    destination: payload.destination,
    section: payload.section || "unknown",
  };

  window.fbq?.("track", "Lead", {
    content_name: payload.label,
    destination: payload.destination,
    section: payload.section || "unknown",
  });

  window.gtag?.("event", "lead_click", eventPayload);

  if (TRACKING.enableCapiForwarding) {
    fetch("/api/track/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...eventPayload,
        timestamp: new Date().toISOString(),
      }),
      keepalive: true,
    }).catch(() => {
      // Fail silently so tracking never blocks the WhatsApp click.
    });
  }
}