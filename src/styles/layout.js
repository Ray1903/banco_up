import styled from 'styled-components';
import COLORS from './colors';
// ✅ src/styles/layout.js
export const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: ${COLORS.grisClaro};
  padding: 0 48px;
`;

export const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 32px;
`;
