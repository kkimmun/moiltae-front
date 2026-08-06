import styled, { css } from "styled-components";

export const Page = styled.main`
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;
  padding: 46px 0 80px;

  @media (max-width: 640px) {
    width: min(100% - 24px, 1180px);
    padding-top: 28px;
  }
`;

export const PageHeading = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 28px;

  h1 {
    margin-bottom: 7px;
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    letter-spacing: -0.045em;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.color.sub};
    line-height: 1.65;
  }

  @media (max-width: 640px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

export const Card = styled.section`
  padding: 26px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.color.surface};
  box-shadow: ${({ theme }) => theme.shadow.sm};

  @media (max-width: 640px) {
    padding: 20px;
  }
`;

const buttonVariants = {
  primary: css`
    color: #fff;
    border-color: ${({ theme }) => theme.color.primary};
    background: ${({ theme }) => theme.color.primary};

    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.color.primaryDark};
      background: ${({ theme }) => theme.color.primaryDark};
    }
  `,
  secondary: css`
    color: ${({ theme }) => theme.color.ink};
    border-color: ${({ theme }) => theme.color.border};
    background: ${({ theme }) => theme.color.surface};

    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.color.primary};
      color: ${({ theme }) => theme.color.primaryDark};
    }
  `,
  danger: css`
    color: ${({ theme }) => theme.color.danger};
    border-color: ${({ theme }) => theme.color.dangerSoft};
    background: ${({ theme }) => theme.color.dangerSoft};
  `,
};

export const Button = styled.button`
  min-height: 44px;
  padding: 0 18px;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 750;
  transition: 160ms ease;
  ${({ $variant = "primary" }) => buttonVariants[$variant]}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`;

export const Field = styled.label`
  display: grid;
  gap: 9px;
  color: ${({ theme }) => theme.color.ink};
  font-size: 0.94rem;
  font-weight: 700;
`;

export const Input = styled.input`
  width: 100%;
  min-height: 48px;
  padding: 0 14px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.color.ink};
  background: #fff;

  &[type="date"],
  &[type="time"],
  &[type="datetime-local"] {
    cursor: pointer;
  }

  &:disabled {
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${({ theme }) => theme.color.muted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.color.primary};
  }
`;

export const FormGrid = styled.form`
  display: grid;
  gap: 20px;
`;

export const InlineActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`;

export const EmptyState = styled.div`
  padding: 56px 24px;
  border: 1px dashed ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  color: ${({ theme }) => theme.color.sub};
  text-align: center;
  background: rgba(255, 255, 255, 0.58);

  strong {
    display: block;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.color.ink};
    font-size: 1.1rem;
  }

  p {
    margin-bottom: 0;
  }
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 10px;
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ $status, theme }) =>
    $status === "CLOSED" ? theme.color.sub : theme.color.success};
  background: ${({ $status, theme }) =>
    $status === "CLOSED" ? theme.color.surfaceAlt : theme.color.successSoft};
  font-size: 0.8rem;
  font-weight: 800;
`;

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
