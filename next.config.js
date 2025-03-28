module.exports = {
  images: {
    domains: ["images.unsplash.com", "media.istockphoto.com"],
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/users',
        permanent: true,
      },
    ];
  },
};
