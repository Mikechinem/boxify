import { boxifyData } from "@/data/boxify";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionHeading from "@/components/shared/SectionHeading";

export default function RiskReversal() {
  const { risk } = boxifyData;

  return (
    <SectionWrapper className="bg-black">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Almost zero risk from your side"
            title={risk.headline}
            subtitle={risk.body}
          />
          <p className="mt-6 rounded-3xl border border-orange-500/20 bg-orange-500/10 p-5 text-sm font-bold leading-7 text-orange-100">
            No confusion. No blind trust. No vague promises. You should understand the process before your first order moves.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-5">
          {risk.flow.map((item, index) => (
            <div
              key={item}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-center"
            >
              <div className="mx-auto flex size-11 items-center justify-center rounded-2xl bg-orange-500 text-sm font-black text-white">
                {index + 1}
              </div>
              <p className="mt-4 text-sm font-bold leading-6 text-white">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}