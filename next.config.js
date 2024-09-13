const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/index",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;