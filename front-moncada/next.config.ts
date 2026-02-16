import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "positive-fun-3d2a653dcc.strapiapp.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.strapiapp.com",
        pathname: "/**",
      },
    ]
  }
};

export default nextConfig;
