import styled from "styled-components";

export const RangeList = styled.div`
  display: grid;
  gap: 12px;
`;

export const RangeRow = styled.div`
  display: grid;
  padding: 14px;
  grid-template-columns: minmax(150px, 1.35fr) minmax(110px, 1fr) auto minmax(110px, 1fr) auto;
  align-items: end;
  gap: 10px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.color.background};

  @media (max-width: 720px) {
    grid-template-columns: 1fr 1fr;

    > label:first-child {
      grid-column: 1 / -1;
    }

    > button {
      grid-column: 1 / -1;
    }
  }
`;

export const RangeSeparator = styled.span`
  display: grid;
  min-height: 48px;
  place-items: center;
  color: ${({ theme }) => theme.color.muted};
  font-weight: 800;

  @media (max-width: 720px) {
    display: none;
  }
`;

export const RangeEmpty = styled.div`
  padding: 28px 16px;
  border: 1px dashed ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.color.sub};
  text-align: center;
  font-size: 0.9rem;
`;
