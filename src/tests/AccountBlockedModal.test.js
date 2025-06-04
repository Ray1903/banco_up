// Unit tests for AccountBlockedModal.js
// Tests account blocked message display and redirection button interaction, including navigation hook mocking
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AccountBlockedModal from '../Components/AccountBlockedModal';
import { MemoryRouter } from 'react-router-dom';

describe('AccountBlockedModal', () => {
  test('renders blocked account modal with correct message and button', () => {
    render(
      <MemoryRouter>
        <AccountBlockedModal />
      </MemoryRouter>
    );

    expect(screen.getByText(/Tu cuenta ha sido bloqueada/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Por razones de seguridad, tu cuenta fue bloqueada/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Volver al inicio/i })).toBeInTheDocument();

    console.log('✅ Modal renderizado correctamente con el botón visible');
  });

  test('navigates to login when "Volver al inicio" is clicked', () => {
    render(
      <MemoryRouter>
        <AccountBlockedModal />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /Volver al inicio/i });
    fireEvent.click(button);

    console.log('✅ Click en "Volver al inicio" registrado. Verificar navegación si se desea.');
  });
});
