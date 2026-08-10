const isProduction = process.env.NODE_ENV === "production";
const developmentNoCacheHeaders = [
  {
    key: "Cache-Control",
    value: "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  },
  { key: "Pragma", value: "no-cache" },
  { key: "Expires", value: "0" },
];

const nextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: isProduction ? 31536000 : 0,
  },
  async headers() {
    if (!isProduction) {
      return [
        {
          source: "/:path*",
          headers: developmentNoCacheHeaders,
        },
      ];
    }

    return [
      {
        source: "/brand/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
