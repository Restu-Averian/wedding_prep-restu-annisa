import type { RouteObject } from 'react-router-dom'
import WeddingLayout from './layouts/WeddingLayout'
import Home from './pages/Home'
import Planning from './pages/Planning'
import Payments from './pages/Payments'

export const routes: RouteObject[] = [
  {
    element: <WeddingLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/rencana', element: <Planning /> },
      { path: '/pembayaran', element: <Payments /> },
    ],
  },
]
