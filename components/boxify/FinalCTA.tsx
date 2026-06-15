import { boxifyData } from "@/data/boxify";
import CTAButton from "@/components/shared/CTAButton";

export default function FinalCTA() {
  const { finalCta, ctas } = boxifyData;

  return (
    <section className="relative overflow-hidden bg-[#ea580c] px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.28),transparent_35%)]" />

      <div className="relative mx-auto max-w-5xl text-center">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-orange-100">
          last call Dear Vendor
        </p>

        <h2 className="text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">
          {finalCta.headline}
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-orange-50 sm:text-lg">
          {finalCta.body}
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <CTAButton
            href="#fulfilment-request-modal"
            section="final-cta-primary-open-modal"
            variant="secondary"
            className="w-full border-white/30 bg-black text-white hover:bg-zinc-900 sm:w-auto"
          >
            {ctas.primaryLong}
          </CTAButton>

          <CTAButton
            href="#fulfilment-request-modal"
            section="final-cta-secondary-open-modal"
            variant="secondary"
            className="w-full border-white/30 bg-white/15 sm:w-auto"
          >
            {ctas.secondary}
          </CTAButton>
        </div>

        <p className="mx-auto mt-10 max-w-3xl rounded-3xl border border-white/10 bg-black p-6 text-sm font-bold leading-7 text-white/50 shadow-[0_20px_70px_rgba(0,0,0,0.45)]">
          {finalCta.ps}
        </p>

        <div className="mx-auto mt-10 max-w-5xl rounded-[2rem] border border-white/15 bg-black/25 p-6 text-left backdrop-blur sm:p-8">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-100">
              Visit Or Contact Boxify
            </p>

            <a
              href={finalCta.contact.phoneHref}
              className="mt-3 inline-flex rounded-full border border-white/20 bg-black px-5 py-3 text-base font-black text-white transition hover:bg-zinc-900"
            >
              Call: {finalCta.contact.phoneLabel}
            </a>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {finalCta.offices.map((office) => (
              <div
                key={office.city}
                className="rounded-3xl border border-white/10 bg-black/35 p-5"
              >
                <h3 className="text-xl font-black text-white">
                  {office.city}
                </h3>

                <div className="mt-4 space-y-2">
                  {office.addressLines.map((line) => (
                    <p
                      key={line}
                      className="text-base font-medium leading-7 text-orange-50"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}