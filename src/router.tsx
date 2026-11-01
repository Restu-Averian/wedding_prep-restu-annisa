import type { RouteObject } from 'react-router-dom'
import WeddingLayout from './layouts/WeddingLayout'
import Home from './pages/Home'
import Rencana from './pages/Rencana'
import Pembayaran from './pages/Pembayaran'

export const routes: RouteObject[] = [
  {
    element: <WeddingLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/rencana', element: <Rencana /> },
      { path: '/pembayaran', element: <Pembayaran /> },
    ],
  },
]
