import Script from "next/script";
import { TRACKING } from "@/lib/constants";

function getMetaPixelIds() {
  const pixelIdsFromEnv =
    process.env.NEXT_PUBLIC_META_PIXEL_IDS?.split(",")
      .map((id) => id.trim())
      .filter(Boolean) ?? [];

  const fallbackPixelId = TRACKING.metaPixelId ? [TRACKING.metaPixelId] : [];

  return Array.from(new Set([...fallbackPixelId, ...pixelIdsFromEnv]));
}

export default function MetaPixel() {
  const metaPixelIds = getMetaPixelIds();

  if (metaPixelIds.length === 0) return null;

  return (
    <>
      <Script id="boxify-attribution-capture" strategy="afterInteractive">
        {`
          (function () {
            try {
              var firstTouchKey = "boxify_first_touch_attribution";
              var latestTouchKey = "boxify_latest_touch_attribution";
              var url = new URL(window.location.href);

              var keys = [
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
                "ttclid"
              ];

              var data = {
                landing_page: url.origin + url.pathname,
                current_url: window.location.href,
                referrer: document.referrer || "",
                captured_at: new Date().toISOString()
              };

              var hasTrackableParams = false;

              keys.forEach(function (key) {
                var value = url.searchParams.get(key);

                if (value) {
                  data[key] = value;
                  hasTrackableParams = true;
                }
              });

              if (!localStorage.getItem(firstTouchKey)) {
                localStorage.setItem(firstTouchKey, JSON.stringify(data));
              }

              if (hasTrackableParams || !localStorage.getItem(latestTouchKey)) {
                localStorage.setItem(latestTouchKey, JSON.stringify(data));
              }
            } catch (error) {}
          })();
        `}
      </Script>

      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');

          var boxifyMetaPixelIds = ${JSON.stringify(metaPixelIds)};

          boxifyMetaPixelIds.forEach(function (pixelId) {
            fbq('init', pixelId);
          });

          fbq('track', 'PageView');
        `}
      </Script>

      <noscript>
        {metaPixelIds.map((pixelId) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={pixelId}
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
            alt=""
          />
        ))}
      </noscript>
    </>
  );
}