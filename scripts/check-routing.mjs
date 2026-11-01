import assert from 'node:assert/strict'
import { createServer } from 'vite'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'

const server = await createServer({ server: { middlewareMode: true } })

try {
  const { routes } = await server.ssrLoadModule('/src/router.tsx')
  const pages = [['/', 'Our Wedding', 'Home'], ['/rencana', 'Rencana', 'Rencana'], ['/pembayaran', 'Pembayaran', 'Pembayaran']]

  function check(router, path, heading, label) {
    const html = renderToString(createElement(RouterProvider, { router }))
    assert.equal(router.state.location.pathname, path)
    assert.ok(html.includes(`<h1>${heading}</h1>`), `Missing heading: ${path}`)
    assert.match(html, new RegExp(`aria-current="page"[^>]*href="${path}"[^>]*>${label}</a>`))
    assert.equal((html.match(/aria-current="page"/g) ?? []).length, 1)
    for (const [href] of pages) assert.ok(html.includes(`href="${href}"`))
  }

  for (const [path, heading, label] of pages) {
    const router = createMemoryRouter(routes, { initialEntries: [path] })
    try {
      check(router, path, heading, label)
      for (const [nextPath, nextHeading, nextLabel] of pages) {
        await router.navigate(nextPath)
        check(router, nextPath, nextHeading, nextLabel)
      }
    } finally {
      router.dispose()
    }
  }

  console.log('PASS: 3 direct routes, 9 client-side transitions, headings, links, and active navigation.')
} finally {
  await server.close()
}
