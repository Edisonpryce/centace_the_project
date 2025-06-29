/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Removed swcMinify as it's no longer recognized in Next.js 15.2.4
  // Ensure images from placeholder.svg are allowed
  images: {
    domains: ['images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  // Move serverComponentsExternalPackages to the root level
  serverExternalPackages: ['nodemailer'],
  // Handle environment variables properly
  env: {
    NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || '0.1.0',
  },
  // Improve error handling during build
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 4,
  },
  // Improve error output
  webpack: (config, { dev, isServer }) => {
    // Add source maps in development
    if (dev && !isServer) {
      config.devtool = 'eval-source-map';
    }
    
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Removed all experimental features that might cause issues
  experimental: {
    scrollRestoration: true,
    // optimizeCss is completely removed to avoid critters dependency
  },
}

export default nextConfig
