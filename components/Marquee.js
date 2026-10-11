import { marquee } from "@/lib/siteData";

function Row() {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden="true">
      {marquee.map((label) => (
        <li key={label} className="flex items-center">
          <span className="whitespace-nowrap px-6 text-2xl font-medium sm:px-10 sm:text-4xl">{label}</span>
          <span className="h-5 w-5 rotate-45 rounded-[5px] bg-white sm:h-7 sm:w-7 sm:rounded-lg" />
        </li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y-2 border-[#2b4a7c]/70 bg-navy py-6 sm:py-9">
      <p className="sr-only">{marquee.join(", ")}</p>
      <div className="flex w-max animate-marquee">
        <Row />
        <Row />
      </div>
    </div>
  );
}
