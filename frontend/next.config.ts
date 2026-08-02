import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Gear image URLs come from user input and can be hosted anywhere,
    // so allow any https/http host instead of failing on unconfigured hosts.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;