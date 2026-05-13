import type { Metadata } from "next";
import "./globals.css";
import MetaPixel from "@/components/tracking/MetaPixel";
import GoogleAnalytics from "@/components/tracking/GoogleAnalytics";
import { BRAND, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${BRAND.name} | Abuja & Lagos Ecommerce Fulfilment`,
  description:
    "Turn Abuja and Lagos into local fulfilment zones without renting a warehouse, hiring riders, or chasing deliveries all day.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: `${BRAND.name} | Your Abuja & Lagos Fulfilment Branch`,
    description:
      "Warehousing, customer confirmation, packaging, delivery, POD in Abuja and Lagos, reports, remittance, and fulfilment support for ecommerce vendors.",
    url: SITE_URL,
    siteName: BRAND.name,
    images: [
      {
        url: "/images/boxify/hero-fulfilment.png",
        width: 1200,
        height: 630,
        alt: "Boxify ecommerce fulfilment",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NG">
      <body>
        <MetaPixel />
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}