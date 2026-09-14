import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 16 の Cache Components モデルを有効化
  // 詳細は lectures/06-rendering-cache.md
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // 全ドメインを許可
      },
    ],
  },
};

export default nextConfig;
