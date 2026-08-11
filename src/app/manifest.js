export default function manifest() {
  return {
    name: "Cevrynt",
    short_name: "Cevrynt",
    description:
      "Cevrynt helps businesses build and scale modern digital commerce experiences.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#14766f",
    icons: [
      {
        src: "/brand/cevrynt-favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/brand/cevrynt-icon-192-v3.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/brand/cevrynt-icon-512-v3.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
