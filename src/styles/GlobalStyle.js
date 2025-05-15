import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    overflow-x: hidden;
    font-family: 'Seravek', sans-serif;
    background-color: ${props => props.theme?.background || '#f5f5f5'};
  }

  #root {
    height: 100%;
  }
`;

export default GlobalStyle;
