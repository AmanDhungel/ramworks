import type { NextConfig } from "next";

const api_url = process.env.NEXT_PUBLIC_API_URL;

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/client_api/:path*",
        destination: `${api_url}/api/:path*`,
      },
    ];
  },
  images: {
    domains: ["images.unsplash.com", "logo.clearbit.com"],
  },
};

export default nextConfig;
