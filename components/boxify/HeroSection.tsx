import Image from "next/image";
import { boxifyData } from "@/data/boxify";
import CTAButton from "@/components/shared/CTAButton";

const heroStats = [
  {
    value: "10k+",
    label: "Orders Fulfilled",
  },
  {
    value: "100+",
    label: "Winning Vendors",
  },
];

const heroGalleryImages = [
  {
 
    src: "https://ik.imagekit.io/j1e78ujalr/rechargablesolarbank/boxifyimg2.jpeg?updatedAt=1774811213794",
    alt: "Boxify ecommerce fulfilment flow",
    label: "Fulfilment Flow",
    title: "Orders confirmed, packed, delivered, reported",
  },
  {
    src: "https://ik.imagekit.io/j1e78ujalr/rechargablesolarbank/boxpeepsjpeg.jpeg?updatedAt=1774811213773",
    alt: "Boxify warehouse support",
    label: "Warehouse Support",
    title: "Store products closer to Abuja and Lagos customers",
  },
  {
    src: "https://ik.imagekit.io/j1e78ujalr/rechargablesolarbank/boxifyarranged.jpeg?updatedAt=1774811279618",
    alt: "Boxify daily report dashboard",
    label: "Daily Reports",
    title: "Know what happened with every order",
  },
];

const removalPoints = [
  "No renting warehouse space before serving Abuja and Lagos customers.",
  "No chasing riders all day for order updates.",
  "No manually confirming every customer before dispatch.",
  "No chaotic POD follow-up for Abuja and Lagos orders.",
  "No blind fulfilment process without daily reports.",
];

const supportItems = ["Warehouse", "Call Centre", "Daily Reports"];

export default function HeroSection() {
  const { hero, ctas, whatsappUrl } = boxifyData;

  return (
    <section className="relative overflow-hidden bg-black px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24">
      {/* Lightweight CSS-only background for faster first paint */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,88,12,0.24),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,#000_94%)]" />

      {/* Navbar */}
      {/* Navbar */}
<nav className="relative z-10 mx-auto mb-14 flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
  {/* Logo + text wrapper */}
  <div className="flex items-center gap-2">
    {/* Logo icon wrapper */}
    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-white">
      <Image
        src="/images/boxify/boxify-logo.png"
        alt="Boxify logo"
        fill
        sizes="44px"
        className="object-contain p-1"
        priority
      />
    </div>

    {/* Brand text */}
    <div className="flex flex-col justify-center leading-none">
      <p className="text-base font-black tracking-tight text-white">
        Boxify
      </p>
      <p className="mt-1 text-[11px] font-medium text-zinc-400">
        Ecommerce Fulfilment
      </p>
    </div>
  </div>

  <CTAButton
    href={whatsappUrl}
    section="nav"
    variant="secondary"
    className="hidden sm:inline-flex"
  >
    {ctas.secondary}
  </CTAButton>
</nav>

      {/* Headline-first hero */}
      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <div className="mx-auto mb-6 inline-flex max-w-3xl rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-orange-300 sm:text-xs">
          {hero.eyebrow}
        </div>

        <h1 className="mx-auto max-w-6xl text-balance text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          {hero.headline}
        </h1>

        <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-zinc-300 sm:text-lg">
          {hero.subheadline}
        </p>

        <div className="mx-auto mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-5 text-left"
            >
              <div className="absolute right-4 top-4 flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex size-3 rounded-full bg-green-500" />
              </div>

              <p className="text-3xl font-black tracking-tight text-white">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-bold text-zinc-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <CTAButton
            href="#fulfilment-form"
            section="hero-scroll-to-form"
            className="w-full sm:w-auto"
          >
            {ctas.primary}
          </CTAButton>

          <CTAButton
            href={whatsappUrl}
            section="hero-headline"
            variant="secondary"
            className="w-full sm:w-auto"
          >
            {ctas.secondary}
          </CTAButton>
        </div>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-400">
          {hero.trustMicrocopy}
        </p>
      </div>

      {/* Image scroll section */}
      <div className="relative z-10 mx-auto mt-16 max-w-7xl lg:mt-20">
        <div className="rounded-[2rem] border border-white/10 bg-zinc-950/90 p-4">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-orange-300">
                Fulfilment Flow
              </p>
              <h3 className="mt-1 text-xl font-black text-white">
                Order → Confirm → Pack → Deliver → Report
              </h3>
            </div>

            <div className="w-fit rounded-full bg-orange-500 px-3 py-1 text-xs font-black text-white">
              BUILT FOR ECOMMERCE
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 p-3 sm:p-4">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-zinc-900 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-zinc-900 to-transparent" />

            <div className="hero-gallery-track flex w-max gap-4">
              {[...heroGalleryImages, ...heroGalleryImages].map(
                (image, index) => (
                  <div
                    key={`${image.src}-${index}`}
                    className="w-[260px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black sm:w-[360px] lg:w-[420px]"
                  >
                    <div className="relative aspect-[4/3] w-full bg-zinc-950">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 640px) 260px, (max-width: 1024px) 360px, 420px"
                        className="object-contain p-3"
                      />
                    </div>

                    <div className="border-t border-white/10 bg-white/[0.04] p-4">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-300">
                        {image.label}
                      </p>
                      <p className="mt-2 text-sm font-bold leading-6 text-white">
                        {image.title}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {supportItems.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
              >
                <p className="text-xs text-zinc-400">Boxify support</p>
                <p className="mt-1 font-bold text-white">{item}</p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-center text-xs text-zinc-500">
            From storage to confirmation, delivery, reporting, and remittance — Boxify keeps the order journey connected after the sale.
          </p>
        </div>
      </div>

      {/* What Boxify helps remove section */}
      <div className="relative z-10 mx-auto mt-10 max-w-7xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-400">
                What Boxify helps you remove
              </p>

              <h2 className="mt-3 max-w-xl text-2xl font-black tracking-tight text-white sm:text-3xl">
                Remove the fulfilment stress that makes ecommerce feel harder than it should.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400">
                Boxify helps ecommerce vendors replace manual dispatch stress with a clearer fulfilment flow for Abuja and Lagos orders.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {removalPoints.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-black/40 p-4"
                >
                  <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-black text-white">
                    ✓
                  </span>

                  <p className="text-sm leading-7 text-zinc-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Important note:
          Keep 10k+ and 100+ only if those numbers are real.
          If not confirmed, replace them with safer text like:
          "Fulfilment-ready" and "Vendor-focused".
      */}
    </section>
  );
}