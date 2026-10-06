import Image from "next/image";
import type { Photo } from "@/content/site";
import { asset } from "@/lib/paths";
import { CameraIcon } from "./Icons";

type Props = {
  photo: Photo;
  /** Tells the browser how wide the image renders, so it downloads the right size. */
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Placeholder styling for dark sections. */
  dark?: boolean;
};

/**
 * Shows a photo from content/site.ts, or a clearly marked placeholder box
 * when no photo has been added yet. The wrapper must set the size/aspect ratio.
 */
export default function PhotoFrame({ photo, sizes, className = "", priority, dark }: Props) {
  if (photo.src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={asset(photo.src)}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Photo coming soon: ${photo.alt}`}
      className={`relative flex items-center justify-center overflow-hidden ${
        dark ? "bg-primary-dark text-on-dark-muted" : "bg-border text-muted"
      } ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, currentColor 0 2px, transparent 2px 18px)",
        }}
      />
      <div className="relative flex flex-col items-center gap-2 px-4 text-center text-sm font-semibold">
        <CameraIcon className="h-8 w-8" />
        <span>Photo placeholder</span>
      </div>
    </div>
  );
}
