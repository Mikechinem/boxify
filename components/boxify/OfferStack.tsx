import { boxifyData } from "@/data/boxify";
import CTAButton from "@/components/shared/CTAButton";
import SectionHeading from "@/components/shared/SectionHeading";
import SectionWrapper from "@/components/shared/SectionWrapper";
import LeadForm from "@/components/boxify/LeadForm";

export default function OfferStack() {
  const { offerItems, bonuses, ctas } = boxifyData;

  return (
    <SectionWrapper className="bg-black">
      {/* Top offer + form layout */}
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="What You Get"
            title="Here’s The Fulfilment System You’re Getting"
            subtitle="Instead of spending money on rent, staff, riders, storage, call follow-up, and manual reporting, Boxify gives you one fulfilment partner built around the way ecommerce businesses actually sell."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {offerItems.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
              >
                <h3 className="text-base font-black text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <LeadForm />
      </div>

      {/* Full-width fulfilment support section */}
      <section
        aria-labelledby="fulfilment-support-title"
        className="mt-20 rounded-[2rem] border border-orange-500/20 bg-orange-500/10 p-6 sm:p-8 lg:p-10"
      >
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-400">
              Cleaner Fulfilment
            </p>

            <h3
              id="fulfilment-support-title"
              className="mt-3 max-w-xl text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl"
            >
              When You Start With Boxify, You Also Get Support To Make Your
              Fulfilment Cleaner
            </h3>

            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-300 sm:text-base">
              Because better delivery starts before the rider moves. Boxify
              helps you tighten the parts of fulfilment that usually cause
              failed delivery, poor communication, and customer distrust.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {bonuses.map((bonus, index) => (
              <div
                key={bonus.title}
                className="rounded-2xl border border-white/10 bg-black/40 p-5 transition hover:-translate-y-1 hover:border-orange-500/40"
              >
                <div className="mb-5 flex size-10 items-center justify-center rounded-2xl bg-orange-500 text-sm font-black text-white">
                  {index + 1}
                </div>

                <h4 className="font-black text-orange-200">{bonus.title}</h4>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {bonus.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Centered CTA */}
      <div className="mt-9 flex justify-center">
        <CTAButton
          href="#fulfilment-form"
          section="offer-stack-scroll-to-form"
        >
          {ctas.qualification}
        </CTAButton>
      </div>
    </SectionWrapper>
  );
}