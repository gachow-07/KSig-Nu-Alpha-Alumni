import type { NextConfig } from "next";

// The site is exported as plain HTML/CSS/JS files and hosted on GitHub Pages.
// On Pages the site lives under /<repo-name>, so the deploy workflow sets
// NEXT_PUBLIC_BASE_PATH. Locally (and on a custom domain) it's empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Each page is saved as its own folder (story/index.html), which every
  // static host, including GitHub Pages, serves at /story/.
  trailingSlash: true,
  images: {
    // GitHub Pages can't resize images on the fly, so photos are served as-is.
    // Keep them under ~500 KB each (see public/images/README.md).
    unoptimized: true,
  },
};

export default nextConfig;
