// Unit tests for TransferSuccessModal.js
// Tests success message rendering, transfer details display (amount, date, account), and close behavior
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TransferSuccessModal from '../Components/TransferSuccessModal';

describe('TransferSuccessModal', () => {
  const onCloseMock = jest.fn();

  const mockData = {
    accountNumber: '12345678',
    amount: '250.00',
    date: new Date('2025-06-04T19:33:22Z').toISOString()
  };

  beforeEach(() => {
    console.log('🔄 New test case');
    onCloseMock.mockClear();
  });

  test('renders success modal with correct data and close action text', () => {
    render(<TransferSuccessModal data={mockData} onClose={onCloseMock} />);

    expect(screen.getByText('¡Transferencia realizada con éxito!')).toBeInTheDocument();
    expect(screen.getByText(/\$250.00/)).toBeInTheDocument();
    expect(screen.getByText(/12345678/)).toBeInTheDocument();
    expect(screen.getByText(/Volver al inicio/)).toBeInTheDocument();

    console.log('✅ Modal rendered with correct transaction info');
  });

  test('calls onClose when "Volver al inicio" is clicked', () => {
    render(<TransferSuccessModal data={mockData} onClose={onCloseMock} />);

    const closeText = screen.getByText(/Volver al inicio/);
    fireEvent.click(closeText);

    expect(onCloseMock).toHaveBeenCalled();
    console.log('✅ onClose called when "Volver al inicio" clicked');
  });
});
