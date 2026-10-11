"use client";

import { useState } from "react";
import { Panel } from "./ui";

const field =
  "w-full rounded-2xl border border-white/[0.14] bg-[#202020] px-4 py-3.5 text-base text-white placeholder-white/40 outline-none transition focus:border-violet";

export default function Contact({ contact, services }) {
  const [sent, setSent] = useState(false);

  // Opens the visitor's email app with the form filled in.
  function onSubmit(e) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const subject = `New project enquiry: ${d.get("service")}`;
    const body = `Name: ${d.get("name")}\nEmail: ${d.get("email")}\nService: ${d.get("service")}\n\n${d.get("message")}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
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
            <div>
              <dt className="text-sm text-white/55">Phone</dt>
              <dd className="text-lg">{contact.phone}</dd>
            </div>
            <div>
              <dt className="text-sm text-white/55">Location</dt>
              <dd className="text-lg">{contact.location}</dd>
            </div>
          </dl>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm text-white/70">Your name</span>
            <input name="name" required className={field} placeholder="Full name" autoComplete="name" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm text-white/70">Email</span>
            <input name="email" type="email" required className={field} placeholder="you@company.com" autoComplete="email" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm text-white/70">Service</span>
            <select name="service" className={`${field} appearance-none`} defaultValue={services[0]?.title}>
              {services.map((s) => (
                <option key={s.id} className="text-black">{s.title}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm text-white/70">Message</span>
            <textarea name="message" required rows={4} className={field} placeholder="Tell us about your project" />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-violet py-4 text-base font-semibold transition hover:bg-[#a863ea] sm:w-auto sm:px-10"
          >
            Send message
          </button>
          {sent && (
            <p role="status" className="text-sm text-white/70">
              Your email app should open with the message ready to send.
            </p>
          )}
        </form>
      </div>
    </Panel>
  );
}
