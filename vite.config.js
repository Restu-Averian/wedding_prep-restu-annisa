import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: "generateSW",
      injectRegister: "script",
      registerType: "prompt",
      useCredentials: true,
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      manifest: {
        id: "/",
        name: "Restu & Annisa — Wedding Planner",
        short_name: "Wedding Prep",
        description:
          "Atur kebutuhan, bandingkan vendor, dan pantau pembayaran pernikahan dalam satu aplikasi.",
        lang: "id",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#FFFAF2",
        theme_color: "#FFFAF2",
        screenshots: [
          {
            src: "/screenshots/01_ringkasan_simple.png",
            sizes: "1080x1920",
            type: "image/png",
            form_factor: "narrow",
            label: "Ringkasan anggaran dan persiapan pernikahan",
          },

          {
            src: "/screenshots/02_rencana_simple.png",
            sizes: "1080x1920",
            type: "image/png",
            form_factor: "narrow",
            label: "Daftar kebutuhan dan filter persiapan",
          },
          {
            src: "/screenshots/03_detail_simple.png",
            sizes: "1080x1920",
            type: "image/png",
            form_factor: "narrow",
            label: "Detail kebutuhan dan pilihan vendor",
          },
          {
            src: "/screenshots/04_pembayaran_simple.png",
            sizes: "1080x1920",
            type: "image/png",
            form_factor: "narrow",
            label: "Ringkasan dan riwayat pembayaran",
          },
          {
            src: "/screenshots/05_referensi_simple.png",
            sizes: "1080x1920",
            type: "image/png",
            form_factor: "narrow",
            label: "Form untuk menyimpan referensi vendor atau produk",
          },
          {
            src: "/screenshots/desktop-overview.png",
            sizes: "1280x720",
            type: "image/png",
            form_factor: "wide",
            label: "Wedding Planner Overview",
          },
          {
            src: "/screenshots/desktop-workflow.png",
            sizes: "1280x720",
            type: "image/png",
            form_factor: "wide",
            label: "Wedding Planning Workflow",
          },
        ],
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/icon-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/icons/icon-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // ponytail: only build assets and approved icons; private data stays online-only.
        globPatterns: ["assets/*.{js,css}"],
        globIgnores: ["**/*.html", "**/api/**"],
        navigateFallback: null,
        runtimeCaching: [],
        skipWaiting: false,
        clientsClaim: false,
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
    proxy: { "/api": "http://127.0.0.1:8787" },
  },
});
