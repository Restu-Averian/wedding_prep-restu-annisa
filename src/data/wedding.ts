export interface Category {
  id: string
  name: string
  estimate: number
}

export const CATEGORIES = [
  { id: 'lamaran', name: 'Lamaran', estimate: 5250000 },
  { id: 'seserahan', name: 'Seserahan', estimate: 2625000 },
  { id: 'resepsi', name: 'Resepsi', estimate: 46300000 },
  { id: 'mahar', name: 'Mahar', estimate: 27052028 },
  { id: 'akad-nikah', name: 'Akad Nikah', estimate: 3650000 },
] as const satisfies readonly Category[]

export interface WeddingItem {
  id: string
  name: string
  categoryId: typeof CATEGORIES[number]['id']
  estimate: number
  selectedCandidateId?: string
}

export interface Candidate {
  id: string
  itemId: string
  name: string
  price: number
  url?: string
  image?: string
}

export interface Payment {
  id: string
  itemId: string
  kind: string
  amount: number
  date: string
  note?: string
}

// ponytail: contoh UI parsial; total Home tetap memakai estimasi kategori awal.
export const ITEMS: WeddingItem[] = [
  { id: 'makeup', name: 'Makeup', categoryId: 'seserahan', estimate: 500000, selectedCandidateId: 'makeup-b' },
  { id: 'skincare', name: 'Skincare', categoryId: 'seserahan', estimate: 350000 },
  { id: 'parfum', name: 'Parfum', categoryId: 'seserahan', estimate: 300000 },
  { id: 'cincin-lamaran', name: 'Cincin Lamaran', categoryId: 'lamaran', estimate: 2000000, selectedCandidateId: 'ring-a' },
  { id: 'catering', name: 'Catering', categoryId: 'resepsi', estimate: 15000000 },
  { id: 'dekorasi', name: 'Dekorasi', categoryId: 'resepsi', estimate: 8000000 },
  { id: 'mahar-pernikahan', name: 'Mahar Pernikahan', categoryId: 'mahar', estimate: 27052028 },
  { id: 'administrasi-nikah', name: 'Administrasi Nikah', categoryId: 'akad-nikah', estimate: 650000 },
]

export const CANDIDATES: Candidate[] = [
  { id: 'makeup-a', itemId: 'makeup', name: 'Kandidat A', price: 475000, url: 'https://example.com/makeup-a' },
  { id: 'makeup-b', itemId: 'makeup', name: 'Kandidat B', price: 420000, url: 'https://example.com/makeup-b' },
  { id: 'makeup-c', itemId: 'makeup', name: 'Kandidat C', price: 450000, url: 'https://example.com/makeup-c' },
  { id: 'skincare-a', itemId: 'skincare', name: 'Referensi Skincare A', price: 325000, url: 'https://example.com/skincare-a' },
  { id: 'skincare-b', itemId: 'skincare', name: 'Referensi Skincare B', price: 300000, url: 'https://example.com/skincare-b' },
  { id: 'ring-a', itemId: 'cincin-lamaran', name: 'Referensi Cincin A', price: 2000000, url: 'https://example.com/ring-a' },
]

export const PAYMENTS: Payment[] = [
  { id: 'makeup-dp', itemId: 'makeup', kind: 'DP', amount: 100000, date: '2026-10-25', note: 'Contoh pembayaran awal' },
  { id: 'ring-full', itemId: 'cincin-lamaran', kind: 'Pelunasan', amount: 2000000, date: '2026-10-26' },
]

// Backward compatibility aliases
export const categories = CATEGORIES
export const items = ITEMS
export const candidates = CANDIDATES
export const payments = PAYMENTS
