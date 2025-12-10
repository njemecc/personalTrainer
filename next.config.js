module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "*.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "cg2bjgzl9r.ufs.sh",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/users",
        permanent: true,
      },
    ];
  },
};
