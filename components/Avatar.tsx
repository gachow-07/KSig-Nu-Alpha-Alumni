import Image from "next/image";
import { asset } from "@/lib/paths";

export function initials(name: string) {
  const words = name.replace(/[^\p{L}\s]/gu, "").split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
}

/** Avatar ring that fades in when the person's row (a `group`) is hovered. */
const AVATAR_RING =
  "ring-2 ring-transparent ring-offset-2 ring-offset-surface transition-shadow duration-300 ease-out group-hover:ring-primary/50";

/** Round headshot, or initials on dark green when there's no photo. Same as the exec board. */
export default function Avatar({ name, headshot }: { name: string; headshot?: string }) {
  return headshot ? (
    <Image
      src={asset(headshot)}
      alt={`Headshot of ${name}`}
      width={64}
      height={64}
      data-anim="pop"
      className={`h-16 w-16 shrink-0 rounded-full object-cover ${AVATAR_RING}`}
    />
  ) : (
    <span
      aria-hidden="true"
      data-anim="pop"
      className={`display flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-2xl text-white ${AVATAR_RING}`}
    >
      {initials(name)}
    </span>
  );
}
