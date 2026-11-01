import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { Header } from '../../components/planning/planning-detail/Header'
import { ItemInfo } from '../../components/planning/planning-detail/ItemInfo'
import { PaymentDrawer } from '../../components/planning/planning-detail/PaymentDrawer'
import { categories, items, candidates, payments } from '../../data/wedding'
import { PlanningPage } from '../../styles/Planning.styles'
import { formatRupiah } from '../../utils/currency'

export default function PlanningDetail() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { itemId } = useParams()
  const [params] = useSearchParams()
  const item = items.find(({ id }) => id === itemId)
  const backTo = `/rencana${params.size ? `?${params}` : ''}`

  if (!item) {
    return (
      <PlanningPage>
        <Link className="text-link" to={backTo}>
          ← Kembali ke Rencana
        </Link>
        <h1>Kebutuhan tidak ditemukan</h1>
        <p>Pilih kebutuhan lain dari halaman Rencana.</p>
      </PlanningPage>
    )
  }

  const category = categories.find(({ id }) => id === item.categoryId)
  const references = candidates.filter(
    (candidate) => candidate.itemId === item.id,
  )
  const selected = references.find(({ id }) => id === item.selectedCandidateId)
  const transactions = payments.filter((payment) => payment.itemId === item.id)
  const total = selected?.price ?? item.estimate
  const paid = transactions.reduce((sum, payment) => sum + payment.amount, 0)
  const remaining = Math.max(0, total - paid)
  const status =
    paid === 0 ? 'Belum Bayar' : remaining === 0 ? 'Lunas' : 'Belum Lunas'

  return (
    <PlanningPage>
      <Link className="text-link" to={backTo}>
        ← Kembali ke Rencana
      </Link>
      <Header categoryName={category?.name} itemName={item.name} />

      <ItemInfo
        categoryName={category?.name}
        estimate={item.estimate}
        isSelected={!!selected}
      />

      <section className="panel" aria-labelledby="references-title">
        <h2 id="references-title">Referensi Produk / Vendor</h2>
        {references.length ? (
          <ul className="reference-list">
            {references.map((candidate) => (
              <li key={candidate.id} className="reference">
                <div>
                  <h3>{candidate.name}</h3>
                  <p>{formatRupiah(candidate.price)}</p>
                  {candidate.url && (
                    <a
                      className="text-link"
                      href={candidate.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Buka referensi ↗
                    </a>
                  )}
                </div>
                <span
                  className="badge"
                  data-selected={selected?.id === candidate.id}
                >
                  {selected?.id === candidate.id ? 'Terpilih' : 'Belum Dipilih'}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">Belum ada referensi untuk kebutuhan ini.</p>
        )}
        <button className="secondary" type="button" disabled>
          Tambah Referensi
        </button>
        <p className="hint">Penambahan referensi akan tersedia nanti.</p>
      </section>

      <section className="panel" aria-labelledby="payments-title">
        <div className="section-heading">
          <h2 id="payments-title">Pembayaran</h2>
          <span className="badge" data-selected={status === 'Lunas'}>
            {status}
          </span>
        </div>
        <dl className="facts">
          <div>
            <dt>{selected ? 'Harga pilihan' : 'Total estimasi'}</dt>
            <dd>{formatRupiah(total)}</dd>
          </div>
          <div>
            <dt>Sudah dibayar</dt>
            <dd>{formatRupiah(paid)}</dd>
          </div>
          <div>
            <dt>Sisa pembayaran</dt>
            <dd>{formatRupiah(remaining)}</dd>
          </div>
        </dl>
        <h3>Riwayat Pembayaran</h3>
        {transactions.length ? (
          <ul className="reference-list">
            {transactions.map((payment) => (
              <li className="reference" key={payment.id}>
                <div>
                  <h3>{payment.kind}</h3>
                  <time dateTime={payment.date}>
                    {new Date(`${payment.date}T12:00:00`).toLocaleDateString(
                      'id-ID',
                      { day: 'numeric', month: 'long', year: 'numeric' },
                    )}
                  </time>
                  {payment.note && <p className="hint">{payment.note}</p>}
                </div>
                <strong>{formatRupiah(payment.amount)}</strong>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">Belum ada pembayaran.</p>
        )}
        <button
          className="primary"
          type="button"
          onClick={() => setDrawerOpen(true)}
        >
          Catat Pembayaran
        </button>
        <p className="hint">
          Data contoh untuk tampilan, belum terhubung ke transaksi sebenarnya.
        </p>
      </section>

      {drawerOpen && (
        <PaymentDrawer
          key={item.id}
          itemName={item.name}
          onClose={() => setDrawerOpen(false)}
        />
      )}
    </PlanningPage>
  )
}

