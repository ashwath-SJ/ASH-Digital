// Shared building blocks so every section follows the same design language.

export function SectionHeading({ children }) {
  return (
    <>
      <h2 className="font-sans text-3xl font-medium tracking-tight sm:text-5xl">{children}</h2>
      <div className="mt-3 h-2 w-36 bg-violet sm:w-44" />
    </>
  );
}

// Big rounded glass panel with a faint word peeking out behind its top edge
export function Panel({ id, ghost, title, children }) {
  return (
    <section id={id} className="px-3 py-12 sm:px-4 sm:py-20">
      <div className="relative mx-auto max-w-6xl">
        {ghost && (
          <p
            aria-hidden
            className="select-none text-center font-sans text-[clamp(2.2rem,9.5vw,7.5rem)] font-extrabold uppercase leading-none tracking-tight text-white/[0.06]"
          >
            {ghost}
          </p>
        )}
        <div
          className={`relative rounded-[1.75rem] border border-white/[0.14] bg-gradient-to-b from-[#181818] to-[#2d2d2d] p-5 sm:rounded-[2rem] sm:p-10 lg:p-16 ${
            ghost ? "-mt-[clamp(0.9rem,3.6vw,2.9rem)]" : ""
          }`}
        >
          {title && <SectionHeading>{title}</SectionHeading>}
          <div className={title ? "mt-8 sm:mt-12" : ""}>{children}</div>
        </div>
      </div>
    </section>
  );
}

// Card with the quarter-ring in the top-right corner. `active` forces the purple state;
// when `active` is not given, the card turns purple on hover.
export function ArcCard({ active, className = "", children, ...rest }) {
  const hoverMode = active === undefined;
  const purple = hoverMode ? "hover:bg-[#9b51e0] hover:border-transparent" : active ? "bg-[#9b51e0] border-transparent" : "";
  const dark = hoverMode || !active ? "bg-[#202020] border-white/[0.14]" : "";
  const ring = hoverMode
    ? "border-[#6b4a85] group-hover:border-[#4a2a7a]"
    : active
    ? "border-[#4a2a7a]"
    : "border-[#6b4a85]";
  return (
    <article
      className={`group relative overflow-hidden rounded-3xl border transition-colors duration-300 ${dark} ${purple} ${className}`}
      {...rest}
    >
      <span aria-hidden className={`absolute -right-9 -top-9 h-32 w-32 rounded-full border-[18px] transition-colors duration-300 sm:h-36 sm:w-36 ${ring}`} />
      {children}
    </article>
  );
}
