export default function manifest() {
  return {
    name: "Cevrynt — AI Underwriting Infrastructure",
    short_name: "Cevrynt",
    description:
      "From borrower documents to decision-ready underwriting for alternative lenders and SMB finance teams.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7faf9",
    theme_color: "#013e37",
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
