import { boxifyData } from "@/data/boxify";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionHeading from "@/components/shared/SectionHeading";

export default function UniqueSolution() {
  const { solution, comparison } = boxifyData;

  return (
    <SectionWrapper className="bg-zinc-950">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="The Boxify solution"
            title={solution.headline}
            subtitle={solution.subheadline}
          />
          <p className="mt-6 text-base leading-8 text-zinc-300">{solution.body}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {solution.flow.map((item) => (
              <span
                key={item}
                className="rounded-full border border-orange-500/25 bg-orange-500/10 px-4 py-2 text-xs font-bold text-orange-200"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-black p-4 glow-card">
          <div className="rounded-[1.5rem] border border-white/10 bg-zinc-950 p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-400">
              How You Deliver Matters
            </p>
            <h3 className="mt-4 text-3xl font-black tracking-tight text-white">
              This Is Not Just Dispatch. This Is Fulfilment.
            </h3>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              No more random riders moving your package. Boxify helps manage the order journey.
            </p>

            <div className="mt-8 grid gap-3">
              {comparison.map((row) => (
                <div
                  key={row.usual}
                  className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:grid-cols-2"
                >
                  <div>
                    <p className="text-xs text-zinc-500">The usual way</p>
                    <p className="mt-1 text-sm text-zinc-300">{row.usual}</p>
                  </div>
                  <div className="rounded-xl bg-orange-500/10 p-3">
                    <p className="text-xs text-orange-300">The Boxify way</p>
                    <p className="mt-1 text-sm font-bold text-white">{row.boxify}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm font-bold leading-7 text-orange-100">
              If you are serious about scaling ecommerce, you do not just need delivery. You need fulfilment that protects the sale after the customer says yes.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}