import React from 'react';
import styled from 'styled-components';
import COLORS from '../styles/colors';

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

const ErrorIcon = styled.div`
  background-color: ${COLORS.vinoFondo};
  color: ${COLORS.vino};
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
  margin-bottom: 8px;
`;

const ErrorMessage = styled.p`
  font-size: 18px;
  color: ${COLORS.vino};
  font-weight: bold;
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-size: 14px;
  color: ${COLORS.grisMedio};
  margin-bottom: 24px;
`;

const RetryButton = styled.button`
  background-color: ${COLORS.dorado};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
`;

const CancelText = styled.p`
  color: ${COLORS.grisOscuro};
  font-size: 14px;
  margin-top: 16px;
  cursor: pointer;
  text-decoration: underline;
`;

function TransferErrorModal({errorTitle, description, onRetry, onClose }) {
    return (
        <Overlay>
            <ModalContainer>
                <ErrorIcon>✖</ErrorIcon>
                <Title>Transferencia no realizada</Title>
                <ErrorMessage>{errorTitle || "Titulo vacío."}</ErrorMessage>
                <Description>{description || "Descripción vacía."}</Description>
                <RetryButton onClick={onRetry}>Intentar de nuevo</RetryButton>
                <CancelText onClick={onClose}>Cancelar</CancelText>
            </ModalContainer>
        </Overlay>
    );
}

export default TransferErrorModal;
