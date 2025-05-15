import React from 'react';
import styled from 'styled-components';
import TransactionCard from '../Components/TransactionCard';
import ButtonPrimary from '../Components/ButtonPrimary';
import { BiTransfer } from 'react-icons/bi';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';
import { PageWrapper, ContentContainer, BalanceTitle, BalanceAmount, SectionTitle, HeaderWrapper, MainSection } from '../styles/shared';
import SPACING from '../styles/spacing';
import BalanceCard from '../Components/BalanceCard';
import { useState } from 'react';
import TransferModal from '../Components/TransferModal';
import TransferSuccessModal from '../Components/TransferSuccessModal';

function DashboardScreen() {
    const navigate = useNavigate();
    const [showTransferModal, setShowTransferModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [transferData, setTransferData] = useState(null);
    const handleTransferSubmit = (data) => {
        setTransferData(data);
        setShowTransferModal(false);
        setShowSuccessModal(true);
    };
    return (
        <PageWrapper>
            <Header
                userName="Luis Reyes"
                userEmail="0246319@up.edu.mx"
                onLogout={() => navigate('/')}
            />

            <ContentContainer>
                <BalanceCard balance={45678.90} onTransferClick={() => setShowTransferModal(true)} />
                <SectionTitle>Transacciones Recientes</SectionTitle>
                <TransactionCard
                    type="recibida"
                    name="María González"
                    fondo="#D2DEDC"
                    concept="Pago de renta"
                    amount={1500}
                    date="Hoy 14:30"
                />
                <TransactionCard
                    type="enviada"
                    name="Carlos Ruiz"
                    fondo="#E6CFD7"
                    concept="Comida"
                    amount={850}
                    date="Ayer 19:15"
                />

            </ContentContainer>
            {showTransferModal && (
                <TransferModal
                    onClose={() => setShowTransferModal(false)}
                    onSubmit={(formData) => handleTransferSubmit(formData)}
                />
            )}

            {showSuccessModal && transferData && (
                <TransferSuccessModal
                    data={transferData}
                    onClose={() => setShowSuccessModal(false)}
                />
            )}

        </PageWrapper>
    );
}


export default DashboardScreen;
