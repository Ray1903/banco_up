// src/styles/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Seravek', sans-serif;
    background-color: #ffffff;
  }

  h1, h2, h3, h4, h5 {
    font-family: 'Laurentian', serif;
  }
`;

export default GlobalStyle;
