import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Notice = styled.div`
  padding: 13px 15px;
  border: 1px solid
    ${({ $type, theme }) =>
      $type === "error" ? theme.color.dangerSoft : theme.color.successSoft};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ $type, theme }) =>
    $type === "error" ? theme.color.danger : theme.color.success};
  background: ${({ $type, theme }) =>
    $type === "error" ? theme.color.dangerSoft : theme.color.successSoft};
  font-size: 0.92rem;
  line-height: 1.5;
`;

const LoadingWrap = styled.div`
  display: grid;
  min-height: 220px;
  place-items: center;
  color: ${({ theme }) => theme.color.sub};

  span {
    width: 32px;
    height: 32px;
    border: 3px solid ${({ theme }) => theme.color.border};
    border-top-color: ${({ theme }) => theme.color.primary};
    border-radius: 50%;
    animation: ${spin} 800ms linear infinite;
  }
`;

export function Feedback({ type = "error", children }) {
  if (!children) return null;
  return (
    <Notice $type={type} role={type === "error" ? "alert" : "status"}>
      {children}
    </Notice>
  );
}

export function Loading() {
  return (
    <LoadingWrap aria-label="불러오는 중">
      <span />
    </LoadingWrap>
  );
}
