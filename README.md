# Wedding Planner — Restu & Annisa

React + Vite + TypeScript + React Router + styled-components → Hono Worker `/api/v1` → Cloudflare D1. UI dan drawer yang ada dipertahankan. Branch pekerjaan: `development`; tidak ada deploy/push otomatis.

## Pengembangan lokal

```sh
npm ci
cp .dev.vars.example .dev.vars # hanya jika belum ada; jangan menimpa konfigurasi lokal
npm run db:migrate:local
npm run dev:api               # terminal 1: http://127.0.0.1:8787
npm run dev                   # terminal 2: http://127.0.0.1:5173
```

Vite meneruskan `/api` ke Wrangler; browser tetap memakai satu origin. Port Vite dikunci ke 5173 agar validasi Origin konsisten. Wrangler memakai D1 lokal `.wrangler/state`, bukan remote. Frontend dan API dapat disajikan bersama dari Worker dengan static assets `dist` dan SPA fallback; setelah build, `npm run dev:api` juga menyajikan hasil build pada 8787. `npm run preview` hanya untuk aset frontend, tidak menyediakan API.

Binding `DB` mengarah ke database yang sudah ada `wedding-planner-db`, ID `fb6e0255-db81-4eac-b6e1-39001a63a2ff`. Tidak ada perintah pembuatan database baru. `.dev.vars` diabaikan Git dan tidak diunggah saat deployment.

```sh
npm run types:worker  # ulangi setelah mengubah bindings; deklarasi binding ringkas disimpan di Git
npm run typecheck    # frontend + Worker
npm run lint
npm run build
npx wrangler deploy --dry-run # validasi bundling lokal; bukan deployment
```

Versi Node yang didukung Vite/Wrangler terpasang diperlukan (gunakan Node 24 LTS).

## PWA

`vite-plugin-pwa` menghasilkan satu `manifest.webmanifest`, `sw.js`, dan skrip registrasi saat build. Metadata manifest berasal dari `vite.config.js`; jangan menambahkan manifest kedua di `public/`. Ikon monogram yang ada disalin tanpa perubahan.

Precache hanya berisi JS/CSS build, empat ikon manifest, favicon, Apple Touch Icon, dan manifest statis. HTML/navigasi dan `/api/*` selalu membutuhkan jaringan; tidak ada runtime cache, offline shell, background sync, antrean pembayaran, atau reload otomatis. Update service worker menunggu semua tab/jendela aplikasi lama ditutup. Tidak ada persistensi TanStack Query baru.

Untuk memeriksa hasil build secara lokal, gunakan `npm run build` lalu `npm run dev:api` dengan konfigurasi development lokal yang sudah ada. Periksa `/rencana`, `/rencana/:itemId`, manifest, ikon, dan service worker melalui origin Wrangler yang sama. DevTools → Application → Cache Storage seharusnya hanya memuat aset statis di atas. Setelah mengakses data privat, pastikan tidak ada respons API/invoice/referensi di cache. Putuskan jaringan: navigasi baru harus gagal; submit pembayaran tidak boleh berhasil atau masuk antrean. Sambungkan kembali dan pastikan request mutasi tidak diputar ulang. Uji update dengan form belum disimpan: tidak boleh terjadi reload otomatis.

Instalasi perangkat harus diuji melalui HTTPS pada origin privat yang telah diotorisasi: Android Chrome → menu → Install app/Add to Home screen; iOS Safari → Share → Add to Home Screen → aktifkan Open as Web App jika tersedia → Add. Buka dari ikon dan periksa monogram serta tampilan standalone tanpa address bar. Uji akses privat kembali dari aplikasi terpasang dan kedua deep link.

**Batasan saat ini:** gate produksi yang ada (`LOCAL_DEVELOPMENT=false`) mengembalikan `503 ACCESS_NOT_CONFIGURED` untuk seluruh situs, termasuk manifest/service worker. PWA belum dapat dipasang dari produksi sampai akses privat dikonfigurasi melalui pekerjaan terpisah. Jangan mengubah nilai itu menjadi `true` di produksi. Perubahan PWA ini tidak mengubah middleware, Wrangler, D1, atau R2.

## Migrasi dan data

- `migrations/0001_initial.sql`: tabel `categories`, `items`, `candidates`, `payments`, view `item_finances`, foreign keys, constraints, indexes dan trigger finansial.
- `migrations/0002_categories.sql`: lima kategori tetap; insert aman terhadap slug duplikat.
- `migrations/0003_payment_invoice.sql`: metadata invoice opsional per pembayaran; file disimpan di R2 privat.
- `migrations/0004_reference_image.sql`: metadata gambar referensi persisten di R2 privat.
- Item/kandidat/transaksi menggunakan UUID. Kategori menggunakan ID slug tetap. Nilai uang integer rupiah, maksimum Rp1.000.000.000.000 per nilai; tidak ada float/ORM.
- Kandidat terpilih harus milik item, dijaga composite foreign key. `agreed_amount` adalah snapshot; `estimated_amount` tetap tersimpan. Edit harga kandidat sebelum pembayaran tidak mengubah snapshot. Memilih ulang kandidat secara eksplisit melalui endpoint selection mengambil snapshot baru.
- Effective amount = agreed ketika terpilih, selain itu estimasi. Dashboard `estimatedTotal` menjumlahkan effective amount. Paid hanya transaksi non-void; remaining = effective − paid; status `unpaid | partial | paid`.
- Trigger menjalankan pemeriksaan saldo bersama operasi tulis, termasuk request bersamaan. Pilihan/snapshot dan harga kandidat terpilih dikunci setelah ada riwayat pembayaran, **termasuk riwayat void**. Kandidat apa pun dalam item dengan riwayat pembayaran tidak dapat dihapus. Item tanpa riwayat dapat dihapus beserta referensinya. Menghapus kandidat terpilih tanpa riwayat akan melepas pilihan dalam batch atomik.
- DELETE pembayaran hanya mengisi `voided_at`. Transaksi void tetap tampil dalam riwayat dan tidak dapat diedit/diaktifkan ulang. Penghapusan permanen pembayaran diblokir trigger.
- Data lama adalah contoh UI parsial, kandidat `example.com`, transaksi contoh, dan estimasi historis Rp84.877.028. Tidak diimpor. Database awal hanya berisi kategori; Home menampilkan total nyata (awal Rp0). Tidak ada sample finansial/seed remote.

## API

Semua endpoint memakai prefix `/api/v1`. Sukses `{ "data": ... }`, list juga `{ "meta": { "total": ... } }`, error `{ "error": { "code": "...", "message": "..." } }`. DELETE berhasil mengembalikan 204 tanpa body. Mutation selain DELETE mengembalikan detail item terkini. Validasi Zod mengembalikan 422; konflik aturan bisnis 409; ID tidak ditemukan 404. SQL internal tidak diteruskan ke client.

| Method | Path                                     | Payload/query                                                                                                   |
| ------ | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| GET    | `/dashboard`                             | Total dan ringkasan per kategori dari D1                                                                        |
| GET    | `/categories`                            | Urut `sortOrder`                                                                                                |
| GET    | `/items`                                 | `category=<slug>`, `q=<nama>`, `selection=all\|selected\|unselected`                                            |
| GET    | `/items/:id`                             | Item, category, candidates, financial, payments (termasuk void)                                                 |
| POST   | `/items`                                 | `name`, `categoryId`, `estimatedAmount`                                                                         |
| PATCH  | `/items/:id`                             | Sebagian field POST                                                                                             |
| DELETE | `/items/:id`                             | Hanya tanpa riwayat pembayaran                                                                                  |
| POST   | `/items/:id/candidates`                  | `name`, `url` HTTP/HTTPS, `price`, `note?`; JSON atau multipart dengan `image?`                                 |
| PATCH  | `/items/:id/candidates/:candidateId`     | Sebagian field POST; multipart untuk ganti gambar, `removeImage: true` untuk hapus                              |
| DELETE | `/items/:id/candidates/:candidateId`     | Hanya tanpa riwayat pembayaran                                                                                  |
| PUT    | `/items/:id/selection`                   | `{ "candidateId": "uuid" }`                                                                                     |
| DELETE | `/items/:id/selection`                   | Hanya tanpa riwayat pembayaran                                                                                  |
| POST   | `/items/:id/payments`                    | JSON lama atau multipart: `type`, `amount`, `paidAt` (`YYYY-MM-DD`), `note?`, `invoice?` (file, multipart saja) |
| GET    | `/items/:id/payments/:paymentId/invoice` | Unduh invoice melalui gate akses Worker; termasuk transaksi void                                                |
| PATCH  | `/items/:id/payments/:paymentId`         | Sebagian field POST                                                                                             |
| DELETE | `/items/:id/payments/:paymentId`         | Void; tidak menghapus riwayat                                                                                   |

Payment type: `deposit`, `installment`, `settlement`. Nominal wajib integer positif dan tidak boleh melampaui outstanding. Tanggal harus tanggal kalender valid. URL selain HTTP/HTTPS ditolak; tidak ada scraping. Request JSON dibatasi 16 KiB. POST pembayaran multipart dibatasi 5 MiB + 16 KiB overhead; invoice maksimal 5 MiB, satu file PDF/JPG/PNG. Worker memeriksa MIME dan signature awal file (bukan pemeriksaan antivirus/validitas seluruh dokumen). Error penting: `SELECTION_REQUIRED`, `OVERPAYMENT`, `FINANCIAL_HISTORY`, `INVALID_SELECTION`, `PAYMENT_VOIDED`, `VALIDATION_ERROR`, `NOT_FOUND`.

```sh
curl http://127.0.0.1:8787/api/v1/categories
curl -X POST http://127.0.0.1:8787/api/v1/items \
  -H 'Content-Type: application/json' \
  -d '{"name":"Makeup","categoryId":"seserahan","estimatedAmount":500000}'
```

## Invoice pembayaran

`INVOICES` adalah binding R2 privat dengan nama bucket rencana `wedding-planner-invoices`. `wrangler dev` memakai R2 lokal secara default; jalankan migration lokal termasuk `0003` sebelum mencoba upload. Binding ini tidak membuat bucket remote. Untuk deployment nanti, siapkan bucket privat pada akun yang benar dan sesuaikan namanya; migration remote dan deploy memerlukan izin terpisah.

Invoice opsional, satu file per pembayaran, belum mendukung ganti/hapus lampiran. Detail payment mengembalikan `invoice: { name, type, size } | null`, tanpa key storage. Link download melalui API, bukan URL bucket publik. Void mempertahankan invoice.

File di-upload sebelum insert D1; insert yang ditolak memicu penghapusan file, kegagalan cleanup dicatat sebagai `INVOICE_CLEANUP_FAILED` dengan ID pembayaran saja. D1/R2 tidak memiliki transaksi bersama: penghentian runtime di antara operasi masih dapat menyisakan file yatim yang perlu rekonsiliasi. Jika insert sudah berhasil tetapi pembacaan detail gagal, API mengembalikan 201 dengan `{ data: null, meta: { paymentSaved: true } }`; UI mengunci submit dan meminta muat ulang riwayat. Request POST tidak diulang otomatis. Koneksi terputus setelah commit tetap dapat membuat status hasil tidak pasti; idempotency belum termasuk scope ini.

## Frontend dan file integrasi

- `worker/index.ts`, `wrangler.jsonc`, `tsconfig.worker.json`, `worker-configuration.d.ts`: API, konfigurasi resource yang sudah ada, dan tipe binding.
- `src/api/client.ts`: fetch JSON, error terpusat, loading/retry, pembatalan request saat navigasi/filter berubah.
- `src/context/planning/{types.ts,PlanningCtxProvider.tsx}`: tipe API dan state detail; mutations menggunakan respons backend untuk saldo. Provider `.ts` lama digantikan `.tsx` untuk JSX provider dan pemeriksaan hooks.
- `src/pages/{Home.tsx,planning/index.tsx,planning/PlanningDetail.tsx}` dan `src/components/home/{FinancialCard,CategoryGrid}.tsx`: data live, empty/loading/error, filter URL, halaman detail.
- `src/components/planning/{Filter,List,ItemDrawer}.tsx`: search/kategori/status, detail link dengan query, tambah/edit kebutuhan. Header detail menyediakan edit/hapus kebutuhan tanpa mengubah layout utama.
- `src/components/planning-detail/{Header,Tabs}.tsx`, `references/{index,ReferenceItem,ReferenceDrawer}.tsx`, `payment/{index,PaymentDrawer,PaymentHistory,PaymentSummaryCards,PaymentVendorNotSelected}.tsx`: referensi tambah/edit/hapus, pilihan final, progressive disclosure, drawer pembayaran, riwayat termasuk void. Tanpa pilihan final, tab/section/tombol pembayaran disembunyikan. Mutations mencegah submit ganda, menampilkan loading/error, memperbarui state tanpa reload. Edit/void transaksi tersedia di API; UI riwayat saat ini tetap hanya baca.
- `src/constants/{home,planning}/index.ts`: mock uang/item/kandidat/transaksi dihapus; metadata kategori tetap hanya untuk fallback/icon. Optional gambar referensi tetap preview lokal, tidak disimpan ke D1; field `note` disimpan. Penyimpanan gambar permanen membutuhkan workflow tersendiri.
- `vite.config.js`, `package.json`, `package-lock.json`, `.gitignore`, `.dev.vars.example`, `eslint.config.js`: proxy lokal, scripts/dependencies, pengecualian hasil Wrangler, lint TypeScript.

Perubahan UI/styling yang sudah ada/masuk selama pengerjaan dipertahankan. Tidak ada redesign styled-components atau perubahan menu utama. Route `/`, `/rencana`, `/rencana/:itemId` dan redirect `/pembayaran` tetap; `kategori`, `q`, `selection` ada di URL. Navigasi kembali mempertahankan filter; kunjungan Home/Rencana mengambil ulang total dari API.

## Keamanan dan persiapan remote (belum dilakukan)

**Remote sengaja terkunci.** Nilai default `LOCAL_DEVELOPMENT=false` mengembalikan 503 `ACCESS_NOT_CONFIGURED` untuk seluruh situs/API, termasuk GET. `assets.run_worker_first=true` memastikan aset tidak melewati gate. `workers_dev=false` dan `preview_urls=false` mencegah jalur publik alternatif secara default. Tidak ada CORS terbuka. Mode lokal di `.dev.vars` hanya untuk loopback; jangan pernah mengatur `LOCAL_DEVELOPMENT=true` di deployment remote.

Sebelum data nyata dapat digunakan secara remote:

1. Konfigurasi Cloudflare Access pada domain situs **dan seluruh `/api/*`**, allowlist hanya dua pengguna yang dimaksud. Tentukan domain, team domain, dan audience Access. Jangan menaruh token/credential ke frontend/repo.
2. Implementasikan/verifikasi JWT Access di Worker (signature dari JWKS, issuer, audience, expiry), lalu ganti gate lokal dengan pemeriksaan JWT. Jangan hanya memeriksa keberadaan header atau menyalakan flag lokal. Uji bahwa frontend/API tanpa autentikasi, mutation, serta akses origin alternatif ditolak. Konfigurasi Access/JWT belum menjadi bagian implementasi lokal ini.
3. Tinjau konfigurasi domain/routing/bindings akun yang benar dan backup database remote. Tidak ada credential Cloudflare di frontend. Raw body/SQL/financial record tidak dicatat dalam log aplikasi.
4. Dengan izin eksplisit pemilik, tinjau lalu jalankan migrasi remote pada database yang sudah ada:

   ```sh
   npx wrangler d1 migrations list DB --remote
   # JALANKAN APPLY HANYA SETELAH ADA IZIN REMOTE:
   npx wrangler d1 migrations apply DB --remote
   ```

   Perintah tersebut **tidak** dijalankan oleh implementasi, test, build atau startup lokal. Migrasi pertama memerlukan remote schema yang kompatibel; jika database sudah mempunyai tabel/data, inspeksi/backup dahulu dan siapkan rekonsiliasi, jangan drop/reset tabel.

5. Jalankan build, dry-run dan verifikasi keamanan. Deploy hanya setelah izin terpisah. Tidak ada script deploy otomatis atau push commit.

Referensi platform: [D1 SQL](https://developers.cloudflare.com/d1/sql-api/sql-statements/), [D1 Wrangler/migrations](https://developers.cloudflare.com/d1/wrangler-commands/), [Workers static assets](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/).

Gambar referensi JPEG/PNG/WebP maksimal 5 MiB disimpan pada binding R2 privat `INVOICES` dengan prefix `references/`. Terapkan migration `0004` sebelum menggunakan fitur ini. Detail kandidat mengembalikan `image` berupa URL API melalui gate akses Worker: `GET /api/v1/items/:id/candidates/:candidateId/image`. Ganti/hapus gambar membersihkan objek lama setelah perubahan database berhasil; file lama tetap dipertahankan bila perubahan ditolak. Runtime yang terhenti di antara operasi D1/R2 dapat meninggalkan file yatim untuk rekonsiliasi. Gambar preview lokal dari sesi lama tidak dapat dipulihkan setelah refresh.

Input harga referensi, estimasi awal, dan nominal pembayaran memakai pemisah ribuan koma (`1,000,000`), sedangkan nilai ke API tetap angka mentah. Tampilan ringkasan rupiah tetap mengikuti format Indonesia.
