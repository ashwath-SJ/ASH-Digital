import { Panel } from "./ui";
import { ArrowUpRight } from "./Icons";

// Button text depends on where the link goes (Instagram or any other website)
function linkLabel(url) {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (host === "instagram.com" || host.endsWith(".instagram.com")) return "View on Instagram";
  } catch {}
  return "Visit link";
}

export default function Offers({ posters }) {
  const n = posters.length;
  const layout = n === 1 ? "max-w-md" : n === 2 ? "max-w-3xl sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <Panel id="offers" ghost="Offers" title="Special Offers">
      <div className={`mx-auto grid gap-6 ${layout}`}>
        {posters.map((p, i) => (
          <article key={p.id} className="flex flex-col overflow-hidden rounded-3xl border border-white/[0.14] bg-[#202020]">
            <a href={p.image} target="_blank" rel="noopener noreferrer" aria-label={`Open offer poster ${i + 1} in full size`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={`ASH Digital offer ${i + 1}`} loading="lazy" className="block h-auto w-full" />
            </a>
            {p.link && (
              <div className="p-4 sm:p-5">
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-violet py-3.5 text-base font-semibold transition hover:bg-[#a863ea]"
                >
                  {linkLabel(p.link)} <ArrowUpRight />
                </a>
              </div>
            )}
          </article>
        ))}
      </div>
    </Panel>
  );
}
