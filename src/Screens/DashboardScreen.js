// React and utility imports
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Component imports
import Header from '../Components/Header';
import TransactionCard from '../Components/TransactionCard';
import ButtonPrimary from '../Components/ButtonPrimary';
import BalanceCard from '../Components/BalanceCard';
import TransferModal from '../Components/TransferModal';
import TransferSuccessModal from '../Components/TransferSuccessModal';
import TransferErrorModal from '../Components/TransferErrorModal';

// Style imports
import { PageWrapper, ContentContainer, SectionTitle } from '../styles/shared';

/**
 * DashboardScreen Component
 * --------------------------
 * Displays the user dashboard with:
 * - Balance card
 * - Transaction history
 * - Transfer modal
 * - Success and error feedback modals
 */
function DashboardScreen() {
    const navigate = useNavigate();

    // UI control states
    const [showTransferModal, setShowTransferModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [transferData, setTransferData] = useState(null);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorDetails, setErrorDetails] = useState({});

    // Data states
    const [transactions, setTransactions] = useState([]);
    const [userData, setUserData] = useState(null);

    // Load user and transaction data on mount
    useEffect(() => {
        fetchData();
    }, []);

    /**
     * fetchData
     * ---------
     * Retrieves the authenticated user's profile and transaction history.
     * 
     * If no token is found in localStorage, it redirects the user to the login page.
     * Otherwise, it:
     * - Fetches the user's profile from the backend.
     * - Checks whether the user has an active bank account.
     * - If yes, fetches all related transactions for display.
     * 
     * This method is automatically called on component mount.
     */

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }

        try {
            // Fetch user profile
            const profileRes = await fetch('http://localhost:3000/user/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const profileData = await profileRes.json();
            setUserData(profileData);
            console.log("Cuenta del usuario:", profileData.account);

            // Fetch transactions if account is available
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

    /**
     * handleTransferSubmit
     * --------------------
     * Handles the money transfer process initiated by the user.
     * 
     * Sends a POST request to the /transaction endpoint with sender and recipient info.
     * Displays:
     * - A success modal with transaction info if the transfer is successful.
     * - A detailed error modal with custom titles and messages depending on backend response,
     *   including invalid accounts, insufficient funds, or daily limit exceeded.
     * 
     * On success, also refreshes the user's balance and transaction list.
     *
     * @param {Object} data - The transfer form data containing amount, receiverID, and concept.
     */
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

                // Custom error messages based on backend response
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
                console.log("RESULTADO TRANSFERENCIA:", result);
                setTransferData(result);
                setShowSuccessModal(true);
                await fetchData(); // Refresh balance and transaction history
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
            {/* Header with logout and email info */}
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
                {/* Balance display with transfer button */}
                <BalanceCard
                    balance={userData?.account?.balance || 0}
                    onTransferClick={() => setShowTransferModal(true)}
                    hasAccount={!!userData?.account}
                    accountIsActive={
                        userData?.account?.active === 1 || userData?.account?.active === true
                    }

                />

                {/* Transaction history */}
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

            {/* Modals for transfer, success, and error */}
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
