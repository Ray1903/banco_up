import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import InputField from '../Components/InputField';
import ButtonPrimary from '../Components/ButtonPrimary';


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #b49353;
  height: 100vh;
`;

const Box = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  width: 320px;
`;

const Title = styled.h1`
  font-family: 'Laurentian', serif;
  font-weight: bold;
  color: #133677;
  text-align: center;
  margin-bottom: 24px;
`;

const Paragraph = styled.p`
  font-family: 'Seravek', sans-serif;
`;


function LoginScreen() {
    const navigate = useNavigate();

    return (
        <Container>
            <Box>
                <Title>Banco UP</Title>
                <InputField placeholder="Correo electrónico" />
                <InputField placeholder="Contraseña" type="password" />
                <div style={{ marginTop: '16px' }}>
                    <ButtonPrimary text="Iniciar sesión" onClick={() => navigate('/dashboard')} />
                </div>

            </Box>
        </Container>
    );
}

export default LoginScreen;
