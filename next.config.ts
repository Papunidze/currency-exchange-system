import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [],
    unoptimized: true,
    remotePatterns: []
  },
  experimental: {
    optimizeCss: true,
    turbo: {
      resolveAlias: {
        // Your path aliases if needed
      },
      rules: {
        "*.png": ["file-loader"],
        "*.jpg": ["file-loader"],
        "*.jpeg": ["file-loader"],
        "*.gif": ["file-loader"],
        "*.svg": ["file-loader"]
      }
    },
  },
  webpack: (config) => {
    // Skip webpack configuration when using Turbopack
    if (process.env.TURBOPACK) {
      return config;
    }
    
    // The rest of webpack configuration only applies when not using Turbopack
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "static/images/",
            publicPath: "/_next/static/images/",
          },
        },
      ],
    });
    
    return config;
  },
  async headers() {
    return [
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/chunks/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/css/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/media/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.svg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
