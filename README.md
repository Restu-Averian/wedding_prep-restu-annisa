# Wedding Planner — Restu & Annisa

Fondasi React + Vite + TypeScript, React Router, dan styled-components. Hanya halaman placeholder dan navigasi.

## Menjalankan

    npm install
    npm run dev

Route: / (Home), /rencana, /pembayaran. Navigasi bawah pada mobile dan atas pada desktop.

## Pemeriksaan

    npm run typecheck
    npm run lint
    npm run check:routing
    npm run build
    npm run preview

Check routing memeriksa render route, link aktif, dan perpindahan pada instance router yang sama. Untuk pemeriksaan browser, buka setiap URL langsung dan klik ketiga link.

## Struktur

- src/pages/: tiga halaman placeholder.
- src/layouts/WeddingLayout.tsx: shared layout dengan Outlet dan NavLink.
- src/router.tsx: konfigurasi route.
- src/styles/: styling global dan styled components layout.
- scripts/check-routing.mjs: pemeriksaan routing tanpa framework tambahan.

Hosting production perlu fallback ke index.html untuk membuka route secara langsung. Vite dev dan preview sudah mendukungnya.
