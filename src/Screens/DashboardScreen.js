import React from 'react';
import styled from 'styled-components';
import TransactionCard from '../Components/TransactionCard';
import ButtonPrimary from '../Components/ButtonPrimary';
import { BiTransfer } from 'react-icons/bi';

const Container = styled.div`
  padding: 32px;
  max-width: 600px;
  margin: 0 auto;
`;

const BalanceTitle = styled.p`
  color: #666666;
  font-size: 16px;
  margin-bottom: 8px;
`;

const BalanceAmount = styled.h2`
  color: #133677;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 32px;
`;

const SectionTitle = styled.h3`
  color: #133677;
  font-size: 20px;
  margin-bottom: 16px;
`;

function DashboardScreen() {
    return (
        <Container>
            <BalanceTitle>Saldo Disponible</BalanceTitle>
            <BalanceAmount>$45,678.90</BalanceAmount>
            <ButtonPrimary text="Transferir" onClick={() => alert('Funcionalidad en construcción')} icon={BiTransfer} />

            <SectionTitle>Transacciones Recientes</SectionTitle>
            <TransactionCard
                type="recibida"
                name="María González"
                fondo="#D2DEDC"
            />
            <TransactionCard
                type="enviada"
                name="Carlos Ruiz"
                fondo="#E6CFD7"
            />
        </Container>
    );
}

export default DashboardScreen;
