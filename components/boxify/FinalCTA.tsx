import { boxifyData } from "@/data/boxify";
import CTAButton from "@/components/shared/CTAButton";

export default function FinalCTA() {
  const { finalCta, ctas, whatsappUrl } = boxifyData;

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
            href={whatsappUrl}
            section="final-cta"
            variant="secondary"
            className="w-full border-white/30 bg-black text-white hover:bg-zinc-900 sm:w-auto"
          >
            {ctas.primaryLong}
          </CTAButton>
          <CTAButton
            href={whatsappUrl}
            section="final-cta"
            variant="secondary"
            className="w-full border-white/30 bg-white/15 sm:w-auto"
          >
            {ctas.secondary}
          </CTAButton>
        </div>

        <p className="mx-auto mt-10 max-w-3xl rounded-3xl border border-white/10 bg-black p-6 text-sm font-bold leading-7 text-white shadow-[0_20px_70px_rgba(0,0,0,0.45)]">
        {finalCta.ps}
       </p>
      </div>
    </section>
  );
}