import { NavLink, Outlet } from "react-router-dom";
import { Footer, Main, Nav } from "../styles/WeddingLayout.styles";

export default function WeddingLayout() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Lewati navigasi
      </a>

      <Nav aria-label="Navigasi utama">
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/rencana">Rencana</NavLink>
      </Nav>

      <Main id="main-content" tabIndex={-1}>
        <Outlet />

        <Footer>Made with ♡ for our forever</Footer>
      </Main>
    </>
  );
}
