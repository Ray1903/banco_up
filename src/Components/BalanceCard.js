import React from 'react';
import styled from 'styled-components';
import ButtonPrimary from './ButtonPrimary';
import { BiTransfer } from 'react-icons/bi';
import COLORS from '../styles/colors';

const Card = styled.div`
  background-color: #f7f7f7;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
`;

const Label = styled.p`
  color: ${COLORS.grisMedio};
  font-size: 16px;
  margin-bottom: 8px;
`;

const Amount = styled.h2`
  color: ${COLORS.azul};
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 12px;
  font-family: 'Laurentian', serif;
`;

function BalanceCard({ balance, onTransferClick, accountIsActive, hasAccount }) {
  return (
    <Card>
      {hasAccount && (
        <Label>Saldo Disponible</Label>
      )}
      {hasAccount && (
        <Amount>${balance.toLocaleString()}</Amount>
      )}

      {hasAccount ? (
        accountIsActive ? (
          <ButtonPrimary
            text="Transferir"
            onClick={onTransferClick}
            icon={BiTransfer}
          />
        ) : (
          <p style={{ color: COLORS.vino, fontWeight: 'bold', fontSize: '18px' }}>
            Tu cuenta está desactivada. Contacta con soporte.
          </p>
        )
      ) : (
        <p style={{ color: COLORS.vino, fontWeight: 'bold', fontSize: '18px' }}>
          No tienes una cuenta activa. Contacta con soporte.
        </p>
      )}
    </Card>
  );
}

export default BalanceCard;
