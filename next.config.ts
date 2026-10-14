import type { NextConfig } from "next";
const config: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  turbopack: { root: __dirname }
};
export default config;

