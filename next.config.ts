import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  agentRules: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1080, 1200, 1600, 1920],
    imageSizes: [96, 160, 256, 384, 480],
  },
};

export default nextConfig;
