import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    min-width: 320px;
    background: ${({ theme }) => theme.color.background};
  }

  body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
    color: ${({ theme }) => theme.color.ink};
    background:
      radial-gradient(circle at 8% 0%, rgba(255, 214, 107, 0.22), transparent 28rem),
      ${({ theme }) => theme.color.background};
    font-family: ${({ theme }) => theme.font};
    -webkit-font-smoothing: antialiased;
  }

  button, input, textarea, select {
    font: inherit;
  }

  button, a {
    -webkit-tap-highlight-color: transparent;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  h1, h2, h3, p {
    margin-top: 0;
  }

  :focus-visible {
    outline: 3px solid rgba(246, 95, 67, 0.28);
    outline-offset: 2px;
  }
`;
