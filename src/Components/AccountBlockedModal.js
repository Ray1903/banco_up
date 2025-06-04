import React from 'react';
import styled from 'styled-components';
import COLORS from '../styles/colors';
import { useNavigate } from 'react-router-dom';

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

const IconCircle = styled.div`
  background-color: ${COLORS.vinoFondo};
  color: ${COLORS.vino};
  font-size: 28px;
  width: 56px;
  height: 56px;
  margin: 0 auto 16px auto;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: ${COLORS.grisOscuro};
  margin-bottom: 12px;
`;

const Highlight = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: ${COLORS.azul};
  margin: 0 0 12px 0;
`;

const Description = styled.p`
  font-size: 14px;
  color: ${COLORS.grisMedio};
  margin-bottom: 24px;
`;

const Button = styled.button`
  background-color: ${COLORS.dorado};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
`;

const HelpText = styled.p`
  color: ${COLORS.grisOscuro};
  font-size: 14px;
  margin-top: 16px;
`;

/**
 * AccountBlockedModal Component
 * -----------------------------
 * A modal displayed when the user's account has been blocked
 * due to too many failed login attempts.
 *
 * Features:
 * - Warning icon and title
 * - Explanation message
 * - Button to reload and return to the homepage
 * - Help text for alternative issues
 *
 * This component overlays the entire screen to grab user attention.
 */
function AccountBlockedModal() {
    const navigate = useNavigate();

    return (
        <Overlay>
            <ModalContainer>
                <IconCircle>?</IconCircle>
                <Title>Tu cuenta ha sido bloqueada</Title>
                <Highlight>Has excedido el número de intentos permitidos.</Highlight>
                <Description>
                    Por razones de seguridad, tu cuenta fue bloqueada. Contacta a un administrador para desbloquearla.
                </Description>
                <Button onClick={() => navigate(0)}>Volver al inicio</Button>
                <HelpText>¿Usaste el correo equivocado?</HelpText>
            </ModalContainer>
        </Overlay>
    );
}

export default AccountBlockedModal;
