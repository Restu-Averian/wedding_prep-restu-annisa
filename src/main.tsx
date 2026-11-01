import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './router'
import { GlobalStyle } from './styles/GlobalStyle'

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </StrictMode>,
)
