import { boxifyData } from "@/data/boxify";
import CTAButton from "@/components/shared/CTAButton";
import SectionHeading from "@/components/shared/SectionHeading";
import SectionWrapper from "@/components/shared/SectionWrapper";

export default function FAQSection() {
 const { faqs, ctas } = boxifyData;

  return (
    <SectionWrapper className="bg-black">
      <SectionHeading
        eyebrow="FAQ"
        title="Common Questions Before You Start With Boxify"
        subtitle="Clear answers, especially around POD, reporting, warehousing, and the first step."
        align="center"
      />

      <div className="mx-auto mt-12 grid max-w-4xl gap-4">
        {faqs.map((item) => (
          <details
            key={item.question}
            className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 open:border-orange-500/40"
          >
            <summary className="cursor-pointer list-none text-lg font-black text-white">
              <div className="flex items-center justify-between gap-4">
                <span>{item.question}</span>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm text-white group-open:rotate-45">
                  +
                </span>
              </div>
            </summary>
            <p className="mt-4 text-sm leading-7 text-zinc-400">{item.answer}</p>
          </details>
        ))}
      </div>

      <div className="mt-10 text-center">
       <CTAButton href="#fulfilment-form" section="faq-scroll-to-form">
          {ctas.qualification}
        </CTAButton>
      </div>
    </SectionWrapper>
  );
}