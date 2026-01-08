import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true, // your existing option

  // ✅ Add this to allow external images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "electronnepal.com",
        port: "",
        pathname: "/**", // allow all paths from this host
      },
    ],
  },
};

export default nextConfig;
