/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['tailwindui.com', 'teachmegcse-api2.s3.eu-central-1.amazonaws.com', 'cdn-icons-png.flaticon.com'],
    unoptimized: true,
  },
}

module.exports = nextConfig
