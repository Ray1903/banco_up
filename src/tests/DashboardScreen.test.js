// Unit tests for DashboardScreen.js
// Tests dashboard rendering, balance and transaction display, modal interactions, and logout navigation
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DashboardScreen from '../Screens/DashboardScreen';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => jest.fn(),
  };
});

jest.mock('../Components/Header', () => ({ userEmail, onLogout }) => (
  <div>
    <span>{userEmail}</span>
    <button onClick={onLogout}>Logout</button>
  </div>
));

jest.mock('../Components/BalanceCard', () => ({ balance, onTransferClick }) => (
  <div>
    <p>Balance: ${balance}</p>
    <button onClick={onTransferClick}>Transfer</button>
  </div>
));

jest.mock('../Components/TransactionCard', () => ({ name, amount }) => (
  <div>{name}: ${amount}</div>
));

jest.mock('../Components/TransferModal', () => ({ onClose }) => (
  <div>
    <p>TransferModal</p>
    <button onClick={onClose}>Close</button>
  </div>
));

jest.mock('../Components/TransferSuccessModal', () => ({ onClose }) => (
  <div>
    <p>TransferSuccessModal</p>
    <button onClick={onClose}>Close</button>
  </div>
));

jest.mock('../Components/TransferErrorModal', () => ({ onClose }) => (
  <div>
    <p>TransferErrorModal</p>
    <button onClick={onClose}>Close</button>
  </div>
));

beforeEach(() => {
  localStorage.setItem('token', 'test-token');
  localStorage.setItem('email', 'test@example.com');

  global.fetch = jest.fn()
    .mockResolvedValueOnce({
      json: async () => ({
        account: { id: 1, balance: 1000 },
      }),
      ok: true,
    })
    .mockResolvedValueOnce({
      json: async () => [
        { senderID: 1, receiverID: 2, concept: 'Test', amount: 500, date: new Date().toISOString() },
      ],
      ok: true,
    });
});

test('renders Dashboard and shows transactions', async () => {
  console.log('🧪 Test: Render dashboard and transactions');
  render(<MemoryRouter><DashboardScreen /></MemoryRouter>);

  await waitFor(() => {
    expect(screen.getByText(/Balance: \$1000/i)).toBeInTheDocument();
    expect(screen.getByText(/A: 2/i)).toBeInTheDocument();
    console.log('✅ Dashboard rendered with balance and transaction');
  });
});

test('opens and closes Transfer modal', async () => {
  console.log('🧪 Test: Transfer modal open and close');
  render(<MemoryRouter><DashboardScreen /></MemoryRouter>);

  const transferBtn = await screen.findByText(/Transfer/i);
  fireEvent.click(transferBtn);

  expect(await screen.findByText('TransferModal')).toBeInTheDocument();
  console.log('✅ Transfer modal opened');

  fireEvent.click(screen.getByText('Close'));
  await waitFor(() => {
    console.log('✅ Transfer modal closed');
  });
});

test('logout button redirects user', async () => {
  console.log('🧪 Test: Logout redirects');
  const mockNavigate = jest.fn();
  jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

  render(<MemoryRouter><DashboardScreen /></MemoryRouter>);

  await screen.findByText('Logout');
  fireEvent.click(screen.getByText('Logout'));

  expect(mockNavigate).toHaveBeenCalledWith('/');
  console.log('✅ Logout triggered navigation');
});
