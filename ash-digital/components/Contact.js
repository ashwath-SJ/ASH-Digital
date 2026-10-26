"use client";

import { useState } from "react";
import { Panel } from "./ui";

const field =
  "w-full rounded-2xl border border-white/[0.14] bg-[#202020] px-4 py-3.5 text-base text-white placeholder-white/40 outline-none transition focus:border-violet";

export default function Contact({ contact, services }) {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setStatus("");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          service: data.get("service"),
          message: data.get("message"),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Unable to send your enquiry.");
      form.reset();
      setStatus("Thanks! Your enquiry was sent successfully.");
    } catch (error) {
      setStatus(error.message || "Something went wrong. Please try again later.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Panel id="contact" ghost="Get in touch" title="Let's start your project">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="max-w-md text-lg leading-relaxed text-white/85">
            Tell us what you need: a new design, a website or a marketing plan. We reply within one business day.
          </p>
          <dl className="mt-8 space-y-5">
            <div>
              <dt className="text-sm text-white/55">Email</dt>
              <dd className="text-lg"><a className="hover:text-violet" href={`mailto:${contact.email}`}>{contact.email}</a></dd>
            </div>
            {contact.linkedin && <div>
              <dt className="text-sm text-white/55">LinkedIn</dt>
              <dd className="text-lg"><a className="hover:text-violet" href={contact.linkedin} target="_blank" rel="noreferrer">Visit LinkedIn profile</a></dd>
            </div>}
            {contact.instagram && <div>
              <dt className="text-sm text-white/55">Instagram</dt>
              <dd className="text-lg"><a className="hover:text-violet" href={contact.instagram} target="_blank" rel="noreferrer">Visit Instagram profile</a></dd>
            </div>}
            <div>
              <dt className="text-sm text-white/55">Location</dt>
              <dd className="text-lg">{contact.location}</dd>
            </div>
          </dl>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm text-white/70">Your name</span>
            <input name="name" required maxLength={100} className={field} placeholder="Full name" autoComplete="name" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm text-white/70">Email</span>
            <input name="email" type="email" required maxLength={254} className={field} placeholder="you@company.com" autoComplete="email" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm text-white/70">Service</span>
            <select name="service" required className={`${field} appearance-none`} defaultValue={services[0]?.title || ""}>
              {services.map((s) => <option key={s.id} className="text-black">{s.title}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm text-white/70">Message</span>
            <textarea name="message" required minLength={5} maxLength={5000} rows={4} className={field} placeholder="Tell us about your project" />
          </label>
          <button disabled={busy} type="submit" className="w-full rounded-full bg-violet py-4 text-base font-semibold transition hover:bg-[#a863ea] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10">
            {busy ? "Sending…" : "Send enquiry"}
          </button>
          {status && <p role="status" aria-live="polite" className={`text-sm ${status.startsWith("Thanks!") ? "text-emerald-300" : "text-amber-200"}`}>{status}</p>}
          <p className="text-xs text-white/45">Your enquiry is sent securely by email when the website email settings are configured.</p>
        </form>
      </div>
    </Panel>
  );
}
