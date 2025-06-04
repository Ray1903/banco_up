// Unit tests for TransactionCard.js
// Tests transaction detail rendering (type, name, concept, amount, date), with both 'recibida' and 'enviada' types
import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionCard from '../Components/TransactionCard';

describe('TransactionCard', () => {
  const baseProps = {
    name: 'Luis Reyes',
    concept: 'Pago de renta',
    amount: 1250.75,
    date: '2025-06-05T18:30:00Z',
  };

  beforeEach(() => {
    console.log('🔄 Starting a new TransactionCard test case');
  });

    test('renders received transaction correctly', () => {
    render(<TransactionCard {...baseProps} type="recibida" />);

        expect(screen.getByText(/Transferencia Recibida/i)).toBeInTheDocument();
        expect(screen.getByText('Luis Reyes')).toBeInTheDocument();
        expect(screen.getByText(/Concepto: Pago de renta/i)).toBeInTheDocument();
        expect(screen.getByText(/\+\$1250\.75/)).toBeInTheDocument();
        expect(screen.getByText('Thu, 05 Jun 2025 18:30:00 GMT')).toBeInTheDocument();

        console.log('✅ Received transaction rendered correctly');
    });


  test('renders sent transaction correctly', () => {
    render(<TransactionCard {...baseProps} type="enviada" />);

    expect(screen.getByText(/Transferencia Enviada/i)).toBeInTheDocument();
    expect(screen.getByText('Luis Reyes')).toBeInTheDocument();
    expect(screen.getByText(/Concepto: Pago de renta/i)).toBeInTheDocument();
    expect(screen.getByText(/-\$1250\.75/)).toBeInTheDocument();
    expect(screen.getByText('Thu, 05 Jun 2025 18:30:00 GMT')).toBeInTheDocument();


    console.log('✅ Sent transaction rendered correctly');
  });

  test('hides concept if not provided', () => {
    render(<TransactionCard {...baseProps} type="recibida" concept={undefined} />);
    expect(screen.queryByText(/Concepto:/i)).not.toBeInTheDocument();
    console.log('✅ Concept is hidden when not provided');
  });
});
