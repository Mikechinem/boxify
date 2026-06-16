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

const supportItems = ["Warehouse", "Call Centre", "Daily Reports"];

export default function HeroSection() {
  const { hero, ctas } = boxifyData;

  return (
    <section className="relative overflow-hidden bg-black px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,88,12,0.24),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,#000_94%)]" />

      <nav className="relative z-10 mx-auto mb-14 flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
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

          <div className="flex flex-col justify-center leading-none">
            <p className="text-base font-black tracking-tight text-white sm:text-lg">
              Boxify
            </p>
            <p className="mt-1 text-xs font-medium text-zinc-400">
              Ecommerce Fulfilment
            </p>
          </div>
        </div>

        <CTAButton
          section="nav"
          label="Chat On WhatsApp"
          variant="secondary"
          className="hidden border-[#25D366]/60 bg-[#25D366] px-5 py-3 text-sm font-black text-white shadow-[0_0_35px_rgba(37,211,102,0.55)] hover:border-[#25D366] hover:bg-[#1ebe5d] hover:shadow-[0_0_45px_rgba(37,211,102,0.75)] sm:inline-flex"
        >
          <span className="mr-2 flex size-7 items-center justify-center rounded-full bg-white text-[#25D366] shadow-[0_0_18px_rgba(255,255,255,0.35)]">
            <svg
              aria-hidden="true"
              viewBox="0 0 32 32"
              className="size-5 shrink-0 fill-current"
            >
              <path d="M16.04 3C8.86 3 3.02 8.73 3.02 15.78c0 2.26.61 4.47 1.76 6.4L3 29l7.02-1.8a13.22 13.22 0 0 0 6.02 1.48c7.18 0 13.02-5.73 13.02-12.78S23.22 3 16.04 3Zm0 23.5c-1.9 0-3.76-.5-5.4-1.44l-.39-.22-4.16 1.07 1.11-4.01-.26-.41a10.36 10.36 0 0 1-1.62-5.55c0-5.86 4.86-10.63 10.82-10.63s10.82 4.77 10.82 10.63S22 26.5 16.04 26.5Zm5.92-7.96c-.32-.16-1.9-.92-2.2-1.03-.3-.11-.52-.16-.74.16-.22.32-.85 1.03-1.04 1.24-.19.22-.38.24-.7.08-.32-.16-1.36-.49-2.6-1.55-.96-.84-1.61-1.88-1.8-2.2-.19-.32-.02-.49.14-.65.14-.14.32-.38.48-.57.16-.19.22-.32.32-.54.11-.22.05-.41-.03-.57-.08-.16-.74-1.75-1.01-2.4-.27-.65-.54-.56-.74-.57h-.63c-.22 0-.57.08-.87.41-.3.32-1.15 1.1-1.15 2.69s1.18 3.12 1.34 3.34c.16.22 2.32 3.49 5.62 4.89.79.33 1.4.53 1.88.68.79.25 1.51.21 2.08.13.63-.09 1.9-.76 2.17-1.5.27-.73.27-1.36.19-1.5-.08-.13-.3-.21-.63-.38Z" />
            </svg>
          </span>

          <span>Chat Us On WhatsApp</span>
        </CTAButton>
      </nav>

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <div className="mx-auto mb-6 inline-flex max-w-3xl rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-center text-xs font-bold uppercase tracking-[0.18em] text-orange-300 sm:text-sm">
          {hero.eyebrow}
        </div>

        <h1 className="mx-auto max-w-5xl text-balance text-3xl font-black leading-[1.16] tracking-tight text-white sm:text-4xl sm:leading-[1.14] md:text-5xl md:leading-[1.12] lg:text-6xl lg:leading-[1.1]">
          {hero.headline}
        </h1>

        <p className="mx-auto mt-7 max-w-4xl text-lg font-medium leading-9 text-zinc-300 sm:text-xl">
          {hero.subheadline}
        </p>

        <div className="mx-auto mt-9 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-6 text-left"
            >
              <div className="absolute right-5 top-5 flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex size-3 rounded-full bg-green-500" />
              </div>

              <p className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-base font-bold text-zinc-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <CTAButton section="hero-primary" className="w-full sm:w-auto">
            {ctas.primary}
          </CTAButton>

          <CTAButton
            section="hero-secondary"
            variant="secondary"
            className="w-full sm:w-auto"
          >
            {ctas.secondary}
          </CTAButton>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-base font-medium leading-8 text-zinc-400">
          {hero.trustMicrocopy}
        </p>
      </div>

      <div className="relative z-10 mx-auto mt-16 max-w-7xl lg:mt-20">
        <div className="rounded-[2rem] border border-white/10 bg-zinc-950/90 p-4 sm:p-5">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-300">
                Fulfilment Flow
              </p>
              <h3 className="mt-2 text-2xl font-black leading-tight text-white sm:text-3xl">
                Order → Confirm → Pack → Deliver → Report
              </h3>
            </div>

            <div className="w-fit rounded-full bg-orange-500 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white">
              Built For Ecommerce
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

                    <div className="border-t border-white/10 bg-white/[0.04] p-5">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-300">
                        {image.label}
                      </p>
                      <p className="mt-3 text-base font-black leading-7 text-white">
                        {image.title}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {supportItems.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <p className="text-sm font-medium text-zinc-400">
                  Boxify support
                </p>
                <p className="mt-2 text-xl font-black text-white">{item}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-5 max-w-4xl text-center text-base font-medium leading-8 text-zinc-400">
            From storage to confirmation, delivery, reporting, and remittance —
            Boxify keeps the order journey connected after the sale.
          </p>
        </div>
      </div>
    </section>
  );
}