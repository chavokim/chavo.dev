/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    if(isServer) {
      require("./scripts/sitemap-generator");
    }
    return config
  },
}

module.exports = nextConfig