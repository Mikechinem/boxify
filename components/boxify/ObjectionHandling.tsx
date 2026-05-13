import { boxifyData } from "@/data/boxify";
import SectionHeading from "@/components/shared/SectionHeading";
import SectionWrapper from "@/components/shared/SectionWrapper";

export default function ObjectionHandling() {
  const { objections } = boxifyData;

  return (
    <SectionWrapper className="bg-zinc-950">
      <SectionHeading
        eyebrow="You're right to be critical"
        title="We believe you should be clear before jumping in"
        subtitle="These are the questions ecommerce vendors usually ask before trusting us."
        align="center"
      />

      <div className="mx-auto mt-12 grid max-w-4xl gap-4">
        {objections.map((item) => (
          <details
            key={item.question}
            className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 open:border-orange-500/40 open:bg-orange-500/10"
          >
            <summary className="cursor-pointer list-none text-lg font-black text-white">
              <div className="flex items-center justify-between gap-4">
                <span>{item.question}</span>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm text-white group-open:rotate-45">
                  +
                </span>
              </div>
            </summary>
            <p className="mt-4 text-sm leading-7 text-zinc-300">{item.answer}</p>
          </details>
        ))}
      </div>
    </SectionWrapper>
  );
}