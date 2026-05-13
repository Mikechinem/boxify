import { boxifyData } from "@/data/boxify";
import CTAButton from "@/components/shared/CTAButton";
import SectionHeading from "@/components/shared/SectionHeading";
import SectionWrapper from "@/components/shared/SectionWrapper";

export default function CostOfInaction() {
  const { costs, ctas, whatsappUrl } = boxifyData;

  return (
    <SectionWrapper className="bg-black">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Hidden cost"
            title={costs.headline}
            subtitle={costs.subheadline}
          />

          <div className="mt-10 grid gap-4">
            {costs.items.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <h3 className="text-lg font-black text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-9">
            <CTAButton href={whatsappUrl} section="cost-of-inaction">
              {ctas.cost}
            </CTAButton>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-zinc-950 p-6 glow-card">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-300">
            One failed delivery can cost more than movement
          </p>

          <div className="mt-6 space-y-4">
            {[
              ["Customer order", "Won"],
              ["Rider movement", "Cost"],
              ["Customer unavailable", "Delay"],
              ["Returned order", "Loss"],
              ["Trust damage", "Repeat sale risk"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-4"
              >
                <span className="text-sm text-zinc-300">{label}</span>
                <span className="text-sm font-black text-orange-300">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-3xl bg-orange-500 p-5 text-black">
            <p className="text-sm font-black uppercase tracking-[0.2em]">
              The painful part
            </p>
            <p className="mt-2 text-2xl font-black leading-tight">
              You already did the hard work of getting the sale. Fulfilment is where it starts falling apart.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}