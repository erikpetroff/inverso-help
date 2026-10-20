import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Inverso Help Center",
    short_name: "Inverso Help",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f9fb",
    theme_color: "#1c1c1c",
    icons: [{ src: "/icon.png", sizes: "64x64", type: "image/png" }],
  };
}
