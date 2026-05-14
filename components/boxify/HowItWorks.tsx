import Image from "next/image";
import { boxifyData } from "@/data/boxify";
import CTAButton from "@/components/shared/CTAButton";
import SectionWrapper from "@/components/shared/SectionWrapper";

export default function HowItWorks() {
  const { steps, ctas } = boxifyData;

  return (
    <SectionWrapper className="bg-black">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-orange-400">
          Unique Mechanism
        </p>

        <h2 className="mx-auto max-w-5xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          How The Boxify Fulfilment Flow Works
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-9 text-zinc-300 sm:text-xl">
          A simple order flow built to remove the stress between “customer
          ordered” and “customer received” — so products move with confirmation,
          packaging, delivery, reporting, and remittance.
        </p>
      </div>

<div className="relative left-1/2 mt-12 w-screen -translate-x-1/2 px-4 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-7xl">
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 p-4 glow-card sm:p-6">
      <div className="absolute -inset-10 bg-orange-600/10 blur-3xl" />

      <div className="relative rounded-[1.5rem] border border-white/10 bg-black p-4 sm:p-6">
        <div className="mb-5 flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-400">
              Boxify Fulfilment Flow
            </p>

            <h3 className="mt-2 text-2xl font-black leading-tight text-white sm:text-3xl">
              From Customer Confirmation To Delivery Report
            </h3>
          </div>

          <span className="mx-auto w-fit rounded-full bg-orange-500/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-orange-200 sm:mx-0">
            Connected System
          </span>
        </div>

        <div className="relative flex h-[280px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 p-3 sm:h-[460px] lg:h-[620px]">
          <Image
            src="https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/how_boxi_orange.png"
            alt="Boxify fulfilment process flow"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
            className="object-contain p-2 drop-shadow-[0_0_35px_rgba(234,88,12,0.35)]"
          />
        </div>

        <p className="mx-auto mt-5 max-w-3xl text-center text-sm font-medium leading-7 text-zinc-400">
          One connected flow for customer confirmation, sorting, packaging,
          delivery, reporting, and remittance — so fulfilment does not break
          after the customer says yes.
        </p>
      </div>
    </div>
  </div>
</div>
      <div className="mx-auto mt-14 grid max-w-5xl gap-5">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-orange-500/40 hover:bg-orange-500/10 sm:grid sm:grid-cols-[120px_1fr] sm:gap-6 sm:p-7"
          >
            <div className="mb-5 flex items-center gap-3 sm:mb-0">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-orange-500 text-xl font-black text-white">
                {index + 1}
              </div>

              <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-300 sm:hidden">
                Step {index + 1}
              </p>
            </div>

            <div>
              <p className="hidden text-sm font-black uppercase tracking-[0.18em] text-orange-300 sm:block">
                Step {index + 1}
              </p>

              <h3 className="mt-1 text-2xl font-black leading-tight text-white sm:text-3xl">
                {step.title}
              </h3>

              <p className="mt-4 text-base leading-8 text-zinc-400 sm:text-lg">
                {step.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <CTAButton href="#fulfilment-form" section="how-it-works-scroll-to-form">
          {ctas.mechanism}
        </CTAButton>
      </div>
    </SectionWrapper>
  );
}