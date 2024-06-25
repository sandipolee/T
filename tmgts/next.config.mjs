const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // modify the config here
    return config;
  },
  reactStrictMode: true,
};

export default nextConfig;