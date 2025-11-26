/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Include dataset folder in serverless functions
  outputFileTracingIncludes: {
    '/api/*': ['./dataset/**/*'],
  },
}

module.exports = nextConfig
