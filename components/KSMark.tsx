// The Greek letters ΚΣ drawn as simple shapes, so they look the same everywhere
// regardless of font. Used for the logo badge and icons.
// This is only the letters, not the official crest.

const KAPPA_POINTS = "0,0 10,0 10,25 19,0 30,0 18,30 30,60 19,60 10,36 10,60 0,60";
const SIGMA_POINTS = "36,0 66,0 66,10 49,10 60,30 49,50 66,50 66,60 36,60 36,51 48,30 36,9";

export default function KSMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 66 60"
      className={className}
      fill="currentColor"
      role="img"
      aria-label="Kappa Sigma"
    >
      <polygon points={KAPPA_POINTS} />
      <polygon points={SIGMA_POINTS} />
    </svg>
  );
}

/** The ΚΣ letters on an emerald tile with a thin gold ring. Used as the logo. */
export function KSBadge({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-xl bg-emerald text-white ring-2 ring-gold/70 ring-offset-2 ${className}`}
    >
      <KSMark className="h-[45%] w-auto" />
    </span>
  );
}
