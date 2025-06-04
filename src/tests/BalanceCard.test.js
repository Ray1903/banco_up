// Unit tests for BalanceCard.js
// Tests balance display logic for accounts that are active, inactive, or missing, and conditional button rendering
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BalanceCard from '../Components/BalanceCard';

describe('BalanceCard', () => {
  const mockBalance = 12345.67;
  const onTransferClickMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders balance card with balance and transfer button if account is active', () => {
    render(
      <BalanceCard
        balance={mockBalance}
        onTransferClick={onTransferClickMock}
        hasAccount={true}
        accountIsActive={true}
      />
    );

    expect(screen.getByText(/Saldo Disponible/i)).toBeInTheDocument();
    expect(screen.getByText(/\$12,345.67/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Transferir/i })).toBeInTheDocument();

    console.log('✅ Renders balance and active transfer button');
  });

  test('shows warning if account is inactive', () => {
    render(
      <BalanceCard
        balance={mockBalance}
        onTransferClick={onTransferClickMock}
        hasAccount={true}
        accountIsActive={false}
      />
    );

    expect(screen.getByText(/Tu cuenta está desactivada/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Transferir/i })).not.toBeInTheDocument();

    console.log('✅ Shows inactive account warning');
  });

  test('shows warning if user has no account', () => {
    render(
      <BalanceCard
        balance={mockBalance}
        onTransferClick={onTransferClickMock}
        hasAccount={false}
        accountIsActive={false}
      />
    );

    expect(screen.getByText(/No tienes una cuenta activa/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Transferir/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/Saldo Disponible/i)).not.toBeInTheDocument();

    console.log('✅ Shows no account warning');
  });

  test('calls onTransferClick when button is clicked', () => {
    render(
      <BalanceCard
        balance={mockBalance}
        onTransferClick={onTransferClickMock}
        hasAccount={true}
        accountIsActive={true}
      />
    );

    const transferButton = screen.getByRole('button', { name: /Transferir/i });
    fireEvent.click(transferButton);

    expect(onTransferClickMock).toHaveBeenCalledTimes(1);
    console.log('✅ onTransferClick triggered correctly');
  });
});
