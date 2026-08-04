import styled from "styled-components";

export const NarrowPage = styled.main`
  width: min(720px, calc(100% - 40px));
  margin: 0 auto;
  padding: 46px 0 80px;

  @media (max-width: 640px) {
    width: min(100% - 24px, 720px);
    padding-top: 28px;
  }
`;

export const HelperText = styled.small`
  color: ${({ theme }) => theme.color.sub};
  font-weight: 500;
  line-height: 1.55;
`;

export const DateFields = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  align-items: start;
  gap: 18px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const Stack = styled.div`
  display: grid;
  gap: 18px;
`;

export const SectionTitle = styled.div`
  display: flex;
  margin-bottom: 18px;
  align-items: center;
  justify-content: space-between;
  gap: 14px;

  h2 {
    margin: 0;
    font-size: 1.18rem;
    letter-spacing: -0.025em;
  }

  small {
    color: ${({ theme }) => theme.color.sub};
  }
`;

export const DetailHeading = styled.div`
  display: flex;
  margin-bottom: 28px;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;

  h1 {
    margin: 10px 0 10px;
    font-size: clamp(1.8rem, 4vw, 3rem);
    letter-spacing: -0.05em;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.color.sub};
  }

  @media (max-width: 680px) {
    flex-direction: column;
  }
`;

export const MemberList = styled.ul`
  display: grid;
  margin: 0;
  padding: 0;
  gap: 9px;
  list-style: none;

  li {
    display: flex;
    min-height: 42px;
    padding: 0 12px;
    align-items: center;
    justify-content: space-between;
    border-radius: ${({ theme }) => theme.radius.md};
    background: ${({ theme }) => theme.color.background};
    font-size: 0.9rem;
  }

  span {
    color: ${({ theme }) => theme.color.muted};
    font-size: 0.78rem;
  }
`;

export const SubmissionPanel = styled.div`
  display: grid;
  margin-top: 18px;
  padding-top: 18px;
  gap: 12px;
  border-top: 1px solid ${({ theme }) => theme.color.border};

  > div:first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  h3 {
    margin: 0;
    font-size: 0.95rem;
  }

  strong {
    color: ${({ $complete, theme }) =>
      $complete ? theme.color.success : theme.color.primaryDark};
    font-size: 0.9rem;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.color.success};
    font-size: 0.88rem;
    font-weight: 700;
  }
`;

export const SubmissionHeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;

  button {
    padding: 3px 0;
    border: 0;
    color: ${({ theme }) => theme.color.sub};
    background: transparent;
    font-size: 0.78rem;
    font-weight: 700;
    text-decoration: underline;
  }
`;

export const UnsubmittedList = styled.div`
  display: grid;
  gap: 8px;

  small {
    color: ${({ theme }) => theme.color.sub};
    font-weight: 700;
  }

  ul {
    display: flex;
    margin: 0;
    padding: 0;
    flex-wrap: wrap;
    gap: 7px;
    list-style: none;
  }

  li {
    padding: 6px 9px;
    border-radius: ${({ theme }) => theme.radius.pill};
    color: ${({ theme }) => theme.color.danger};
    background: ${({ theme }) => theme.color.dangerSoft};
    font-size: 0.8rem;
    font-weight: 750;
  }
`;

export const ResultList = styled.div`
  display: grid;
  gap: 12px;
`;

export const ResultItem = styled.div`
  display: grid;
  padding: 18px;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 18px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.color.background};

  strong {
    display: block;
    margin-bottom: 6px;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.color.sub};
    font-size: 0.88rem;
  }

  > span {
    color: ${({ theme }) => theme.color.primaryDark};
    font-size: 1.25rem;
    font-weight: 900;
  }
`;
