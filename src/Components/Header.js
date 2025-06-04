import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import logoUP from '../Assets/logo_up_icon.jpg';
import COLORS from '../styles/colors';
import SPACING from '../styles/spacing';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: ${COLORS.blanco};
  padding: 16px ${SPACING.horizontalPadding};
  padding-top: 36px;
  padding-bottom: 24px;
  border-radius: 8px;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Logo = styled.img`
  width: 32px;
  height: 32px;
`;

const BankName = styled.h3`
  font-family: 'Laurentian', serif;
  color: ${COLORS.azul};
  font-size: 20px;
`;

const UserSection = styled.div`
  position: relative;
`;

const UserName = styled.button`
  background: none;
  border: none;
  color: ${COLORS.azul};
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Dropdown = styled.div`
  position: absolute;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
  padding: 16px;
  margin-top: 8px;
  z-index: 10;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: ${COLORS.vino};
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
`;

function Header({ userEmail, onLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <HeaderContainer>
      <LogoSection>
        <Logo src={logoUP} alt="Logo Banco UP" />
        <BankName>Banco UP</BankName>
      </LogoSection>

      <UserSection>
        <UserName onClick={() => setOpen(!open)}>
          <FaUserCircle size={32} color="#b49353" />
          {userEmail || 'Correo no disponible'}
          <FaChevronDown />
        </UserName>
        {open && (
          <Dropdown>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
              ID: {userEmail?.split('@')[0] || 'Usuario'}
            </p>

            <hr style={{ margin: '12px 0' }} />
            <LogoutButton onClick={onLogout}>
              <FaSignOutAlt />
              Cerrar sesión
            </LogoutButton>
          </Dropdown>
        )}
      </UserSection>
    </HeaderContainer>
  );
}

export default Header;
