import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats for chapter photos in /public/images.
    formats: ["image/avif", "image/webp"],
    qualities: [75],
  },
};

export default nextConfig;
