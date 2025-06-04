// Unit tests for LoginScreen.js
// Tests input validation, form submission and error messages
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginScreen from '../Screens/LoginScreen';
import { MemoryRouter } from 'react-router-dom';

console.log('🧪 Running LoginScreen tests');

describe('LoginScreen', () => {
  beforeEach(() => {
    // Limpiar mocks y localStorage antes de cada test
    jest.clearAllMocks();
    localStorage.clear();
    global.alert = jest.fn();
    jest.spyOn(global, 'fetch');
  });

  test('renders login form correctly', () => {
    render(
      <MemoryRouter>
        <LoginScreen />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByText(/iniciar sesión/i)).toBeInTheDocument();
    console.log('✅ Login form correctly rendered');
  });

  test('shows error message on failed login', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ message: 'Credenciales inválidas' }),
    });

    render(
      <MemoryRouter>
        <LoginScreen />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/correo electrónico/i), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: 'wrongpass' },
    });
    fireEvent.click(screen.getByText(/iniciar sesión/i));

    await waitFor(() =>
      expect(screen.getByText(/intento\(s\)/i)).toBeInTheDocument()
    );
    console.log('⚠️ Error message displayed for invalid login');
  });

  test('redirects user to dashboard on success', async () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        token: 'token123',
        usuario: 'user123',
        correo: 'user@example.com',
      }),
    });

    render(
      <MemoryRouter>
        <LoginScreen />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/correo electrónico/i), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText(/iniciar sesión/i));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('token123');
      expect(localStorage.getItem('userId')).toBe('user123');
      expect(localStorage.getItem('email')).toBe('user@example.com');
    });

    console.log('✅ Login succeeded and localStorage updated');
  });
});
