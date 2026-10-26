"use client";

import { useState } from "react";
import { Panel, ArcCard } from "./ui";
import { ArrowCircle, ArrowRight, iconFor } from "./Icons";

export default function Services({ services }) {
  // the purple card follows hover / focus / tap, like in the reference design
  const [active, setActive] = useState(services.length > 1 ? 1 : 0);
  const odd = services.length % 2 === 1;

  return (
    <Panel id="services" ghost="Digital Agency" title="Our Services">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {services.map((s, i) => {
          const Icon = iconFor(s);
          const on = active === i;
          return (
            <ArcCard
              key={s.id}
              active={on}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`flex min-h-[16.5rem] flex-col p-5 sm:min-h-[18rem] sm:p-6 ${
                odd && i === services.length - 1 ? "sm:max-lg:col-span-2" : ""
              }`}
            >
              <Icon className="relative h-14 w-14 text-white" />
              <h3 className="relative mt-7 font-sans text-2xl font-medium tracking-tight sm:text-[1.7rem]">{s.title}</h3>
              <p className="relative mt-2 max-w-[19rem] text-[17px] leading-snug text-white">{s.text}</p>
              <div className="relative mt-auto flex justify-end pt-5">
                {on ? (
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-[#17121f] px-4 py-2 text-sm font-semibold"
                  >
                    View All <ArrowRight className="h-4 w-4" />
                  </a>
                ) : (
                  <a href="#contact" aria-label={`Ask about ${s.title}`} className="text-white">
                    <ArrowCircle className="h-9 w-9" />
                  </a>
                )}
              </div>
            </ArcCard>
          );
        })}
      </div>
    </Panel>
  );
}
