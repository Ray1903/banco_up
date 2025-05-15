import React, { useState } from 'react';
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
  padding: 32px;
  border-radius: 8px;
  width: 400px;
  position: relative;
`;

const Title = styled.h2`
  font-family: 'Laurentian', serif;
  font-size: 24px;
  font-weight: bold;
  margin-top: 0;
  color: ${COLORS.grisOscuro};
`;

const Label = styled.label`
  font-family: 'Seravek', sans-serif;
  font-size: 16px;
  color: ${COLORS.grisOscuro};
  margin-top: 16px;
  display: block;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid ${COLORS.grisBorde};
  border-radius: 8px;
  font-family: 'Seravek', sans-serif;
  font-size: 16px;
  box-sizing: border-box;

  -moz-appearance: textfield;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const StyledCurrencyInput = styled(StyledInput)`
  padding-left: 32px;
`;

const CurrencyInputWrapper = styled.div`
  position: relative;
  margin-top: 4px;
`;

const CurrencySymbol = styled.span`
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  font-family: 'Seravek', sans-serif;
  font-size: 16px;
  color: ${COLORS.grisMedio};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 24px;
`;

const CancelButton = styled.button`
  background: white;
  color: ${COLORS.grisOscuro};
  border: 1px solid ${COLORS.grisBorde};
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Seravek', sans-serif;
`;

const SubmitButton = styled.button`
  background: ${COLORS.dorado};
  color: white;
  border: none;
  padding: 0 24px;
  height: 48px;
  border-radius: 8px;
  font-family: 'Seravek', sans-serif;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 20px;
  right: 24px;
  font-size: 20px;
  cursor: pointer;
  color: ${COLORS.grisOscuro};
`;

// Componente funcional
function TransferModal({ onClose, onSubmit }) {
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [concept, setConcept] = useState('');

  const handleSubmit = () => {
    if (!account || isNaN(account)) {
      alert('Por favor ingresa un número de cuenta válido.');
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert('El monto debe ser un número positivo.');
      return;
    }

    onSubmit({
      accountNumber: account,
      amount: parseFloat(amount).toFixed(2),
      concept,
      date: new Date().toLocaleString()
    });
  };

  return (
    <Overlay>
      <ModalContainer>
        <CloseIcon onClick={onClose}>×</CloseIcon>
        <Title>Nueva Transferencia</Title>

        <Label>Número de cuenta</Label>
        <StyledInput
          type="number"
          placeholder="Ej. 12345"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />

        <Label>Monto</Label>
        <CurrencyInputWrapper>
          <CurrencySymbol>$</CurrencySymbol>
          <StyledCurrencyInput
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </CurrencyInputWrapper>

        <Label>Concepto (opcional)</Label>
        <StyledInput
          type="text"
          placeholder="Ej. Renta, comida, etc."
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
        />

        <ButtonGroup>
          <CancelButton onClick={onClose}>Cancelar</CancelButton>
          <SubmitButton onClick={handleSubmit}>Enviar</SubmitButton>
        </ButtonGroup>
      </ModalContainer>
    </Overlay>
  );
}

export default TransferModal;
