import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import InputField from '../Components/InputField';
import ButtonPrimary from '../Components/ButtonPrimary';
import COLORS from '../styles/colors';
import { PageWrapper } from '../styles/shared';
import SPACING from '../styles/spacing';
import logoUP from '../Assets/logo_up_icon.jpg';
import { useState } from 'react';

const Box = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  width: 320px;
`;

const Title = styled.h1`
  font-family: 'Laurentian', serif;
  font-weight: bold;
  color: ${COLORS.azul};
  text-align: center;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

const Logo = styled.img`
  width: 48px;
  height: 48px;
`;

function LoginScreen() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    return (
        <PageWrapper style={{ backgroundColor: COLORS.dorado, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box>
                <LogoSection>
                    <Logo src={logoUP} alt="Logo Banco UP" />
                    <Title>Banco UP</Title>
                </LogoSection>
                <InputField
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <InputField placeholder="Contraseña" type="password" />
                <div style={{ marginTop: '16px' }}>
                    <ButtonPrimary
                        text="Iniciar sesión"
                        onClick={() => {
                            if (email.toLowerCase().includes('admin')) {
                                navigate('/admin');
                            } else {
                                navigate('/dashboard');
                            }
                        }}
                    />
                </div>
            </Box>
        </PageWrapper>
    );
}

export default LoginScreen;
