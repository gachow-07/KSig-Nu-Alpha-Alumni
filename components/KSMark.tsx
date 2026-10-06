// The Greek letters ΚΣ drawn as simple shapes. The display font has no Greek
// glyphs, so the letters are drawn here to match its condensed, heavy style.
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
