import { boxifyData } from "@/data/boxify";
import CTAButton from "@/components/shared/CTAButton";
import SectionWrapper from "@/components/shared/SectionWrapper";
import LeadForm from "@/components/boxify/LeadForm";

export default function OfferStack() {
  const { offerItems, ctas } = boxifyData;

  return (
    <SectionWrapper className="bg-black">
      {/* Top offer + form layout */}
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-orange-400">
            What You Get
          </p>

          <h2 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Here’s The Fulfilment System You’re Getting
          </h2>

          <p className="mt-6 max-w-3xl text-lg font-medium leading-9 text-zinc-300 sm:text-xl">
            Instead of spending money on rent, staff, riders, storage, call
            follow-up, and manual reporting, Boxify gives you one fulfilment
            partner built around the way ecommerce businesses actually sell.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {offerItems.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-orange-500/40 hover:bg-orange-500/10"
              >
                <h3 className="text-xl font-black leading-tight text-white sm:text-2xl">
                  {item.title}
                </h3>

                <p className="mt-4 text-base leading-8 text-zinc-400 sm:text-lg">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <LeadForm />
      </div>
    </SectionWrapper>
  );
}