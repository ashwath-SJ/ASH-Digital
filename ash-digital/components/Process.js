import { Panel, ArcCard } from "./ui";
import { processSteps } from "@/lib/siteData";

export default function Process() {
  return (
    <Panel id="process" ghost="Our Process" title="How We Work">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {processSteps.map((s) => (
          <ArcCard key={s.n} className="flex min-h-[15rem] flex-col p-5 sm:p-6">
            <span className="relative font-sans text-5xl font-medium text-white/90">{s.n}</span>
            <h3 className="relative mt-6 font-sans text-2xl font-medium tracking-tight">{s.title}</h3>
            <p className="relative mt-2 text-[17px] leading-snug text-white">{s.text}</p>
          </ArcCard>
        ))}
      </div>
    </Panel>
  );
}
