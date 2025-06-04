// Import React and hooks
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import components
import Header from '../Components/Header';

// Import styles and constants
import styled from 'styled-components';
import COLORS from '../styles/colors';
import { PageWrapper, ContentContainer, SectionTitle } from '../styles/shared';

// Styled components for table and UI
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
`;

const Tr = styled.tr`
  transition: background 0.2s ease;
  &:hover {
    background-color: ${COLORS.grisClaro};
  }
`;

const Th = styled.th`
  text-align: left;
  padding: 12px 16px;
  background-color: ${COLORS.grisClaro};
  font-weight: 600;
  font-size: 14px;
`;

const Td = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid ${COLORS.grisBorde};
  font-size: 14px;
`;

const StateBadge = styled.span`
  padding: 4px 12px;
  border-radius: 12px;
  background-color: ${props => props.state === 'Activa' ? COLORS.verdeFondo : COLORS.vinoFondo};
  color: ${props => props.state === 'Activa' ? COLORS.verde : COLORS.vino};
  font-weight: bold;
  font-size: 13px;
  
`;

const ActionButton = styled.button`
  background-color: ${({ variant }) =>
        variant === 'danger' ? COLORS.vino :
            variant === 'danger-outline' ? COLORS.blanco :
                variant === 'primary' ? COLORS.dorado :
                    variant === 'primary-outline' ? COLORS.blanco :
                        variant === 'neutral' ? COLORS.azul : COLORS.blanco};

  color: ${({ variant }) =>
        variant === 'danger' || variant === 'primary' ? COLORS.blanco :
            variant === 'danger-outline' ? COLORS.vino :
                variant === 'primary-outline' ? COLORS.dorado :
                    variant === 'neutral' ? COLORS.blanco : COLORS.azul};

  border: ${({ variant }) =>
        variant === 'danger-outline' ? `1px solid ${COLORS.vino}` :
            variant === 'primary-outline' ? `1px solid ${COLORS.dorado}` :
                variant === 'neutral' ? 'none' : `1px solid ${COLORS.grisBorde}`};

  min-width: 110px;
  max-width: 110px;
  text-align: center;
  border-radius: 6px;
  box-sizing: border-box;
  padding: 6px 12px;
  font-size: 14px;
  margin-right: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 110px; /* 👈 Esto también ayuda a mantener consistencia */

  &:hover {
    opacity: 0.85;
    transform: scale(1.03);
  }

  &:active {
    transform: scale(0.97);
    opacity: 0.75;
  }
`;


const BalanceText = styled.span`
  color: ${COLORS.verde};
  font-weight: bold;
`;


const SearchBar = styled.input`
  padding: 8px 12px;
  border: 1px solid ${COLORS.grisBorde};
  border-radius: 6px;
  margin-right: 12px;
  font-size: 14px;
`;

/**
 * AdminDashboardScreen Component
 * ------------------------------
 * Displays all users and their account status.
 * Admin can:
 *  - Block/unblock users
 *  - Activate/deactivate accounts
 *  - Create accounts for users who don't have one
 */
function AdminDashboardScreen() {
    const navigate = useNavigate();

    // Local state
    const [filterText, setFilterText] = useState('');
    const [users, setUsers] = useState([]);

    // Fetch users on initial load
    useEffect(() => {
        fetchUsers();
    }, []);

    /**
    * Fetch all users and their accounts
    */
    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/user/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            setUsers(data.usuarios || []);
        } catch (err) {
            console.error("Error al obtener usuarios:", err);
        }
    };

    /**
    * Filter users based on search input
    */
    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(filterText.toLowerCase()) ||
        user.id.toString().includes(filterText)
    );

    /**
     * handleBlockToggle
     * -----------------
     * Toggles the blocked status of a user by sending a POST request to either
     * /user/block or /user/unlock depending on their current blocked state.
     * 
     * If the user is currently blocked, it will send a request to /user/unlock;
     * otherwise, it will block the user via /user/block.
     * 
     * On success, it refetches the user list to reflect the updated status.
     *
     * @param {number} userId - The ID of the user to block or unblock.
     * @param {boolean} isBlocked - Whether the user is currently blocked.
     */
    const handleBlockToggle = async (userId, isBlocked) => {
        const token = localStorage.getItem('token');
        const endpoint = isBlocked ? '/user/unlock' : '/user/block';

        try {
            await fetch(`http://localhost:3000${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ id: userId })
            });
            fetchUsers(); // Refresh user list
        } catch (err) {
            console.error('Error al bloquear/desbloquear:', err);
        }
    };

    /**
     * handleAccountToggle
     * -------------------
     * Activates or deactivates a user’s bank account by sending a POST request
     * to the appropriate endpoint (/account/activate or /account/deactivate).
     * 
     * The endpoint is determined based on whether the account is currently active.
     * After a successful request, the user list is re-fetched to update the UI.
     *
     * @param {number} accountId - The ID of the account to toggle.
     * @param {boolean} isActive - Whether the account is currently active.
     */
    const handleAccountToggle = async (accountId, isActive) => {
        const token = localStorage.getItem('token');
        const endpoint = isActive ? '/account/deactivate' : '/account/activate';

        try {
            await fetch(`http://localhost:3000${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ accountID: accountId }) // 👈 aquí el cambio
            });
            fetchUsers(); // refresca la tabla
        } catch (err) {
            console.error('Error al activar/desactivar cuenta:', err);
        }
    };

    /**
     * handleAccountToggle
     * -------------------
     * Activates or deactivates a user’s bank account by sending a POST request
     * to the appropriate endpoint (/account/activate or /account/deactivate).
     * 
     * The endpoint is determined based on whether the account is currently active.
     * After a successful request, the user list is re-fetched to update the UI.
     *
     * @param {number} accountId - The ID of the account to toggle.
     * @param {boolean} isActive - Whether the account is currently active.
     */
    const handleCreateAccount = async (userId) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch('http://localhost:3000/account/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userID: userId })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Error al crear cuenta');

            fetchUsers(); // Refresh list
        } catch (err) {
            console.error('Error al crear cuenta:', err);
            alert('No se pudo crear la cuenta. Verifica en consola.');
        }
    };

    // Render the admin dashboard
    return (
        <PageWrapper>
            {/* Header with logout */}
            <Header
                userEmail={localStorage.getItem('email') || 'admin'}
                onLogout={() => navigate('/')}
            />
            <ContentContainer>
                <SectionTitle>Panel de Administración</SectionTitle>

                {/* Search input */}
                <SearchBar
                    placeholder="Buscar por cuenta o nombre..."
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />

                {/* User table */}
                <Table>
                    <thead>
                        <tr>
                            <Th>ID Usuario</Th>
                            <Th>N° Cuenta</Th>
                            <Th>Titular</Th>
                            <Th style={{ width: '100px' }}>Estado</Th>
                            <Th style={{ width: '120px' }}>Cantidad</Th>
                            <Th style={{ width: '260px' }}>Acción</Th>

                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => {
                            const cuenta = user.account;
                            const cuentaActiva = cuenta?.active;
                            const status = user.blocked ? 'Bloqueada' : 'Activa';
                            const balance = cuenta?.balance || 0;

                            return (
                                <Tr key={user.id}>
                                    <Td>{user.id}</Td>
                                    <Td>{cuenta ? cuenta.id : 'Sin cuenta'}</Td>
                                    <Td>{user.email}</Td>
                                    <Td style={{ width: '100px' }}>
                                        <StateBadge state={status}>{status}</StateBadge>
                                    </Td>
                                    <Td style={{ width: '120px' }}><BalanceText>${balance.toFixed(2)}</BalanceText></Td>
                                    <Td style={{ width: '260px', display: 'flex', gap: '8px' }}>
                                        {/* Block/Unblock button */}
                                        <ActionButton
                                            variant={user.blocked ? 'danger-outline' : 'danger'}
                                            onClick={() => handleBlockToggle(user.id, user.blocked)}
                                        >
                                            {user.blocked ? 'Desbloquear' : 'Bloquear'}
                                        </ActionButton>

                                        {/* Create, activate, or deactivate account button */}
                                        {user.account ? (
                                            <ActionButton
                                                variant={user.account.active ? 'primary-outline' : 'primary'}
                                                onClick={() => handleAccountToggle(user.account.id, user.account.active)}
                                            >
                                                {user.account.active ? 'Desactivar' : 'Activar'}
                                            </ActionButton>
                                        ) : (
                                            <ActionButton
                                                variant="neutral"
                                                onClick={() => handleCreateAccount(user.id)}
                                            >
                                                Crear cuenta
                                            </ActionButton>

                                        )}
                                    </Td>


                                </Tr>
                            );
                        })}
                    </tbody>
                </Table>
            </ContentContainer>
        </PageWrapper>
    );
}

export default AdminDashboardScreen;
