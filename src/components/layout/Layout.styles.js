import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const HeaderBar = styled.header`
  position: sticky;
  z-index: 20;
  top: 0;
  border-bottom: 1px solid rgba(228, 224, 216, 0.9);
  background: rgba(247, 245, 240, 0.92);
  backdrop-filter: blur(16px);
`;

export const HeaderInner = styled.div`
  display: flex;
  width: min(1180px, calc(100% - 40px));
  min-height: 72px;
  margin: 0 auto;
  align-items: center;
  gap: 28px;

  @media (max-width: 720px) {
    width: min(100% - 24px, 1180px);
    min-height: 64px;
    gap: 14px;
  }
`;

export const Logo = styled.button`
  padding: 0;
  border: 0;
  color: ${({ theme }) => theme.color.ink};
  background: transparent;
  font-size: 1.35rem;
  font-weight: 900;
  letter-spacing: -0.06em;
  white-space: nowrap;

  span {
    color: ${({ theme }) => theme.color.primary};
  }
`;

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 6px;

  @media (max-width: 720px) {
    order: 3;
    position: fixed;
    z-index: 30;
    right: 12px;
    bottom: 12px;
    left: 12px;
    justify-content: center;
    padding: 8px;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.radius.lg};
    background: rgba(255, 255, 255, 0.96);
    box-shadow: ${({ theme }) => theme.shadow.md};
  }
`;

export const MenuLink = styled(NavLink)`
  padding: 9px 13px;
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.color.sub};
  font-size: 0.92rem;
  font-weight: 750;

  &.active {
    color: ${({ theme }) => theme.color.primaryDark};
    background: ${({ theme }) => theme.color.primarySoft};
  }
`;

export const UserArea = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
  gap: 10px;
`;

export const UserName = styled.span`
  color: ${({ theme }) => theme.color.sub};
  font-size: 0.9rem;

  strong {
    color: ${({ theme }) => theme.color.ink};
  }

  @media (max-width: 560px) {
    display: none;
  }
`;

export const LogoutButton = styled.button`
  padding: 8px 11px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.color.sub};
  background: ${({ theme }) => theme.color.surface};
  font-size: 0.84rem;
  font-weight: 700;
`;

export const Content = styled.div`
  min-height: calc(100vh - 150px);
`;

export const FooterBar = styled.footer`
  padding: 28px 20px 96px;
  border-top: 1px solid ${({ theme }) => theme.color.border};
  color: ${({ theme }) => theme.color.muted};
  text-align: center;
  font-size: 0.85rem;

  @media (min-width: 721px) {
    padding-bottom: 28px;
  }
`;
