import { ImageResponse } from "next/og";
import { KAPPA_POINTS, SIGMA_POINTS } from "@/components/KSMark";

// Home-screen icon for iPhones (PNG, since iOS ignores SVG icons).

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F4D3A",
        }}
      >
        <svg width="110" height="100" viewBox="0 0 66 60" fill="#FFFFFF">
          <polygon points={KAPPA_POINTS} />
          <polygon points={SIGMA_POINTS} />
        </svg>
      </div>
    ),
    size,
  );
}
