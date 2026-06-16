"use client";

import { FormEvent, useEffect, useId, useState } from "react";
import { boxifyData } from "@/data/boxify";
import {
  buildLeadEventId,
  captureAttributionFromCurrentUrl,
  getAttributionData,
  trackLeadAfterMailerLiteSuccess,
  trackModalSubmitAttempt,
  trackWhatsAppRedirect,
} from "@/lib/tracking";

type ModalSource = {
  sourceSection: string;
  sourceLabel: string;
};

type RequestPayload = {
  name: string;
  email: string;
  leadSource: string;
  sourceSection: string;
  sourceLabel: string;
  eventId: string;
  attribution: ReturnType<typeof getAttributionData>;
};

function getStoredModalSource(): ModalSource {
  if (typeof window === "undefined") {
    return {
      sourceSection: "unknown",
      sourceLabel: "Boxify CTA",
    };
  }

  try {
    const raw = window.sessionStorage.getItem("boxify_modal_source");

    if (!raw) {
      return {
        sourceSection: "unknown",
        sourceLabel: "Boxify CTA",
      };
    }

    return JSON.parse(raw) as ModalSource;
  } catch {
    return {
      sourceSection: "unknown",
      sourceLabel: "Boxify CTA",
    };
  }
}

export default function FulfilmentRequestModal() {
  const titleId = useId();
  const descriptionId = useId();
  const { modal, ctas } = boxifyData;

  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "redirecting">(
    "idle"
  );

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        window.location.hash = "";
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("submitting");

    captureAttributionFromCurrentUrl();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const eventId = buildLeadEventId();
    const source = getStoredModalSource();

    const payload: RequestPayload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim().toLowerCase(),
      leadSource: modal.leadSource,
      sourceSection: source.sourceSection,
      sourceLabel: source.sourceLabel,
      eventId,
      attribution: getAttributionData(),
    };

    trackModalSubmitAttempt({
      eventId,
      section: payload.sourceSection,
      label: payload.sourceLabel,
      email: payload.email,
    });

    try {
      const response = await fetch("/api/fulfilment-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        success?: boolean;
        whatsappUrl?: string;
        error?: string;
      };

      if (!response.ok || !result.success || !result.whatsappUrl) {
        throw new Error(result.error || modal.errorMessage);
      }

      trackLeadAfterMailerLiteSuccess({
        eventId,
        section: payload.sourceSection,
        label: payload.sourceLabel,
        email: payload.email,
      });

      const ttq = (
        window as Window & {
          ttq?: {
            track?: (
              eventName: string,
              properties?: Record<string, unknown>,
              options?: Record<string, unknown>
            ) => void;
          };
        }
      ).ttq;

      ttq?.track?.(
        "Contact",
        {
          content_name: "Boxify WhatsApp Contact",
          content_category: "Boxify Landing Page",
          event_id: eventId,
        },
        {
          event_id: eventId,
        }
      );

      trackWhatsAppRedirect({
        eventId,
        section: payload.sourceSection,
        label: payload.sourceLabel,
        destination: result.whatsappUrl,
      });

      setStatus("redirecting");
      window.location.assign(result.whatsappUrl);
    } catch (submitError) {
      setStatus("idle");
      setError(
        submitError instanceof Error ? submitError.message : modal.errorMessage
      );
    }
  }

  const isBusy = status === "submitting" || status === "redirecting";

  return (
    <section
      id="fulfilment-request-modal"
      className="invisible fixed left-0 top-0 z-[99999] flex h-screen w-screen items-center justify-center bg-black/85 px-3 py-3 opacity-0 backdrop-blur-md transition target:visible target:opacity-100"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <a
        href="#"
        aria-label={modal.closeLabel}
        className="absolute inset-0 z-0 cursor-default"
      />

      <div className="relative z-10 flex max-h-[calc(100vh-24px)] w-full max-w-md flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-950 shadow-[0_30px_100px_rgba(0,0,0,0.85)]">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 bg-zinc-950 px-4 py-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange-400">
              Fulfilment Request
            </p>

            <h2
              id={titleId}
              className="mt-2 text-xl font-black leading-tight tracking-tight text-white sm:text-2xl"
            >
              Let Boxify Know You’re Interested
            </h2>
          </div>

          <a
            href="#"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xl font-black text-white transition hover:bg-white/10"
            aria-label={modal.closeLabel}
          >
            ×
          </a>
        </div>

        <form
          method="post"
          action="/api/fulfilment-request"
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-4 py-4"
        >
          <p
            id={descriptionId}
            className="text-sm font-medium leading-7 text-zinc-300"
          >
            Drop your name and email. Your request will be saved first, then
            WhatsApp will open with your message already prepared.
          </p>

          <div className="mt-4 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-4">
            <p className="text-xs font-bold leading-6 text-orange-100">
              Best for ecommerce vendors who want fulfilment support in Abuja,
              Lagos, or both.
            </p>
          </div>

          <div className="mt-5 grid gap-4">
            <Input
              label="Your name"
              name="name"
              placeholder="Example: Michael"
              autoComplete="name"
            />

            <Input
              label="Email address"
              name="email"
              type="email"
              placeholder="Example: michael@email.com"
              autoComplete="email"
            />
          </div>

          {error ? (
            <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm font-bold leading-7 text-red-200">
              {error}
            </div>
          ) : null}

          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">

            <button
  type="submit"
  disabled={isBusy}
  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-4 text-sm font-black text-white shadow-[0_0_30px_rgba(37,211,102,0.35)] transition hover:bg-[#1ebe5d] disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
>
  <svg
    aria-hidden="true"
    viewBox="0 0 32 32"
    className="size-5 shrink-0 fill-current"
  >
    <path d="M16.04 3C8.86 3 3.02 8.73 3.02 15.78c0 2.26.61 4.47 1.76 6.4L3 29l7.02-1.8a13.22 13.22 0 0 0 6.02 1.48c7.18 0 13.02-5.73 13.02-12.78S23.22 3 16.04 3Zm0 23.5c-1.9 0-3.76-.5-5.4-1.44l-.39-.22-4.16 1.07 1.11-4.01-.26-.41a10.36 10.36 0 0 1-1.62-5.55c0-5.86 4.86-10.63 10.82-10.63s10.82 4.77 10.82 10.63S22 26.5 16.04 26.5Zm5.92-7.96c-.32-.16-1.9-.92-2.2-1.03-.3-.11-.52-.16-.74.16-.22.32-.85 1.03-1.04 1.24-.19.22-.38.24-.7.08-.32-.16-1.36-.49-2.6-1.55-.96-.84-1.61-1.88-1.8-2.2-.19-.32-.02-.49.14-.65.14-.14.32-.38.48-.57.16-.19.22-.32.32-.54.11-.22.05-.41-.03-.57-.08-.16-.74-1.75-1.01-2.4-.27-.65-.54-.56-.74-.57h-.63c-.22 0-.57.08-.87.41-.3.32-1.15 1.1-1.15 2.69s1.18 3.12 1.34 3.34c.16.22 2.32 3.49 5.62 4.89.79.33 1.4.53 1.88.68.79.25 1.51.21 2.08.13.63-.09 1.9-.76 2.17-1.5.27-.73.27-1.36.19-1.5-.08-.13-.3-.21-.63-.38Z" />
  </svg>

  <span>
    {status === "submitting"
      ? "Submitting..."
      : status === "redirecting"
        ? "Opening WhatsApp..."
        : ctas.modalSubmit}
  </span>
</button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Input({
  label,
  name,
  placeholder,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-black text-white">{label}</span>

      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-base text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-500"
      />
    </label>
  );
}