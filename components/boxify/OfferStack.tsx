import { boxifyData } from "@/data/boxify";
import CTAButton from "@/components/shared/CTAButton";
import SectionWrapper from "@/components/shared/SectionWrapper";

export default function OfferStack() {
  const { offerItems, ctas } = boxifyData;

  return (
    <SectionWrapper className="bg-black">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-orange-400">
          What You Get
        </p>

        <h2 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Here’s The Fulfilment System You’re Getting
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-9 text-zinc-300 sm:text-xl">
          Instead of spending money on warehouse rent, hiring riders, setting up
          a call centre, chasing POD, and manually following every order, Boxify
          gives you a clearer fulfilment flow for Abuja and Lagos.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {offerItems.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-orange-500/40 hover:bg-orange-500/10"
          >
            <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-orange-500/15 text-lg font-black text-orange-300">
              ✓
            </div>

            <h3 className="text-xl font-black text-white">{item.title}</h3>

            <p className="mt-3 text-base leading-7 text-zinc-400">
              {item.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-4xl rounded-[2rem] border border-orange-500/20 bg-orange-500/10 p-6 text-center sm:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-300">
          Important
        </p>

        <h3 className="mt-3 text-2xl font-black leading-tight text-white sm:text-3xl">
          POD/cash collection is only for Abuja and Lagos.
        </h3>

        <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-8 text-orange-50">
          If you need fulfilment outside Abuja and Lagos, Boxify can still review
          your request, but cash-on-delivery should not be assumed nationwide
          unless Boxify confirms it directly.
        </p>

        <div className="mt-7">
          <CTAButton section="offer-stack">
            {ctas.qualification}
          </CTAButton>
        </div>
      </div>
    </SectionWrapper>
  );
}