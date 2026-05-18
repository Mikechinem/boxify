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
  whatsappNumber: string;
  businessName: string;
  productCategory: string;
  fulfilmentLocation: string;
  averageOrders: string;
  podNeed: string;
  deliveryChallenge: string;
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
      email: String(formData.get("email") || "").trim(),
      whatsappNumber: String(formData.get("whatsappNumber") || "").trim(),
      businessName: String(formData.get("businessName") || "").trim(),
      productCategory: String(formData.get("productCategory") || "").trim(),
      fulfilmentLocation: String(formData.get("fulfilmentLocation") || "").trim(),
      averageOrders: String(formData.get("averageOrders") || "").trim(),
      podNeed: String(formData.get("podNeed") || "").trim(),
      deliveryChallenge: String(formData.get("deliveryChallenge") || "").trim(),
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
      fulfilmentLocation: payload.fulfilmentLocation,
      averageOrders: payload.averageOrders,
      podNeed: payload.podNeed,
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
        fulfilmentLocation: payload.fulfilmentLocation,
        averageOrders: payload.averageOrders,
        podNeed: payload.podNeed,
      });

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

      <div className="relative z-10 flex max-h-[calc(100vh-24px)] w-full max-w-xl flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-950 shadow-[0_30px_100px_rgba(0,0,0,0.85)]">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 bg-zinc-950 px-4 py-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange-400">
              {modal.eyebrow}
            </p>

            <h2
              id={titleId}
              className="mt-2 text-xl font-black leading-tight tracking-tight text-white sm:text-2xl"
            >
              {modal.title}
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
            Answer these quick questions. After submitting, WhatsApp will open
            with your request already prepared.
          </p>

          <div className="mt-4 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-4">
            <p className="text-xs font-bold leading-6 text-orange-100">
              Best for ecommerce vendors already selling physical products and
              looking for fulfilment support in Abuja, Lagos, or both.
            </p>
          </div>

          <div className="mt-5 grid gap-3">
            <Input
              label={modal.fields.name}
              name="name"
              placeholder="Your name"
              autoComplete="name"
            />

            <Input
              label={modal.fields.email}
              name="email"
              type="email"
              placeholder="Email address"
              autoComplete="email"
            />

            <Input
              label={modal.fields.whatsappNumber}
              name="whatsappNumber"
              placeholder="WhatsApp number"
              autoComplete="tel"
            />

            <Input
              label={modal.fields.businessName}
              name="businessName"
              placeholder="Business name"
              autoComplete="organization"
            />

            <Input
              label={modal.fields.productCategory}
              name="productCategory"
              placeholder="What do you sell?"
            />

            <Select
              label={modal.fields.fulfilmentLocation}
              name="fulfilmentLocation"
              options={modal.fulfilmentLocationOptions}
            />

            <Select
              label={modal.fields.averageOrders}
              name="averageOrders"
              options={modal.averageOrdersOptions}
            />

            <Select
              label={modal.fields.podNeed}
              name="podNeed"
              options={modal.podNeedOptions}
            />

            <label className="grid gap-1.5">
              <span className="text-sm font-black text-white">
                {modal.fields.deliveryChallenge}
              </span>

              <textarea
                name="deliveryChallenge"
                required
                rows={3}
                placeholder="Example: failed delivery, rider chasing, POD stress..."
                className="resize-none rounded-2xl border border-white/10 bg-black px-4 py-3 text-base text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-500"
              />
            </label>
          </div>

          {error ? (
            <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm font-bold leading-7 text-red-200">
              {error}
            </div>
          ) : null}

          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-[11px] leading-5 text-zinc-400">
              Your details will be sent to Boxify first. Then WhatsApp will open
              with the message prepared. Nothing is sent on WhatsApp until you
              press send there.
            </p>

            <button
              type="submit"
              disabled={isBusy}
              className="mt-4 w-full rounded-full bg-[#ea580c] px-5 py-4 text-sm font-black text-white shadow-[0_0_30px_rgba(234,88,12,0.35)] transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
            >
              {status === "submitting"
                ? modal.loadingText
                : status === "redirecting"
                  ? modal.successRedirectText
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

function Select({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-black text-white">{label}</span>

      <select
        name={name}
        required
        defaultValue=""
        className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-base text-white outline-none transition focus:border-orange-500"
      >
        <option value="" disabled>
          Select one
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}