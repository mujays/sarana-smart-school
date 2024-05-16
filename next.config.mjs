/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
      {
        protocol: "https",
        hostname: "smart-school-1.s3.ap-southeast-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
