import { NavLink } from 'react-router-dom'
import { styled } from 'styled-components'

const Nav = styled.nav`
  position: fixed;
  inset: auto 0 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  gap: 4px;
  padding: 8px 16px calc(8px + env(safe-area-inset-bottom, 0px));
  background: #f7f0e6;
  border-top: 1px solid #ded0bf;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    min-height: 48px;
    max-width: 180px;
    padding: 8px;
    border-radius: 8px;
    color: #675344;
    font-weight: 600;
    text-decoration: none;
  }

  a:hover { background: #ede2d3; }
  a[aria-current='page'] { background: #e7d8c5; color: #493426; }

  @media (min-width: 768px) {
    position: static;
    justify-content: flex-start;
    padding: 16px max(24px, calc((100% - 960px) / 2));
    border-top: 0;
    border-bottom: 1px solid #ded0bf;

    a { flex: initial; padding-inline: 24px; }
  }
`

export default function Navigation() {
  return (
    <Nav aria-label="Navigasi utama">
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/rencana">Rencana</NavLink>
      <NavLink to="/pembayaran">Pembayaran</NavLink>
    </Nav>
  )
}
