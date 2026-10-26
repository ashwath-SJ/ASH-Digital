"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "./Icons";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden px-4 pb-24 pt-32 sm:pt-40 md:pb-32">
      {/* purple glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-12rem] h-80 w-[40rem] -translate-x-1/2 rounded-full bg-brand/40 blur-[120px]" />
        <div className="absolute -left-40 top-1/3 h-[34rem] w-[22rem] rounded-full bg-brand/60 blur-[130px] md:-left-24" />
        <div className="absolute -right-40 top-1/3 h-[34rem] w-[22rem] rounded-full bg-brand/60 blur-[130px] md:-right-24" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex max-w-6xl flex-col items-center text-center"
      >
        <motion.h1
          variants={item}
          className="max-w-5xl text-balance bg-gradient-to-b from-white to-white/70 bg-clip-text font-display text-[clamp(2.4rem,7.4vw,6rem)] font-extrabold uppercase leading-[1.06] tracking-tight text-transparent"
        >
          Creativity meets technology
        </motion.h1>

        <motion.p variants={item} className="mt-8 max-w-xl text-base text-white/75 sm:text-lg md:mt-10">
          ASH Digital designs, builds and markets digital products that feel smooth and effortless to use.
        </motion.p>

        <motion.a
          variants={item}
          href="#contact"
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-brand px-8 py-4 text-[15px] font-semibold transition hover:bg-brand"
        >
          Let&apos;s Start A Project <ArrowUpRight />
        </motion.a>

      </motion.div>
    </section>
  );
}
