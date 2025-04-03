import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable compression for faster responses
  compress: true,

  // Optimize static file serving
  staticPageGenerationTimeout: 60, // Increase timeout for large builds
  
  // Standalone build output for better performance
  output: "standalone",

  // Disable image optimization for faster builds
  images: {
    unoptimized: true,
  },

  // Webpack fallback configuration to resolve 'pg' issues
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        net: false,
        tls: false,
        dns: false,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;