import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TransactionCard from '../Components/TransactionCard';
import ButtonPrimary from '../Components/ButtonPrimary';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';
import { PageWrapper, ContentContainer, SectionTitle } from '../styles/shared';
import BalanceCard from '../Components/BalanceCard';
import TransferModal from '../Components/TransferModal';
import TransferSuccessModal from '../Components/TransferSuccessModal';
import TransferErrorModal from '../Components/TransferErrorModal';

function DashboardScreen() {
    const navigate = useNavigate();
    const [showTransferModal, setShowTransferModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [transferData, setTransferData] = useState(null);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorDetails, setErrorDetails] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }

        try {
            // ✅ Obtener perfil del usuario
            const profileRes = await fetch('http://localhost:3000/user/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const profileData = await profileRes.json();
            setUserData(profileData);
            console.log("Cuenta del usuario:", profileData.account);

            // ✅ Obtener transacciones si hay cuenta asociada
            const accountId = profileData?.account?.id;
            if (accountId) {
                const txRes = await fetch(`http://localhost:3000/transaction/account/${accountId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const txData = await txRes.json();
                setTransactions(txData);
            }
        } catch (err) {
            console.error("Error al cargar datos:", err);
        }
    };

    const handleTransferSubmit = async (data) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:3000/transaction/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    senderId: userData?.account?.id,
                    ...data
                })
            });

            if (!response.ok) {
                const error = await response.json();

                let errorTitle = "Error en la transferencia";
                let description = error.message || "Ocurrió un error desconocido.";

                const msg = error.message?.toLowerCase() || "";

                if (response.status === 404 && msg.includes("cuenta")) {
                    errorTitle = "Cuenta destino no válida";
                    description = "La cuenta a la que intentas transferir no existe o no está activa.";
                } else if (response.status === 400 && msg.includes("fondos insuficientes")) {
                    errorTitle = "Fondos insuficientes";
                    description = "Tu cuenta no tiene suficiente saldo para realizar esta transferencia.";
                } else if (response.status === 400 && msg.includes("límite diario")) {
                    errorTitle = "Límite diario excedido";
                    description = "Se intentó transferir más de lo permitido por día. Intenta mañana.";
                } else if (response.status === 400 && msg.includes("monto fuera") || msg.includes("monto inválido")) {
                    errorTitle = "Monto inválido";
                    description = "La cantidad debe estar entre $500 y $10,000.";
                } else if (response.status === 400 && msg.includes("propia cuenta")) {
                    errorTitle = "Transferencia inválida";
                    description = "No puedes transferir dinero a tu propia cuenta.";
                }

                setErrorDetails({ errorTitle, description });
                setShowErrorModal(true);
            }
            else {
                const result = await response.json();
                console.log("RESULTADO TRANSFERENCIA:", result); // 👈 confirma los campos aquí
                setTransferData(result);
                setShowSuccessModal(true);
                await fetchData(); // Recargar datos actualizados
            }

        } catch (error) {
            console.log("ENVIANDO A BACKEND:", Number(data.amount));
            console.error("Error de red:", error);
            setErrorDetails({
                errorTitle: "Error de red",
                description: "No se pudo conectar al servidor. Verifica tu conexión."
            });
            setShowErrorModal(true);
        } finally {
            setShowTransferModal(false);
        }
    };

    return (
        <PageWrapper>
            <Header
                userEmail={localStorage.getItem('email') || 'Correo no disponible'}
                onLogout={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    localStorage.removeItem('email');
                    navigate('/');
                }}
            />

            <ContentContainer>
                <BalanceCard
                    balance={userData?.account?.balance || 0}
                    onTransferClick={() => setShowTransferModal(true)}
                    hasAccount={!!userData?.account}
                    accountIsActive={
                        userData?.account?.active === 1 || userData?.account?.active === true
                    }

                />


                <SectionTitle>Transacciones Recientes</SectionTitle>
                {transactions.length === 0 && <p>No hay transacciones recientes.</p>}

                {transactions.map((tx, index) => (
                    <TransactionCard
                        key={index}
                        type={tx.receiverID === userData?.account?.id ? 'recibida' : 'enviada'}
                        name={tx.receiverID === userData?.account?.id ? `De: ${tx.senderID}` : `A: ${tx.receiverID}`}
                        concept={tx.concept}
                        amount={tx.amount}
                        date={new Date(tx.date).toLocaleString()}
                    />
                ))}
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

            {showErrorModal && (
                <TransferErrorModal
                    errorTitle={errorDetails.errorTitle}
                    description={errorDetails.description}
                    onRetry={() => {
                        setShowErrorModal(false);
                        setShowTransferModal(true);
                    }}
                    onClose={() => setShowErrorModal(false)}
                />
            )}
        </PageWrapper>
    );
}

export default DashboardScreen;
