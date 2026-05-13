export const SITE_URL = "https://your-domain.com";

export const BRAND = {
  name: "Boxify",
  accent: "#ea580c",
  tagline: "Your Abuja & Lagos Fulfilment Branch",
};

export const WHATSAPP_URL = "https://wa.me/YOURNUMBER";

export const TRACKING = {
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "",

  /**
   * Keep this false until you create a backend API route for Meta CAPI.
   * When ready, create: app/api/track/lead/route.ts
   */
  enableCapiForwarding: false,
};