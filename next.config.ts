import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://i.scdn.co/image/**"),
      new URL(
        "https://kj36h7e7wv1p9gx0.public.blob.vercel-storage.com/images/**",
      ),
    ],
  },
};

export default nextConfig;
