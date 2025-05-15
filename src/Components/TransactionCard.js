import React from 'react';
import styled from 'styled-components';
import { BiArrowFromTop, BiArrowFromBottom } from 'react-icons/bi';
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import COLORS from '../styles/colors';

const Card = styled.div`
  display: flex;
  align-items: center;
  background-color: #f7f7f7;
  padding: 16px;
  border-radius: 10px;
  margin-bottom: 12px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  background-color: ${props => props.fondo || '#e0e0e0'};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  color: ${props => props.color || '#133677'};
`;


const Circle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 16px;
  background-color: ${props => props.fondo || '#e0e0e0'};
`;

const TextGroup = styled.div``;

const Title = styled.p`
  font-weight: bold;
  color: #444444;
  margin: 0;
`;

const Detail = styled.p`
  color: #666666;
  font-size: 14px;
  margin: 4px 0 0 0;
`;

function TransactionCard({ type, name, fondo }) {
    const isRecibida = type === 'recibida';

    return (
        <Card>
            <IconWrapper
                fondo={fondo}
                color={isRecibida ? COLORS.verde : COLORS.vino}
            >
                {isRecibida ? <FaArrowDown /> : <FaArrowUp />}
            </IconWrapper>

            <TextGroup>
                <Title>{isRecibida ? 'Transferencia Recibida' : 'Transferencia Enviada'}</Title>
                <Detail>{isRecibida ? `De: ${name}` : `A: ${name}`}</Detail>
            </TextGroup>
        </Card>
    );
}

export default TransactionCard;
