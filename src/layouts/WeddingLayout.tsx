import { Outlet } from "react-router-dom";
import {
  HeaderContainer,
  Nav,
  BrandLink,
  NavList,
  NavItemLink,
  Main,
  Footer,
} from "../styles/WeddingLayout.styles";
import { HomeIcon, PlannerIcon } from "../asset";
import { ConfirmProvider } from "../context/ConfirmContext";

export default function WeddingLayout() {
  return (
    <ConfirmProvider>
      <a className="skip-link" href="#main-content">
        Lewati navigasi
      </a>

      <HeaderContainer>
        <Nav aria-label="Navigasi utama">
          <BrandLink to="/" aria-label="Restu dan Annisa Wedding Prep">
            <span className="brand-names">Restu &amp; Annisa</span>
            <span className="brand-tag">Wedding Prep</span>
          </BrandLink>

          <NavList>
            <NavItemLink to="/" end>
              <HomeIcon size={18} />
              <span>Home</span>
            </NavItemLink>

            <NavItemLink to="/rencana">
              <PlannerIcon size={18} />
              <span>Rencana</span>
            </NavItemLink>
          </NavList>
        </Nav>
      </HeaderContainer>

      <Main id="main-content" tabIndex={-1}>
        <Outlet />

        <Footer>Made with ♡ for our forever</Footer>
      </Main>
    </ConfirmProvider>
  );
}
