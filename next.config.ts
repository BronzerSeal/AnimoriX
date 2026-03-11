import type { NextConfig } from "next";
import * as path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: path.join(__dirname, ""), // package.json is on the same level as next config
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "myanimelist.net",
      },
      {
        protocol: "https",
        hostname: "s4.anilist.co",
      },
    ],
  },
};

export default nextConfig;
