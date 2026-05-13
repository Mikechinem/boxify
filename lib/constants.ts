export const SITE_URL = "https://boxify-liard.vercel.app/";

export const BRAND = {
  name: "Boxify",
  accent: "#ea580c",
  tagline: "Your Abuja & Lagos Fulfilment Branch",
};

export const WHATSAPP_URL = "https://wa.me/2349021000812";

export const TRACKING = {
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "",

  /**
   * This must be true for Meta Conversion API forwarding to work.
   * Make sure app/api/track/lead/route.ts exists and your .env.local has:
   *
   * META_DATASET_ID
   * META_ACCESS_TOKEN
   * META_GRAPH_API_VERSION
   */
  enableCapiForwarding: true,
};