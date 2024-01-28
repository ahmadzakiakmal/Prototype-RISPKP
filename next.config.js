/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/ahmadzaki2975/Weather-Web/df11260006f649aaec977d63814373212017a6fa/public/Weather%20Icons/*",
      },
    ],
  },
};

module.exports = nextConfig;
