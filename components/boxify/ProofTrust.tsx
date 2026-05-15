import Image from "next/image";
import { boxifyData } from "@/data/boxify";
import CTAButton from "@/components/shared/CTAButton";
import SectionHeading from "@/components/shared/SectionHeading";
import SectionWrapper from "@/components/shared/SectionWrapper";

const proofCards = [
  {
    title: "Orders Move With Confirmation",
    body: "Customers are contacted before dispatch so vendors do not waste movement on unavailable or unsure buyers.",
    image:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/6.png?updatedAt=1778635894098",
  },
  {
    title: "Vendors Get Delivery Visibility",
    body: "Every order feels less blind when delivery movement, outcomes, and pending issues are reported clearly.",
    image:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/9.png?updatedAt=1778635894076",
  },
  {
    title: "Customers Feel Better Handled",
    body: "A smoother confirmation and delivery process helps your brand look more organized after the sale.",
    image:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/2.png?updatedAt=1778635894092",
  },
  {
    title: "Abuja Orders Feel Closer",
    body: "Serve Abuja customers through a local fulfilment process without setting up your own branch there.",
    image:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/7.png?updatedAt=1778635894097",
  },
  {
    title: "Lagos Fulfilment Becomes Cleaner",
    body: "Move Lagos orders with less rider-chasing, less back-and-forth, and a clearer delivery flow.",
    image:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/4.png?updatedAt=1778635894034",
  },
  {
    title: "POD Becomes Less Chaotic",
    body: "For Abuja and Lagos orders, cash-on-delivery collection can be managed inside the fulfilment process.",
    image:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/5.png?updatedAt=1778635894121",
  },
  {
    title: "Daily Reports Build Confidence",
    body: "Know what happened with your orders, delivery outcomes, payments, and pending fulfilment issues.",
    image:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/8.png?updatedAt=1778635894095",
  },
  {
    title: "Remittance Feels Clearer",
    body: "Collected payments are easier to trust when remittance is tied to a proper fulfilment reporting flow.",
    image:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/10.png?updatedAt=1778635894027",
  },
  {
    title: "Returns Stop Becoming Random",
    body: "Rejected or failed deliveries can be handled with a clearer process instead of stressful back-and-forth.",
    image:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/3.png?updatedAt=1778635894030",
  },
];


export default function ProofTrust() {
  const { credibility, ctas } = boxifyData;

  return (
    <SectionWrapper className="bg-zinc-950">
      <SectionHeading
        eyebrow="Join 100+ Winning Vendors"
        title="Real Fulfilment Proof Beats Another Logistics Promise"
        align="center"
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {proofCards.map((item, index) => (
          <article
            key={item.title}
            className="w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-4 transition hover:-translate-y-1 hover:border-orange-500/40 hover:bg-orange-500/10"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-black p-3">
              <Image
                src={item.image}
                fill
                alt={item.title}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-contain"
              />
            </div>

            <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-orange-300">
              Vendor Result {String(index + 1).padStart(2, "0")}
            </p>

            <h3 className="mt-3 text-lg font-black text-white">
              {item.title}
            </h3>

            <p className="mt-2 text-sm leading-7 text-zinc-400">
              {item.body}
            </p>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-4xl rounded-[2rem] border border-orange-500/20 bg-orange-500/10 p-6 text-center sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-300">
          Ready To Clean Up Your Fulfilment?
        </p>

        <h3 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
          Stop letting delivery uncertainty weaken the trust your ads and
          products worked hard to build.
        </h3>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-300">
          Share your product type, customer locations, order volume, and POD
          needs so Boxify can confirm the right fulfilment setup for your Abuja
          and Lagos orders.
        </p>

        <div className="mt-7 flex justify-center">
          <CTAButton href="#fulfilment-form" section="proof-scroll-to-form">
            {ctas.qualification}
          </CTAButton>
        </div>
      </div>
    </SectionWrapper>
  );
}