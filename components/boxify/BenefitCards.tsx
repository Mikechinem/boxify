import { boxifyData } from "@/data/boxify";
import CTAButton from "@/components/shared/CTAButton";
import SectionWrapper from "@/components/shared/SectionWrapper";

export default function BenefitCards() {
  const { benefits } = boxifyData;

  return (
    <SectionWrapper className="bg-zinc-950">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-orange-400">
          What Changes
        </p>

        <h2 className="mx-auto max-w-5xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          What Changes When Boxify Handles Your Fulfilment?
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-9 text-zinc-300 sm:text-xl">
          Delivery stops feeling like the weakest part of your business. Your
          orders move through a clearer system, your customers feel better
          handled, and you get more visibility after the sale.
        </p>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, index) => (
          <div
            key={benefit.title}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-orange-500/40 hover:bg-orange-500/10"
          >
            <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-orange-500/15 text-base font-black text-orange-300">
              {index + 1}
            </div>

            <h3 className="text-xl font-black leading-tight text-white sm:text-2xl">
              {benefit.title}
            </h3>

            <p className="mt-4 text-base leading-8 text-zinc-400">
              {benefit.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <CTAButton href="#fulfilment-form" section="benefits-scroll-to-form">
          I Want This Fulfilment System
        </CTAButton>
      </div>
    </SectionWrapper>
  );
}