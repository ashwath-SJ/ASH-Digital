const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function Bolt({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M20 2 6 17h8l-4 13 16-18h-9z" fill="currentColor" />
    </svg>
  );
}

export function ArrowUpRight({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth="2">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ArrowRight({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowCircle({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...base} strokeWidth="1.8">
      <circle cx="16" cy="16" r="13" />
      <path d="M9 16h14M17 10l6 6-6 6" />
    </svg>
  );
}

export function MenuIcon({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth="2">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth="2">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function UiUxIcon({ className = "w-14 h-14" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base}>
      <path d="M38 12H10a4 4 0 0 0-4 4v24a4 4 0 0 0 4 4h36a4 4 0 0 0 4-4V32" />
      <path d="M28 44v7M19 55h18" />
      <path d="M52 7l6 6-19 19-9 3 3-9z" />
    </svg>
  );
}

export function CodeIcon({ className = "w-14 h-14" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base}>
      <rect x="6" y="8" width="52" height="36" rx="4" />
      <path d="M26 19l-9 9 9 9M38 19l9 9-9 9" />
      <path d="M32 44v8M20 56h24" />
    </svg>
  );
}

export function MegaphoneIcon({ className = "w-14 h-14" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base}>
      <path d="M8 26 44 10v40L8 38z" />
      <path d="M14 40l4 14h8l-4-13" />
      <path d="M50 18l6-4M52 30h7M50 42l6 4" />
    </svg>
  );
}

export function QuoteIcon({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M6 20c0-6 3-10 9-12l1 2c-3 1-4 3-4 5h3v7H6zm12 0c0-6 3-10 9-12l1 2c-3 1-4 3-4 5h3v7h-9z"
      />
    </svg>
  );
}

export function PenToolIcon({ className = "w-14 h-14" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base}>
      <rect x="3" y="9" width="8" height="8" rx="2" />
      <rect x="53" y="9" width="8" height="8" rx="2" />
      <path d="M11 13h14M39 13h14" />
      <path d="M32 22c-7 0-11 8-11 15 0 6 5 11 11 16 6-5 11-10 11-16 0-7-4-15-11-15z" />
      <circle cx="32" cy="37" r="3.5" />
      <path d="M32 22v-9" />
    </svg>
  );
}

export function BroadcastIcon({ className = "w-14 h-14" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base}>
      <circle cx="32" cy="32" r="6" />
      <path d="M21 21a16 16 0 0 0 0 22M43 21a16 16 0 0 1 0 22M12 12a29 29 0 0 0 0 40M52 12a29 29 0 0 1 0 40" />
    </svg>
  );
}

export function CameraIcon({ className = "w-14 h-14" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base}>
      <rect x="6" y="18" width="52" height="34" rx="4" />
      <circle cx="34" cy="35" r="10" />
      <path d="M15 18v-5h9v5M44 27h8" />
    </svg>
  );
}

export const serviceIcons = {
  uiux: UiUxIcon,
  code: CodeIcon,
  megaphone: MegaphoneIcon,
  pen: PenToolIcon,
  broadcast: BroadcastIcon,
  camera: CameraIcon,
};

export function iconFor(service) {
  const legacy = { dev: "code", marketing: "megaphone" };
  return serviceIcons[service.icon] || serviceIcons[legacy[service.id]] || UiUxIcon;
}

export function LockIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth="2">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
