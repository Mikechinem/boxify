import { boxifyData } from "@/data/boxify";
import CTAButton from "@/components/shared/CTAButton";
import SectionHeading from "@/components/shared/SectionHeading";
import SectionWrapper from "@/components/shared/SectionWrapper";

export default function BenefitCards() {
  const { benefits, ctas, whatsappUrl } = boxifyData;

  return (
    <SectionWrapper className="bg-zinc-950">
      <SectionHeading
        eyebrow="What changes"
        title="What Changes When Boxify Handles Your Fulfilment?"
        subtitle="Each benefit connects back to the exact pain ecommerce vendors face when delivery becomes manual, slow, and unpredictable."
        align="center"
      />

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, index) => (
          <div
            key={benefit.title}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-orange-500/40 hover:bg-orange-500/10"
          >
            <div className="mb-5 flex size-11 items-center justify-center rounded-2xl bg-orange-500/15 text-sm font-black text-orange-300">
              {index + 1}
            </div>
            <h3 className="text-lg font-black text-white">{benefit.title}</h3>
            <p className="mt-3 text-sm leading-7 text-zinc-400">{benefit.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
       <CTAButton href="#fulfilment-form" section="benefits-scroll-to-form">
           I Want This Fulfilment System
         </CTAButton>
      </div>
    </SectionWrapper>
  );
}