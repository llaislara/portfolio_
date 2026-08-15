import type { NextConfig } from "next";

declare const process: {
  env: {
    NODE_ENV?: string;
  };
};

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isProd ? "/portfolio_" : "",
  assetPrefix: isProd ? "/portfolio_" : "",
};

export default nextConfig;
