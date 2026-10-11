"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SITE } from "@/lib/siteData";
import { MenuIcon, CloseIcon, LockIcon } from "./Icons";


export default function Navbar({ nav }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  // Highlight the nav link of the section currently on screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    const sectionIds = [...nav.map((n) => n.href.slice(1)), "contact"];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [nav]);

  return (
    <header className="fixed inset-x-0 top-3 sm:top-5 z-50 flex justify-center px-3 sm:px-4">
      <div className="relative w-full max-w-4xl">
        <nav
          aria-label="Main"
          className="flex items-center justify-between rounded-full border border-white/5 bg-pill/85 py-2.5 pl-4 pr-2.5 backdrop-blur-xl md:pl-6 md:pr-3"
        >
          <a href="#home" className="flex items-center gap-2 text-white" aria-label={`${SITE.name} home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark.png" alt="" width={520} height={335} className="h-9 w-auto" />
            <span className="font-sans text-base font-bold tracking-tight md:hidden">ASH Digital</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex lg:gap-3">
            {nav.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`rounded-full px-3 py-2 text-[15px] transition-colors lg:px-4 ${
                      isActive ? "font-semibold text-white" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="/admin"
              className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-[15px] text-white/70 transition-colors hover:text-white md:inline-flex lg:px-4"
            >
              <LockIcon />
              <span className="lg:hidden">Admin</span>
              <span className="hidden lg:inline">Admin Login</span>
            </a>
            <a
              href="#contact"
              className="hidden rounded-full bg-brand px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-[#7d62ff] md:inline-block"
            >
              Contact Us
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center rounded-full bg-white/5 md:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-x-0 top-full mt-2 rounded-3xl border border-white/5 bg-pill/95 p-3 backdrop-blur-xl md:hidden"
            >
              <ul className="flex flex-col">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-lg text-white/85 active:bg-white/5"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="/admin"
                className="flex items-center gap-2 rounded-2xl px-4 py-3 text-lg text-white/85 active:bg-white/5"
              >
                <LockIcon className="h-5 w-5" /> Admin Login
              </a>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-full bg-brand py-3 text-center text-lg font-semibold"
              >
                Contact Us
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
