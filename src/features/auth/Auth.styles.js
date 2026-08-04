import { Link } from "react-router-dom";
import styled from "styled-components";

export const AuthPage = styled.main`
  display: grid;
  min-height: 100vh;
  grid-template-columns: minmax(0, 1.05fr) minmax(420px, 0.95fr);
  background: ${({ theme }) => theme.color.background};

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

export const IntroPanel = styled.section`
  display: flex;
  min-height: 100vh;
  padding: clamp(36px, 7vw, 90px);
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  color: #fff;
  background:
    radial-gradient(circle at 88% 18%, rgba(255, 214, 107, 0.85), transparent 15rem),
    linear-gradient(145deg, #172033 0%, #29344d 100%);

  @media (max-width: 860px) {
    display: none;
  }
`;

export const Brand = styled.div`
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: -0.06em;

  span {
    color: ${({ theme }) => theme.color.accent};
  }
`;

export const IntroCopy = styled.div`
  max-width: 620px;

  small {
    display: block;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.color.accent};
    font-weight: 800;
    letter-spacing: 0.12em;
  }

  h1 {
    margin-bottom: 22px;
    font-size: clamp(2.8rem, 5.5vw, 5.8rem);
    line-height: 1.04;
    letter-spacing: -0.065em;
  }

  p {
    max-width: 500px;
    margin-bottom: 0;
    color: rgba(255, 255, 255, 0.68);
    font-size: 1.05rem;
    line-height: 1.8;
  }
`;

export const StepLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  span {
    padding: 9px 13px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: ${({ theme }) => theme.radius.pill};
    color: rgba(255, 255, 255, 0.74);
    font-size: 0.86rem;
  }
`;

export const FormPanel = styled.section`
  display: grid;
  min-height: 100vh;
  padding: 36px;
  place-items: center;

  @media (max-width: 560px) {
    padding: 24px 18px;
  }
`;

export const AuthCard = styled.div`
  width: min(100%, 500px);
  padding: 34px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.color.surface};
  box-shadow: ${({ theme }) => theme.shadow.md};

  h2 {
    margin-bottom: 8px;
    font-size: 2rem;
    letter-spacing: -0.045em;
  }

  > p {
    margin-bottom: 28px;
    color: ${({ theme }) => theme.color.sub};
    line-height: 1.6;
  }

  @media (max-width: 560px) {
    padding: 26px 20px;
  }
`;

export const InputActionRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 9px;

  button {
    white-space: nowrap;
  }

  @media (max-width: 460px) {
    grid-template-columns: 1fr;
  }
`;

export const PasswordInputWrap = styled.div`
  position: relative;

  input {
    padding-right: 66px;
  }
`;

export const PasswordToggle = styled.button`
  position: absolute;
  top: 50%;
  right: 13px;
  padding: 5px;
  border: 0;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.color.sub};
  background: transparent;
  font-size: 0.8rem;
  font-weight: 800;
`;

export const FieldNote = styled.small`
  color: ${({ $valid, theme }) =>
    $valid ? theme.color.success : theme.color.danger};
  font-weight: 600;
  line-height: 1.45;
`;

export const SwitchText = styled.p`
  margin: 22px 0 0 !important;
  color: ${({ theme }) => theme.color.sub};
  text-align: center;
  font-size: 0.92rem;
`;

export const SwitchLink = styled(Link)`
  color: ${({ theme }) => theme.color.primaryDark};
  font-weight: 800;
`;
