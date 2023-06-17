/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['tailwindui.com', 'teachmegcse-api2.s3.eu-central-1.amazonaws.com'],
    unoptimized: true,
  },
}

