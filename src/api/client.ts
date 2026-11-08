import { useEffect, useState } from 'react'

export async function api<T>(path: string, method = 'GET', data?: unknown, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`/api/v1${path}`, {
    method, signal, headers: data === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: data === undefined ? undefined : JSON.stringify(data),
  })
  if (response.status === 204) return undefined as T
  const payload = await response.json().catch(() => null)
  if (!response.ok) throw new Error(payload?.error?.message ?? 'Server tidak dapat dihubungi. Coba kembali.')
  if (!payload || !('data' in payload)) throw new Error('Respons server tidak valid.')
  return payload.data as T
}

export function useApi<T>(path: string) {
  const [state, setState] = useState<{ path: string; data?: T; error?: string }>({ path })
  const [revision, setRevision] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    api<T>(path, 'GET', undefined, controller.signal).then(
      data => setState({ path, data }),
      error => { if (!controller.signal.aborted) setState({ path, error: error instanceof Error ? error.message : 'Koneksi gagal.' }) },
    )
    return () => controller.abort()
  }, [path, revision])
  const current = state.path === path ? state : undefined
  return { data: current?.data, error: current?.error, loading: !current?.data && !current?.error, retry: () => { setState({ path }); setRevision(value => value + 1) } }
}
