import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Allow cross-origin requests for preview environment
  allowedDevOrigins: [
    'localhost',
    '127.0.0.1',
  ],
};

export default nextConfig;
