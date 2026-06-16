"use client";

import Script from "next/script";

const TIKTOK_PIXEL_CODE = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_CODE;

export default function TikTokPixel() {
  if (!TIKTOK_PIXEL_CODE) return null;

  return (
    <Script
      id="tiktok-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function (w, d, t) {
            w.TiktokAnalyticsObject = t;
            var ttq = w[t] = w[t] || [];
            ttq.methods = [
              "page",
              "track",
              "identify",
              "instances",
              "debug",
              "on",
              "off",
              "once",
              "ready",
              "alias",
              "group",
              "enableCookie",
              "disableCookie",
              "holdConsent",
              "revokeConsent",
              "grantConsent"
            ];
            ttq.setAndDefer = function (t, e) {
              t[e] = function () {
                t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
              };
            };
            for (var i = 0; i < ttq.methods.length; i++) {
              ttq.setAndDefer(ttq, ttq.methods[i]);
            }
            ttq.instance = function (t) {
              var e = ttq._i[t] || [];
              for (var n = 0; n < ttq.methods.length; n++) {
                ttq.setAndDefer(e, ttq.methods[n]);
              }
              return e;
            };
            ttq.load = function (e, n) {
              var r = "https://analytics.tiktok.com/i18n/pixel/events.js";
              ttq._i = ttq._i || {};
              ttq._i[e] = [];
              ttq._i[e]._u = r;
              ttq._t = ttq._t || {};
              ttq._t[e] = +new Date();
              ttq._o = ttq._o || {};
              ttq._o[e] = n || {};
              var o = document.createElement("script");
              o.type = "text/javascript";
              o.async = true;
              o.src = r + "?sdkid=" + e + "&lib=" + t;
              var a = document.getElementsByTagName("script")[0];
              a.parentNode.insertBefore(o, a);
            };

            ttq.load("${TIKTOK_PIXEL_CODE}");
            ttq.page();
          }(window, document, "ttq");
        `,
      }}
    />
  );
}