import { ImageResponse } from "next/og";
import { KAPPA_POINTS, SIGMA_POINTS } from "@/components/KSMark";
import { site } from "@/content/site";

// The image shown when the link is texted or posted. To use a real chapter
// photo instead, delete this file and add app/opengraph-image.jpg (1200×630)
// plus app/opengraph-image.alt.txt with a one-line description.

export const alt = `${site.name}, ${site.school}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0F4D3A",
          color: "#FFFFFF",
        }}
      >
        <svg width="132" height="120" viewBox="0 0 66 60" fill="#FFFFFF">
          <polygon points={KAPPA_POINTS} />
          <polygon points={SIGMA_POINTS} />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 4, color: "#CFE3D9", textTransform: "uppercase" }}>
            {site.school}
          </div>
          <div style={{ fontSize: 96, fontWeight: 900, lineHeight: 1, marginTop: 16, textTransform: "uppercase" }}>
            Kappa Sigma
          </div>
          <div style={{ fontSize: 96, fontWeight: 900, lineHeight: 1, textTransform: "uppercase" }}>
            Nu Alpha Alumni
          </div>
          <div style={{ display: "flex", marginTop: 36, height: 10, width: 160, background: "#B3202E" }} />
        </div>
      </div>
    ),
    size,
  );
}
