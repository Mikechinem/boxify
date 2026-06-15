import Image from "next/image";
import SectionWrapper from "@/components/shared/SectionWrapper";

export default function CostOfInaction() {
  return (
    <SectionWrapper className="bg-black">
      <div className="relative mx-auto max-w-6xl">
        <div className="absolute -inset-8 rounded-[3rem] bg-orange-600/20 blur-3xl" />

        <div className="relative">
          <div className="mb-8 text-center">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-400">
              Delivery Outcome
            </p>

            <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              The sale only counts when the customer receives the order.
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg font-medium leading-9 text-zinc-300 sm:text-xl">
              Every smooth delivery protects the trust your ads, product, and
              brand worked hard to build.
            </p>
          </div>

          <div className="relative mx-auto min-h-[460px] w-full overflow-hidden rounded-[2rem] sm:min-h-[620px] lg:min-h-[760px]">
            <Image
              src="https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/delivered_succes.png"
              alt="Successful delivery proof"
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}