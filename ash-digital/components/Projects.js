"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CATEGORIES } from "@/lib/siteData";
import { Panel } from "./ui";
import { ArrowUpRight, CloseIcon } from "./Icons";

const gradients = {
  "UI/UX Design": ["#6c4dff", "#1b1448"],
  "Web Development": ["#9b51e0", "#2a1140"],
  "Digital Marketing": ["#3b82f6", "#0b1b4d"],
};

function Cover({ p, className = "" }) {
  const [from, to] = gradients[p.category] || gradients["UI/UX Design"];
  if (p.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={p.image} alt={p.title} loading="lazy" className={`h-full w-full object-cover ${className}`} />;
  }
  return (
    <div className="relative h-full w-full" style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}>
      <div className={`absolute inset-6 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm ${className}`}>
        <div className="h-3 w-1/3 rounded bg-white/30" />
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="h-12 rounded-lg bg-white/15 sm:h-16" />
          <div className="h-12 rounded-lg bg-white/15 sm:h-16" />
          <div className="h-12 rounded-lg bg-white/15 sm:h-16" />
        </div>
        <div className="mt-4 h-3 w-2/3 rounded bg-white/20" />
      </div>
    </div>
  );
}

function Modal({ project, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-[#141414]"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Cover p={project} />
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-black/60"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 sm:p-8">
          <p className="text-sm text-violet">{project.category}</p>
          <h3 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">{project.title}</h3>
          {project.description && <p className="mt-4 text-lg leading-relaxed text-white/75">{project.description}</p>}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold"
            >
              Visit project <ArrowUpRight />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects({ projects }) {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(null);

  const filters = ["All", ...CATEGORIES.filter((c) => projects.some((p) => p.category === c))];
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <Panel id="projects" ghost="Our Work" title="Our Projects">
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2 sm:gap-3">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`rounded-full border px-5 py-2.5 text-[15px] font-medium transition ${
              filter === f ? "border-violet bg-violet text-white" : "border-white/15 text-white/75 hover:border-white/40 hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="mt-10 text-white/60">No projects in this category yet.</p>
      ) : (
        <motion.div layout className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((p) => (
              <motion.button
                key={p.id}
                layout
                type="button"
                onClick={() => setOpen(p)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group block overflow-hidden rounded-3xl border border-white/[0.14] bg-[#202020] text-left"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <Cover p={p} className="transition-transform duration-500 group-hover:scale-[1.04]" />
                </div>
                <div className="flex items-center justify-between gap-3 p-5">
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-xl font-semibold">{p.title}</h3>
                    <p className="mt-1 text-white/60">{p.category}</p>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 transition group-hover:border-violet group-hover:bg-violet">
                    <ArrowUpRight />
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <AnimatePresence>{open && <Modal project={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </Panel>
  );
}
