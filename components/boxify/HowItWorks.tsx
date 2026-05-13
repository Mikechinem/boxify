import { boxifyData } from "@/data/boxify";
import CTAButton from "@/components/shared/CTAButton";
import SectionHeading from "@/components/shared/SectionHeading";
import SectionWrapper from "@/components/shared/SectionWrapper";

export default function HowItWorks() {
  const { steps, ctas, whatsappUrl } = boxifyData;

  return (
    <SectionWrapper className="bg-black">
      <SectionHeading
        eyebrow="Unique mechanism"
        title="How The Boxify Fulfilment Flow Works"
        subtitle="A simple system designed to remove the stress between “customer ordered” and “customer received.”"
        align="center"
      />

      <div className="mx-auto mt-14 grid max-w-5xl gap-4">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:grid sm:grid-cols-[120px_1fr] sm:gap-6"
          >
            <div className="mb-4 flex items-center gap-3 sm:mb-0">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-orange-500 text-lg font-black text-white">
                {index + 1}
              </div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-300 sm:hidden">
                Step {index + 1}
              </p>
            </div>

            <div>
              <p className="hidden text-xs font-black uppercase tracking-[0.18em] text-orange-300 sm:block">
                Step {index + 1}
              </p>
              <h3 className="mt-1 text-xl font-black text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{step.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <CTAButton href={whatsappUrl} section="how-it-works">
          {ctas.mechanism}
        </CTAButton>
      </div>
    </SectionWrapper>
  );
}