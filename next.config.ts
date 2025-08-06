import type { NextConfig } from "next";

const nextConfig = {
  // ...other Next.js configurations
  eslint: {
    // This option allows production builds to successfully complete even if
    // your project has ESLint errors. It's not recommended unless you already
    // have ESLint configured to run in a separate part of your workflow (e.g., in CI).
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
