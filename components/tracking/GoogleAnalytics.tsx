import Script from "next/script";
import { TRACKING } from "@/lib/constants";

export default function GoogleAnalytics() {
  if (!TRACKING.gaMeasurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING.gaMeasurementId}`}
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${TRACKING.gaMeasurementId}');
        `}
      </Script>
    </>
  );
}