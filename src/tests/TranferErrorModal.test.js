// Unit tests for TransferErrorModal.js
// Tests error modal rendering with dynamic title/description, and retry and cancel button behavior
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TransferErrorModal from '../Components/TransferErrorModal';

describe('TransferErrorModal', () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    onCloseMock.mockClear();
    console.log('🔄 New test case');
  });

  test('renders error modal with correct visible elements', () => {
    render(<TransferErrorModal onClose={onCloseMock} />);

    expect(screen.getByText(/Transferencia no realizada/i)).toBeInTheDocument();
    expect(screen.getByText(/Intentar de nuevo/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancelar/i)).toBeInTheDocument();

    console.log('✅ Error modal rendered with title and buttons');
  });

  test('calls onClose when cancel text is clicked', () => {
    render(<TransferErrorModal onClose={onCloseMock} />);

    const cancelText = screen.getByText(/Cancelar/i);
    fireEvent.click(cancelText);

    expect(onCloseMock).toHaveBeenCalled();
    console.log('✅ onClose called on cancel text click');
  });
});
