// Unit tests for TransferModal.js
// Tests modal rendering, placeholder visibility, user input behavior, and form submission logic
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TransferModal from '../Components/TransferModal';

describe('TransferModal', () => {
  const onCloseMock = jest.fn();
  const onSubmitMock = jest.fn();

  beforeEach(() => {
    onCloseMock.mockClear();
    onSubmitMock.mockClear();
    console.log('🔄 New test case');
  });

  test('renders modal with correct fields and buttons', () => {
    render(
      <TransferModal
        isOpen={true}
        onClose={onCloseMock}
        onSubmit={onSubmitMock}
      />
    );

    expect(screen.getByText('Nueva Transferencia')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ej. 12345')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('0.00')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ej. Renta, comida, etc.')).toBeInTheDocument();
    expect(screen.getByText('Enviar')).toBeInTheDocument();

    console.log('✅ Modal rendered with correct placeholders and text');
  });

  test('captures input and calls onSubmit', () => {
    render(
      <TransferModal
        isOpen={true}
        onClose={onCloseMock}
        onSubmit={onSubmitMock}
      />
    );

    const cuentaInput = screen.getByPlaceholderText('Ej. 12345');
    const montoInput = screen.getByPlaceholderText('0.00');
    const conceptoInput = screen.getByPlaceholderText('Ej. Renta, comida, etc.');
    const sendBtn = screen.getByText('Enviar');

    fireEvent.change(cuentaInput, { target: { value: '998877' } });
    fireEvent.change(montoInput, { target: { value: '100' } });
    fireEvent.change(conceptoInput, { target: { value: 'Renta' } });

    console.log('✏️ User filled in transfer data');

    fireEvent.click(sendBtn);

    expect(onSubmitMock).toHaveBeenCalledWith({
      recipientAccountNumber: 998877,
      amount: '100.00', // as per `toFixed(2)`
      concept: 'Renta',
    });

    console.log('✅ onSubmit called with correct data');
  });
});
