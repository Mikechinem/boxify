import Image from "next/image";
import { boxifyData } from "@/data/boxify";
import SectionWrapper from "@/components/shared/SectionWrapper";

const solutionImages = [
  {
    src: "https://ik.imagekit.io/j1e78ujalr/rechargablesolarbank/boxifyimg2.jpeg?updatedAt=1774811213794",
    alt: "Boxify ecommerce fulfilment process",
    label: "Fulfilment In Motion",
    title: "Orders move through a cleaner fulfilment flow.",
  },
  {
    src: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/wharehouseimage.png",
    alt: "Boxify warehouse fulfilment support",
    label: "Warehouse Support",
    title: "Products stay closer to Abuja and Lagos customers.",
  },
];

export default function UniqueSolution() {
  const { solution, comparison } = boxifyData;

  return (
    <SectionWrapper className="bg-zinc-950">
      {/* Headline section */}
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-orange-400">
          The Boxify Solution
        </p>

        <h2 className="mx-auto max-w-5xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          {solution.headline}
        </h2>
      </div>

      {/* Image section */}
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {solutionImages.map((image) => (
          <article
            key={image.src}
            className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 transition hover:-translate-y-1 hover:border-orange-500/40 hover:bg-orange-500/10"
          >
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-300">
                  {image.label}
                </p>

                <h3 className="mt-2 text-xl font-black leading-tight text-white sm:text-2xl">
                  {image.title}
                </h3>
              </div>

              <span className="w-fit rounded-full bg-orange-500/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-orange-200">
                Boxify
              </span>
            </div>

            <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/10 bg-black p-3 sm:min-h-[420px]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-2"
              />
            </div>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}