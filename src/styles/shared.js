
import styled from 'styled-components';
import SPACING from './spacing';
import COLORS from './colors';

export const PageWrapper = styled.div`
  background-color: ${COLORS.blanco};
  min-height: 100dvh; 
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

export const HeaderWrapper = styled.div`
  padding: 16px 16px;
`;

export const ContentContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: ${SPACING.verticalPadding} ${SPACING.horizontalPadding};
  box-sizing: border-box;
  align-self: center;
`;

export const SectionTitle = styled.h3`
  color: ${COLORS.azul};
  font-size: 20px;
  margin-bottom: 16px;
  font-family: 'Laurentian', serif;
`;

export const BalanceTitle = styled.p`
  color: ${COLORS.grisMedio};
  font-size: 16px;
  margin-bottom: 8px;
`;

export const BalanceAmount = styled.h2`
  color: ${COLORS.azul};
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 32px;
  font-family: 'Laurentian', serif;
`;

export const MainSection = styled.main`
  width: 100%;
  justify-content: center;
  padding-bottom: 48px;
`;
