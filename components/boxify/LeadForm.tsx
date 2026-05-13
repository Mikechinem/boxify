"use client";

import { FormEvent, useState } from "react";
import { boxifyData } from "@/data/boxify";
import { trackLeadClick } from "@/lib/tracking";

export default function LeadForm() {
  const { whatsappUrl } = boxifyData;
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const message = `
Hello Boxify, I want to check if you can handle my ecommerce fulfilment.

Name: ${formData.get("name")}
Business name: ${formData.get("businessName")}
WhatsApp number: ${formData.get("phone")}
Product category: ${formData.get("product")}
Customer location: ${formData.get("location")}
Average orders: ${formData.get("orders")}
Need POD?: ${formData.get("pod")}
Biggest challenge: ${formData.get("challenge")}
    `.trim();

    trackLeadClick({
      label: "Submit My Fulfilment Request",
      destination: whatsappUrl,
      section: "lead-form",
    });

    const encodedMessage = encodeURIComponent(message);
    const finalUrl = `${whatsappUrl}?text=${encodedMessage}`;

    window.location.href = finalUrl;
  }

  return (
  <div id="fulfilment-form" className="scroll-mt-24 lg:sticky lg:top-8">
      <form
        onSubmit={handleSubmit}
        className="glow-card rounded-[2rem] border border-white/10 bg-zinc-950 p-5 sm:p-6"
      >
        <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-400">
          Let's Get To Know Your Business
        </p>

        <h3 className="mt-3 text-2xl font-black tracking-tight text-white">
          Let’s Check If Boxify Can Fulfil Your Orders
        </h3>

        <p className="mt-3 text-sm leading-7 text-zinc-400">
          Fill and submit this Form with your business details so we know how best to help you.
        </p>

        <div className="mt-6 grid gap-4">
          <Input label="Name" name="name" placeholder="Your name" />

          <Input
            label="Business name"
            name="businessName"
            placeholder="Your business name"
          />

          <Input label="WhatsApp number" name="phone" placeholder="080..." />

          <Input
            label="What do you sell?"
            name="product"
            placeholder="Fashion, beauty, gadgets..."
          />

          <Input
            label="Where are most of your customers?"
            name="location"
            placeholder="Abuja, Lagos, both, or other states"
          />

          <Input
            label="Average orders per week"
            name="orders"
            placeholder="Example: 10, 30, 100+"
          />

          <label className="grid gap-2">
            <span className="text-sm font-bold text-white">
              Do you need POD in Abuja or Lagos?
            </span>

            <select
              name="pod"
              required
              className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-orange-500"
            >
              <option value="">Select one</option>
              <option value="Yes, Abuja">Yes, Abuja</option>
              <option value="Yes, Lagos">Yes, Lagos</option>
              <option value="Yes, Abuja and Lagos">Yes, Abuja and Lagos</option>
              <option value="No">No</option>
              <option value="Not sure yet">Not sure yet</option>
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-white">
              Biggest delivery challenge right now
            </span>

            <textarea
              name="challenge"
              required
              rows={4}
              placeholder="Tell us what is currently slowing down your fulfilment..."
              className="resize-none rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-500"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full rounded-full bg-[#ea580c] px-6 py-4 text-sm font-black text-white shadow-[0_0_30px_rgba(234,88,12,0.35)] transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Opening WhatsApp..." : "Submit My Fulfilment Request"}
        </button>

        <p className="mt-4 text-center text-xs leading-6 text-zinc-500">
          We review each request based on product type, location, and fulfilment capacity. If your business is a fit, Boxify will guide you through the next onboarding steps.
        </p>
      </form>
    </div>
  );
}

function Input({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-white">{label}</span>

      <input
        name={name}
        required
        placeholder={placeholder}
        className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-500"
      />
    </label>
  );
}