import styled from "styled-components";

export const InvitationList = styled.div`
  display: grid;
  gap: 14px;
`;

export const InvitationCard = styled.article`
  display: grid;
  padding: 24px;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 24px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.color.surface};
  box-shadow: ${({ theme }) => theme.shadow.sm};

  h2 {
    margin-bottom: 8px;
    font-size: 1.18rem;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.color.sub};
    line-height: 1.6;
  }

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;
