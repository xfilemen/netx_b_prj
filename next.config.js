const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/_app",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;