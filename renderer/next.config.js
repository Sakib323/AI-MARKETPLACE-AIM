/** @type {import('next').NextConfig} */
module.exports = {
  output: "standalone",
  distDir: process.env.NODE_ENV === "production" ? "../app" : ".next",
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    return config;
  },
};
