"use client";

import CTAButton from "@/components/shared/CTAButton";
import { boxifyData } from "@/data/boxify";

export default function StickyMobileCTA() {
  const { ctas } = boxifyData;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/90 px-4 py-3 backdrop-blur-xl sm:hidden">
      <CTAButton
        section="sticky-mobile-cta"
        className="w-full py-4 text-base"
      >
        {ctas.qualification}
      </CTAButton>
    </div>
  );
}