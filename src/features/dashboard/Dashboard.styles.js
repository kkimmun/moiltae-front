import { Link } from "react-router-dom";
import styled from "styled-components";

export const Hero = styled.section`
  display: grid;
  margin-bottom: 38px;
  padding: clamp(28px, 5vw, 52px);
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: 28px;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.lg};
  color: #fff;
  background:
    radial-gradient(circle at 90% 5%, rgba(255, 214, 107, 0.9), transparent 11rem),
    ${({ theme }) => theme.color.ink};
  box-shadow: ${({ theme }) => theme.shadow.md};

  h1 {
    max-width: 680px;
    margin-bottom: 14px;
    font-size: clamp(2rem, 4vw, 3.6rem);
    line-height: 1.12;
    letter-spacing: -0.055em;
  }

  p {
    max-width: 620px;
    margin: 0;
    color: rgba(255, 255, 255, 0.66);
    line-height: 1.75;
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const HeroNumber = styled.div`
  min-width: 132px;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: ${({ theme }) => theme.radius.md};
  background: rgba(255, 255, 255, 0.07);
  text-align: right;

  strong {
    display: block;
    color: ${({ theme }) => theme.color.accent};
    font-size: 2.8rem;
    letter-spacing: -0.06em;
  }

  span {
    color: rgba(255, 255, 255, 0.66);
    font-size: 0.86rem;
  }
`;

export const QuickLinks = styled.div`
  display: grid;
  margin-bottom: 38px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

export const QuickLink = styled(Link)`
  display: flex;
  min-height: 90px;
  padding: 20px 22px;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.color.surface};
  transition: 160ms ease;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.color.primary};
    box-shadow: ${({ theme }) => theme.shadow.sm};
  }

  strong {
    display: block;
    margin-bottom: 5px;
  }

  small {
    color: ${({ theme }) => theme.color.sub};
  }

  > span {
    color: ${({ theme }) => theme.color.primary};
    font-size: 1.5rem;
    font-weight: 900;
  }
`;

export const RoomGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const RoomCard = styled(Link)`
  display: flex;
  min-height: 220px;
  padding: 24px;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.color.surface};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  transition: 160ms ease;

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(246, 95, 67, 0.55);
    box-shadow: ${({ theme }) => theme.shadow.md};
  }

  h3 {
    margin: 20px 0 8px;
    font-size: 1.25rem;
    letter-spacing: -0.025em;
  }
`;

export const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const OwnerMark = styled.span`
  color: ${({ theme }) => theme.color.warning};
  font-size: 0.8rem;
  font-weight: 800;
`;

export const RoomMeta = styled.div`
  display: grid;
  margin-top: auto;
  gap: 7px;
  color: ${({ theme }) => theme.color.sub};
  font-size: 0.88rem;

  span:last-child {
    color: ${({ theme }) => theme.color.muted};
  }
`;
