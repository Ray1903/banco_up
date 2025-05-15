import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../Components/Header';
import COLORS from '../styles/colors';
import { PageWrapper, ContentContainer, SectionTitle } from '../styles/shared';
import { useNavigate } from 'react-router-dom';
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
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
  background-color: ${props => props.variant === 'danger' ? COLORS.vino :
        props.variant === 'primary' ? COLORS.dorado : COLORS.blanco};
  color: ${props => props.variant === 'danger' || props.variant === 'primary' ? COLORS.blanco : COLORS.grisOscuro};
  border: ${props => props.variant === 'neutral' ? `1px solid ${COLORS.grisBorde}` : 'none'};
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 14px;
  margin-right: 8px;
  cursor: pointer;
`;

const SearchBar = styled.input`
  padding: 8px 12px;
  border: 1px solid ${COLORS.grisBorde};
  border-radius: 6px;
  margin-right: 12px;
  font-size: 14px;
`;

function AdminDashboardScreen() {
    const [filterText, setFilterText] = useState('');

    const accounts = [
        { id: 12345, name: 'Brandon Díaz', status: 'Activa', amount: 45678.9 },
        { id: 15243, name: 'Luis Reyes', status: 'Activa', amount: 12345.67 },
        { id: 11434, name: 'Raymundo Pons', status: 'Bloqueada', amount: 89012.34 },
        { id: 14325, name: 'Roberto Bollain', status: 'Activa', amount: 23456.78 },
        { id: 15623, name: 'Samuel Sanchez', status: 'Activa', amount: 67890.12 }
    ];

    const filteredAccounts = accounts.filter(acc =>
        acc.name.toLowerCase().includes(filterText.toLowerCase()) ||
        acc.id.toString().includes(filterText)
    );
    const navigate = useNavigate();
    return (
        <PageWrapper>
            <Header
                userName="Juan Pérez"
                userEmail="admin@up.edu.mx"
                onLogout={() => navigate('/')}
            />
            <ContentContainer>
                <SectionTitle>Panel de Administración</SectionTitle>

                <SearchBar
                    placeholder="Buscar por cuenta o nombre..."
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />

                <Table>
                    <thead>
                        <tr>
                            <Th>N° Cuenta</Th>
                            <Th>Titular</Th>
                            <Th>Estado</Th>
                            <Th>Cantidad</Th>
                            <Th>Acción</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAccounts.map(acc => (
                            <tr key={acc.id}>
                                <Td>{acc.id}</Td>
                                <Td>{acc.name}</Td>
                                <Td><StateBadge state={acc.status}>{acc.status}</StateBadge></Td>
                                <Td>${acc.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Td>
                                <Td>
                                    {acc.status === 'Bloqueada' ? (
                                        <>
                                            <ActionButton variant="primary">Desbloquear</ActionButton>
                                            <ActionButton variant="neutral">Activar</ActionButton>
                                        </>
                                    ) : (
                                        <>
                                            <ActionButton variant="danger">Bloquear</ActionButton>
                                            <ActionButton variant="neutral">Desactivar</ActionButton>
                                        </>
                                    )}
                                </Td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </ContentContainer>
        </PageWrapper>
    );
}

export default AdminDashboardScreen;
