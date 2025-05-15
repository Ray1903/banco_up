import React from 'react';
import styled from 'styled-components';
import COLORS from '../styles/colors';

const Button = styled.button`
  background-color: ${COLORS.dorado};
  color: white;
  border: none;
  padding: 14px 24px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Seravek', sans-serif;
`;

const ButtonPrimary = ({ text, onClick, icon: Icon }) => (
  <Button onClick={onClick}>
    {Icon && <Icon />}
    {text}
  </Button>
);

export default ButtonPrimary;
