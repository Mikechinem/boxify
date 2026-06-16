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
  whatsappNumber: string;
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
      whatsappNumber: String(formData.get("whatsappNumber") || "").trim(),
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
            Drop your name and WhatsApp number. Your request will be saved first,
            then WhatsApp will open with your message already prepared.
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
              label="WhatsApp number"
              name="whatsappNumber"
              placeholder="Example: 08012345678"
              autoComplete="tel"
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
              className="mt-4 w-full rounded-full bg-[#ea580c] px-5 py-4 text-sm font-black text-white shadow-[0_0_30px_rgba(234,88,12,0.35)] transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
            >
              {status === "submitting"
                ? "Submitting..."
                : status === "redirecting"
                  ? "Opening WhatsApp..."
                  : ctas.modalSubmit}
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