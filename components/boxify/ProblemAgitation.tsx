import Image from "next/image";
import { boxifyData } from "@/data/boxify";
import SectionWrapper from "@/components/shared/SectionWrapper";

const problemImages = [
  {
    src: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/boxifyarranged_landing_2400w.jpg",
    alt: "Boxify arranged ecommerce packages ready for fulfilment",
    title: "Orders Should Not Look Scattered After The Customer Pays.",
    caption:
      "A clear fulfilment process helps your products move from storage to packaging to delivery without making your brand look disorganized.",
  },
  {
    src: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/boxify_bikes_landing_2400w.jpg",
    alt: "Boxify delivery bikes ready for ecommerce dispatch",
    title: "The Delivery Stage Is Where Customer Trust Is Won Or Lost.",
    caption:
      "When dispatch is structured, customers get a smoother experience and vendors stop chasing riders for every single update.",
  },
];

export default function ProblemAgitation() {
  const { problems } = boxifyData;

  return (
    <SectionWrapper className="bg-zinc-950">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-orange-400">
          The Real Problem
        </p>

        <h2 className="mx-auto max-w-5xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          {problems.headline}
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-9 text-zinc-300 sm:text-xl">
          {problems.copy}
        </p>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {problemImages.map((item) => (
          <article
            key={item.title}
            className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 transition hover:-translate-y-1 hover:border-orange-500/40 hover:bg-orange-500/10"
          >
            <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/10 bg-black p-3 sm:min-h-[380px]">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-2"
              />
            </div>

            <div className="p-2 pt-6">
              <h3 className="text-2xl font-black leading-tight text-white sm:text-3xl">
                {item.title}
              </h3>

              <p className="mt-3 text-base leading-8 text-zinc-400">
                {item.caption}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-4xl rounded-[2rem] border border-orange-500/20 bg-orange-500/10 p-6 text-center sm:p-8">
        <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
          The more orders you get, the more your fulfilment system needs to look organized behind the scenes.
        </h3>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-zinc-300">
          Boxify helps ecommerce vendors replace delivery chaos with a cleaner process for storage, confirmation, packaging, dispatch, reporting, and remittance.
        </p>
      </div>
    </SectionWrapper>
  );
}