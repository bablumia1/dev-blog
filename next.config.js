/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "bablumia.info",
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
    ],
  },
  output: "export",
};

module.exports = nextConfig;
