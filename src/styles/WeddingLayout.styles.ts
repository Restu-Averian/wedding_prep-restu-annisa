import { styled } from "styled-components";

export const Nav = styled.nav`
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

  a:hover {
    background: #ede2d3;
  }
  a[aria-current="page"] {
    background: #e7d8c5;
    color: #493426;
  }

  @media (min-width: 768px) {
    position: static;
    justify-content: flex-start;
    padding: 16px max(24px, calc((100% - 960px) / 2));
    border-top: 0;
    border-bottom: 1px solid #ded0bf;

    a {
      flex: initial;
      padding-inline: 24px;
    }
  }
`;

export const Main = styled.main`
  width: min(100%, 960px);
  margin: 0 auto;
  padding: 32px 16px calc(104px + env(safe-area-inset-bottom, 0px));
  box-sizing: border-box;

  @media (min-width: 480px) {
    padding: 48px 24px calc(104px + env(safe-area-inset-bottom, 0px));
  }

  @media (min-width: 768px) {
    padding: 72px 24px;
  }
`;

export const Footer = styled.footer`
  padding-top: 32px;
  text-align: center;
  color: #88656b;
  font:
    italic 0.875rem/1.8 Georgia,
    serif;
`;
