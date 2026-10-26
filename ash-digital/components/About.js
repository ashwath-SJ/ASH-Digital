import { Panel, ArcCard } from "./ui";
import { strengths } from "@/lib/siteData";

const points = [
  "Design-led: every project starts with research and clear user flows.",
  "Built to last: modern, fast and secure code that scales with you.",
  "Growth-minded: social media and digital marketing that bring real leads.",
];

export default function About() {
  return (
    <Panel id="about" ghost="Who we are" title="About ASH Digital">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
            We are a young, passionate digital team that combines UI/UX design, web development and social media
            marketing under one roof, so your brand looks great, works fast and gets found.
          </p>
          <ul className="mt-8 space-y-4">
            {points.map((p) => (
              <li key={p} className="flex gap-3 text-white/85">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rotate-45 rounded-sm bg-violet" />
                <span className="max-w-lg leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-4 sm:gap-5">
          {strengths.map((s) => (
            <ArcCard key={s.title} className="p-5 pr-16 sm:p-6 sm:pr-20">
              <h3 className="relative font-sans text-xl font-medium tracking-tight sm:text-2xl">{s.title}</h3>
              <p className="relative mt-2 text-[17px] leading-snug text-white">{s.text}</p>
            </ArcCard>
          ))}
        </div>
      </div>
    </Panel>
  );
}
