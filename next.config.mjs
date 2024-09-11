// next.config.mjs
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Add Node polyfills
    config.plugins.push(new NodePolyfillPlugin());
    return config;
  },
};

export default nextConfig;
