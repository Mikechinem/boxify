"use client";

import { captureAttributionFromCurrentUrl, trackCtaClick } from "@/lib/tracking";

type CTAButtonProps = {
  href?: string;
  children: React.ReactNode;
  section: string;
  label?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export default function CTAButton({
  href = "#fulfilment-request-modal",
  children,
  section,
  label,
  variant = "primary",
  className = "",
}: CTAButtonProps) {
  const baseClass =
    "inline-flex cursor-pointer select-none items-center justify-center rounded-full px-6 py-3 text-sm font-bold transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black";

  const variants = {
    primary:
      "bg-[#ea580c] text-white shadow-[0_0_30px_rgba(234,88,12,0.35)] hover:bg-orange-600",
    secondary:
      "border border-white/15 bg-white/10 text-white backdrop-blur hover:bg-white/15",
    ghost:
      "text-orange-300 underline-offset-4 hover:text-orange-200 hover:underline",
  };

  function getButtonLabel() {
    if (label) return label;

    return typeof children === "string" ? children : "Boxify CTA";
  }

  function handleClick() {
    const buttonLabel = getButtonLabel();

    captureAttributionFromCurrentUrl();

    try {
      window.sessionStorage.setItem(
        "boxify_modal_source",
        JSON.stringify({
          sourceSection: section,
          sourceLabel: buttonLabel,
        })
      );
    } catch {
      // Do nothing. Modal still opens through the hash link.
    }

    trackCtaClick({
      label: buttonLabel,
      section,
      destination: href,
    });
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      aria-label={getButtonLabel()}
      className={`${baseClass} ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}