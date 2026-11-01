import { Outlet } from 'react-router-dom'
import { styled } from 'styled-components'
import Navigation from '../components/Navigation'

const Main = styled.main`
  width: min(100%, 960px);
  margin: 0 auto;
  padding: 48px 24px calc(104px + env(safe-area-inset-bottom, 0px));

  @media (min-width: 768px) {
    padding: 72px 24px;
  }
`

export default function WeddingLayout() {
  return (
    <>
      <a className="skip-link" href="#main-content">Lewati navigasi</a>
      <Navigation />
      <Main id="main-content" tabIndex={-1}>
        <Outlet />
      </Main>
    </>
  )
}
