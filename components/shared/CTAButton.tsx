"use client";

import Link from "next/link";
import { trackLeadClick } from "@/lib/tracking";

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  section: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export default function CTAButton({
  href,
  children,
  section,
  variant = "primary",
  className = "",
}: CTAButtonProps) {
  const isInternalAnchor = href.startsWith("#");

  const baseClass =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black";

  const variants = {
    primary:
      "bg-[#ea580c] text-white shadow-[0_0_30px_rgba(234,88,12,0.35)] hover:bg-orange-600",
    secondary:
      "border border-white/15 bg-white/10 text-white backdrop-blur hover:bg-white/15",
    ghost:
      "text-orange-300 underline-offset-4 hover:text-orange-200 hover:underline",
  };

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    trackLeadClick({
      label: typeof children === "string" ? children : "Boxify CTA",
      destination: href,
      section,
    });

    if (isInternalAnchor) {
      event.preventDefault();

      const target = document.querySelector(href);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        window.history.pushState(null, "", href);
      }
    }
  }

  return (
    <Link
      href={href}
      target={isInternalAnchor ? undefined : "_blank"}
      rel={isInternalAnchor ? undefined : "noopener noreferrer"}
      onClick={handleClick}
      className={`${baseClass} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}