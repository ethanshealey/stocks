/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  api: {
    externalResolver: true,
  },
  optimizeFonts: false,
}

module.exports = nextConfig
