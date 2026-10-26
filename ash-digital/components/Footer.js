import { SITE } from "@/lib/siteData";
import { LockIcon } from "./Icons";

export default function Footer({ contact, nav }) {
  return (
    <footer className="border-t border-white/10 bg-[#0b0b0b] px-4 py-12">
      <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-3">
        <a href="#home" aria-label={`${SITE.name} home`} className="justify-self-center md:justify-self-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt={SITE.name} width={825} height={900} className="h-32 w-auto sm:h-36" />
        </a>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-white/70">
          {nav.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="hover:text-white">{n.label}</a>
            </li>
          ))}
        </ul>
        <div className="text-center text-sm text-white/55 md:text-right">
          <a href={`mailto:${contact.email}`} className="hover:text-white">{contact.email}</a>
          <div className="mt-2 flex flex-wrap justify-center gap-4 md:justify-end">
            {contact.linkedin && <a href={contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>}
            {contact.instagram && <a href={contact.instagram} target="_blank" rel="noreferrer" className="hover:text-white">Instagram</a>}
          </div>
          <a href="/admin" className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-white/80 transition hover:border-white/50 hover:text-white">
            <LockIcon /> Admin Login
          </a>
          <p className="mt-4">© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
