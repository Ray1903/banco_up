import React from 'react';
import styled from 'styled-components';
import { BiArrowFromTop, BiArrowFromBottom } from 'react-icons/bi';
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import COLORS from '../styles/colors';

const Card = styled.div`
  display: flex;
  align-items: center;
  background-color: ${COLORS.grisClaro};
  padding: 16px;
  border-radius: 10px;
  margin-bottom: 12px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  background-color: ${props => props.fondo || COLORS.grisBorde};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  color: ${props => props.color || COLORS.azul};
`;


const Circle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 16px;
  background-color: ${props => props.fondo || COLORS.grisBorde};
`;

const TextGroup = styled.div``;

const Title = styled.p`
  font-weight: bold;
  color: ${COLORS.grisOscuro};
  margin: 0;
`;

const Detail = styled.p`
  color: ${COLORS.grisMedio};
  font-size: 14px;
  margin: 4px 0 0 0;
`;

const RightInfo = styled.div`
  margin-left: auto;
  text-align: right;
`;

const Amount = styled.p`
  color: ${props => props.color};
  font-weight: bold;
  font-family: 'Seravek', sans-serif;
  margin: 0;
`;

const DateText = styled.p`
  font-size: 12px;
  color: #888888;
  margin: 4px 0 0 0;
  font-family: 'Seravek', sans-serif;
`;


function TransactionCard({ type, name, fondo, concept, amount, date }) {
    const isRecibida = type === 'recibida';
    const colorMonto = isRecibida ? COLORS.verde : COLORS.vino;
    const signo = isRecibida ? '+' : '-';

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
                {concept && <Detail>Concepto: {concept}</Detail>}
            </TextGroup>
            <RightInfo>
                <Amount color={colorMonto}>
                    {signo}€{amount.toFixed(2)}
                </Amount>
                <DateText>{date}</DateText>
            </RightInfo>
        </Card>
    );
}


export default TransactionCard;
