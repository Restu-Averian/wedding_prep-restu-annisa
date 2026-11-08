import { styled } from "styled-components";
import { Link, NavLink } from "react-router-dom";

export const HeaderContainer = styled.header`
  display: contents;

  @media (min-width: 768px) {
    display: block;
    position: sticky;
    top: 0;
    z-index: 40;
    width: 100%;
    background: rgba(255, 250, 242, 0.88);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid #ebdcd0;
    box-shadow: 0 1px 3px rgba(87, 67, 52, 0.02);
  }
`;

export const Nav = styled.nav`
  position: fixed;
  bottom: calc(16px + env(safe-area-inset-bottom, 0px));
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 9999px;
  background: rgba(255, 253, 249, 0.94);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid #e7d9ca;
  box-shadow:
    0 8px 24px rgba(87, 67, 52, 0.08),
    0 2px 6px rgba(87, 67, 52, 0.04);

  @media (min-width: 768px) {
    position: static;
    transform: none;
    width: min(100%, 960px);
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    padding: 0 24px;
    background: transparent;
    border: 0;
    border-radius: 0;
    box-shadow: none;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
`;

export const BrandLink = styled(Link)`
  display: none;

  @media (min-width: 768px) {
    display: inline-flex;
    align-items: baseline;
    gap: 10px;
    text-decoration: none;
    color: #493426;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.85;
    }

    .brand-names {
      font-family: Georgia, serif;
      font-size: 1.15rem;
      letter-spacing: -0.01em;
      color: #493426;
    }

    .brand-tag {
      font-size: 0.6875rem;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #88656b;
      background: #f3eae0;
      padding: 3px 8px;
      border-radius: 9999px;
    }
  }
`;

export const NavList = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  @media (min-width: 768px) {
    gap: 6px;
  }
`;

export const NavItemLink = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 18px;
  min-height: 40px;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #7a6656;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);

  svg {
    flex-shrink: 0;
    transition: transform 0.18s ease;
  }

  &:hover {
    background: #f4eae0;
    color: #574334;

    svg {
      transform: translateY(-1px);
    }
  }

  &[aria-current="page"] {
    background: #ebdccf;
    color: #493426;
    font-weight: 600;
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.6);
  }
`;

export const Main = styled.main`
  width: min(100%, 960px);
  margin: 0 auto;
  padding: 32px 16px calc(96px + env(safe-area-inset-bottom, 0px));
  box-sizing: border-box;

  @media (min-width: 480px) {
    padding: 40px 24px calc(96px + env(safe-area-inset-bottom, 0px));
  }

  @media (min-width: 768px) {
    padding: 48px 24px 72px;
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
