# Wedding Planner — Restu & Annisa

React + Vite + TypeScript, React Router, dan styled-components. Dashboard Home, daftar kebutuhan dengan search/filter, serta detail referensi dan pembayaran memakai data hardcoded.

## Menjalankan

    npm install
    npm run dev

Route: / (Home), /rencana, /rencana/:itemId. Navigasi dua menu di bawah pada mobile dan di atas pada desktop. Route lama /pembayaran dialihkan ke /rencana.

Kategori memakai query slug, misalnya /rencana?kategori=seserahan. Search memakai query q. Tombol kembali dari detail mempertahankan query. Drawer Catat Pembayaran hanya simulasi lokal; tidak menyimpan transaksi atau mengubah saldo.

## Pemeriksaan

    npm run typecheck
    npm run lint
    npm run check:routing
    npm run build
    npm run preview

Check routing memeriksa relasi mock, total Home, dua menu, kategori, pencarian, detail, ringkasan pembayaran, struktur form drawer, empty state, dan redirect lama. Pemeriksaan ini tidak menjalankan interaksi DOM dialog.

Pemeriksaan browser: Home → Seserahan → Makeup → Catat Pembayaran. Coba tutup dengan tombol × dan Escape, validasi input, simulasi submit, serta kembali ke daftar terfilter. Buka Rencana melalui menu untuk mereset filter. Periksa juga layar mobile dan desktop.

## Struktur

- src/pages/: Home, Planning, dan ItemDetail.
- src/data/wedding.ts: kategori, kebutuhan, kandidat, dan pembayaran contoh; nominal rupiah integer.
- src/components/planning/PaymentDrawer.tsx: dialog form simulasi pembayaran.
- src/layouts/WeddingLayout.tsx: shared layout dengan Outlet dan NavLink.
- src/router.tsx: konfigurasi route.
- src/styles/: styling global dan styled components layout.
- scripts/check-routing.mjs: pemeriksaan routing tanpa framework tambahan.

Hosting production perlu fallback ke index.html untuk membuka route secara langsung. Vite dev dan preview sudah mendukungnya.
