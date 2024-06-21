/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

module.exports = {
    eslint: {
      ignoreDuringBuilds: true, // Allows production builds to complete even with ESLint errors
    },
  };
