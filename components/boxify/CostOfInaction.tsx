import Image from "next/image";
import { boxifyData } from "@/data/boxify";
import CTAButton from "@/components/shared/CTAButton";
import SectionWrapper from "@/components/shared/SectionWrapper";

const costPoints = [
  {
    title: "Failed delivery drains profit",
    body: "You pay for movement, time, and follow-up — even when the customer does not receive the order.",
  },
  {
    title: "Poor delivery kills repeat sales",
    body: "Customers may like your product, but still avoid buying again if delivery felt stressful.",
  },
  {
    title: "Manual follow-up blocks growth",
    body: "You cannot scale smoothly if every order still needs rider-chasing and WhatsApp tracking.",
  },
];

export default function CostOfInaction() {
  const { costs, ctas } = boxifyData;

  return (
    <SectionWrapper className="bg-black">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        {/* Text content */}
        <div>
          <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-orange-400">
            Hidden Cost
          </p>

          <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {costs.headline}
          </h2>

          <p className="mt-6 max-w-2xl text-lg font-medium leading-9 text-zinc-300 sm:text-xl">
            {costs.subheadline}
          </p>

          <div className="mt-9 grid gap-4">
            {costPoints.map((item, index) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-orange-500/40 hover:bg-orange-500/10"
              >
                <div className="flex gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-sm font-black text-white">
                    {index + 1}
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-base leading-7 text-zinc-400">
                      {item.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-9">
            <CTAButton href="#fulfilment-form" section="cost-scroll-to-form">
              {ctas.cost}
            </CTAButton>
          </div>
        </div>

        {/* Image visual */}
        <div className="relative">
          <div className="absolute -inset-5 rounded-[2.5rem] bg-orange-600/20 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 p-4 glow-card">
            <div className="rounded-[1.5rem] border border-white/10 bg-black p-4">
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-400">
                    Delivery Outcome
                  </p>
                  <h3 className="mt-1 text-2xl font-black text-white">
                    The sale only counts when the customer receives the order.
                  </h3>
                </div>

                <span className="w-fit rounded-full bg-orange-500 px-3 py-1 text-xs font-black text-white">
                  PROOF
                </span>
              </div>

              <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 p-4 sm:min-h-[420px]">
                <Image
                  src="https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/delivered_succes.png"
                  alt="Successful delivery proof"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
                  className="object-contain p-3"
                />
              </div>

              <p className="mt-5 text-center text-sm font-bold leading-7 text-zinc-300">
                Every smooth delivery protects the trust your ads, product, and
                brand worked hard to build.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}