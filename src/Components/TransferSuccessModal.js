import React from 'react';
import styled from 'styled-components';
import COLORS from '../styles/colors';

// Estilos
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  width: 420px;
  text-align: center;
  font-family: 'Seravek', sans-serif;
`;

const SuccessIcon = styled.div`
  background-color: ${COLORS.verde};
  color: white;
  font-size: 32px;
  width: 56px;
  height: 56px;
  margin: 0 auto 16px auto;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h3`
  font-size: 20px;
  color: ${COLORS.grisOscuro};
  margin-bottom: 16px;
`;

const Amount = styled.h2`
  color: ${COLORS.dorado};
  font-size: 32px;
  margin: 8px 0;
`;

const Info = styled.p`
  font-size: 16px;
  color: ${COLORS.grisMedio};
  margin: 4px 0;
`;

const Button = styled.button`
  background-color: ${COLORS.verde};
  color: white;
  border: none;
  padding: 12px 24px;
  margin-top: 24px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
`;

const LinkText = styled.p`
  color: ${COLORS.grisOscuro};
  font-size: 14px;
  margin-top: 16px;
  cursor: pointer;
  text-decoration: underline;
`;

/**
 * TransferSuccessModal Component
 * ------------------------------
 * Confirmation modal shown after a successful transfer.
 *
 * Props:
 * - data: object containing transfer details:
 *   - accountNumber: recipient account
 *   - amount: transferred amount
 *   - date: timestamp of the transaction
 * - onClose: function triggered when user wants to close the modal.
 *
 * Features:
 * - Displays success icon and message.
 * - Shows transaction details: amount, destination, and date.
 * - Option to return to home or dashboard.
 */
function TransferSuccessModal({ data, onClose }) {
  console.log("DATA DEL MODAL:", data);
  const { accountNumber, amount, date } = data;
  const fecha = isNaN(new Date(date)) ? 'Fecha inválida' : new Date(date).toUTCString();

  return (
    <Overlay>
      <ModalContainer>
        <SuccessIcon>✔</SuccessIcon>
        <Title>¡Transferencia realizada con éxito!</Title>
        <Amount>${amount}</Amount>
        <Info>Tu dinero fue enviado correctamente a la cuenta {accountNumber}</Info>
        <Info>Fecha: {fecha}</Info>
        <LinkText onClick={onClose}>Volver al inicio</LinkText>
      </ModalContainer>
    </Overlay>
  );
}

export default TransferSuccessModal;
