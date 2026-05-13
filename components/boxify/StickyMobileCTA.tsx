import { boxifyData } from "@/data/boxify";
import CTAButton from "@/components/shared/CTAButton";

export default function StickyMobileCTA() {
  const { whatsappUrl } = boxifyData;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/90 p-3 backdrop-blur-xl md:hidden">
      <CTAButton
        href={whatsappUrl}
        section="sticky-mobile"
        className="w-full py-4"
      >
        Set Up Fulfilment
      </CTAButton>
    </div>
  );
}