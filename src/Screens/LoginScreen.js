// Import React and necessary hooks
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Import custom components and styles
import InputField from '../Components/InputField';
import ButtonPrimary from '../Components/ButtonPrimary';
import COLORS from '../styles/colors';
import { PageWrapper } from '../styles/shared';
import logoUP from '../Assets/logo_up_icon.jpg';
import AccountBlockedModal from '../Components/AccountBlockedModal';

// Styled components for the login screen
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

/**
 * LoginScreen Component
 * ---------------------
 * Handles the login process for users.
 * Includes:
 * - Input fields for email and password
 * - Error handling and attempt tracking
 * - Blocked account modal
 * - Navigation based on user type (admin or regular user)
 */

function LoginScreen() {
    const navigate = useNavigate();

    // State variables for managing login inputs and status
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showBlockedModal, setShowBlockedModal] = useState(false);
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    /**
     * handleLogin
     * -----------
     * Sends a login request to the backend with the entered credentials.
     * 
     * If credentials are invalid:
     * - Increments login attempts.
     * - Displays a remaining attempts warning.
     * - If the account is blocked, shows a special blocked modal.
     * 
     * On success:
     * - Stores the JWT token and user data in localStorage.
     * - Redirects the user to either the admin panel or user dashboard depending on the email.
     */

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

            // Handle incorrect credentials or blocked account
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

            // Reset error state and save token
            setErrorMessage('');
            setLoginAttempts(0);
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.usuario);
            localStorage.setItem('email', data.correo);

            // Navigate based on user role
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
                {/* Logo and Title */}
                <LogoSection>
                    <Logo src={logoUP} alt="Logo Banco UP" />
                    <Title>Banco UP</Title>
                </LogoSection>

                {/* Input Fields */}
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

                {/* Error message */}
                {errorMessage && (
                    <p style={{ color: 'red', fontSize: '12px', fontWeight: "bold;" }}>{errorMessage}</p>
                )}

                {/* Login Button */}
                <div style={{ marginTop: '48px' }}>
                    <ButtonPrimary
                        text="Iniciar sesión"
                        onClick={handleLogin}
                        style={{ width: '100%', marginTop: '24px' }}
                    />
                </div>
            </Box>

            {/* Account Blocked Modal */}
            {showBlockedModal && <AccountBlockedModal />}

        </PageWrapper>
    );
}

export default LoginScreen;
