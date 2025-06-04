import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import InputField from '../Components/InputField';
import ButtonPrimary from '../Components/ButtonPrimary';
import COLORS from '../styles/colors';
import { PageWrapper } from '../styles/shared';
import logoUP from '../Assets/logo_up_icon.jpg';
import AccountBlockedModal from '../Components/AccountBlockedModal';

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
  justify-content: center;
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
    const [password, setPassword] = useState('');
    const [showBlockedModal, setShowBlockedModal] = useState(false);
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.trim().toLowerCase(),
                    password: password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                const newAttempts = loginAttempts + 1;
                setLoginAttempts(newAttempts);

                if (response.status === 403 && data.message.includes('bloqueado')) {
                    setShowBlockedModal(true);
                } else {
                    setErrorMessage(`Contraseña inválida. Te quedan ${3 - newAttempts} intento(s).`);
                }
                return;
            }

            setErrorMessage('');
            setLoginAttempts(0);
            // Guardar datos en localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.usuario);
            localStorage.setItem('email', data.correo);

            // Navegación según tipo de usuario
            if (email.toLowerCase().includes('admin')) {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error al conectar con el backend:', error);
            alert('Error de red o del servidor');
        }
    };

    return (
        <PageWrapper
            style={{
                backgroundColor: COLORS.dorado,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
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
                <InputField
                    placeholder="Contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errorMessage && (
                    <p style={{ color: 'red', fontSize: '12px', fontWeight: "bold;" }}>{errorMessage}</p>
                )}

                <div style={{ marginTop: '48px' }}>
                    <ButtonPrimary
                        text="Iniciar sesión"
                        onClick={handleLogin}
                        style={{ width: '100%', marginTop: '24px' }}
                    />
                </div>
            </Box>

            {showBlockedModal && <AccountBlockedModal />}

        </PageWrapper>
    );
}

export default LoginScreen;
