import { boxifyData } from "@/data/boxify";
import CTAButton from "@/components/shared/CTAButton";
import SectionWrapper from "@/components/shared/SectionWrapper";

export default function ProblemAgitation() {
  const { intro, problems, ctas, whatsappUrl } = boxifyData;

  return (
    <>
      <SectionWrapper className="bg-white text-zinc-950">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-orange-600">
            After the sale
          </p>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            {intro.headline}
          </h2>

          <div className="mt-8 space-y-4 text-lg leading-8 text-zinc-700">
            {intro.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <div className="mt-9">
            <CTAButton href="#fulfilment-form" section="problem-scroll-to-form">
            {ctas.problem}
           </CTAButton>
            </div>
             </div>
        </SectionWrapper>

      <SectionWrapper className="bg-zinc-950">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-10">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-orange-400">
              The real problem
            </p>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              {problems.headline}
            </h2>
            <p className="mt-6 text-base leading-8 text-zinc-300">{problems.copy}</p>
            <p className="mt-6 rounded-3xl border border-orange-500/20 bg-orange-500/10 p-5 text-sm font-bold leading-7 text-orange-100">
              {problems.closing}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {problems.cards.map((card, index) => (
              <div
                key={card.title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-orange-500/40 hover:bg-orange-500/10"
              >
                <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-orange-500/15 text-lg font-black text-orange-300">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="text-xl font-black text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}