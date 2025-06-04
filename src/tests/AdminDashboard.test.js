// Unit tests for AdminDashboardScreen.js
// Tests admin panel rendering, search input and table headers, and logout behavior with localStorage cleanup
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminDashboardScreen from '../Screens/AdminDashboardScreen';
import { MemoryRouter } from 'react-router-dom';

console.log('🔄 Starting AdminDashboardScreen tests');

jest.mock('../Components/Header', () => (props) => (
  <button onClick={props.onLogout}>{props.userEmail}</button>
));

describe('AdminDashboardScreen', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ email: 'admin@test.com', role: 'admin' }));
    console.log('🧪 Test environment prepared');
  });

  afterEach(() => {
    localStorage.clear();
    console.log('🧼 Local storage cleared after test');
  });

  test('renders admin panel title', () => {
    render(
      <MemoryRouter>
        <AdminDashboardScreen />
      </MemoryRouter>
    );
    expect(screen.getByText(/panel de administración/i)).toBeInTheDocument();
    console.log('✅ Admin panel title rendered');
  });

  test('renders search input and user table headers', () => {
    render(
      <MemoryRouter>
        <AdminDashboardScreen />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText(/buscar por cuenta o nombre/i);
    expect(searchInput).toBeInTheDocument();
    console.log('✅ Search input rendered');

    expect(screen.getByText(/id usuario/i)).toBeInTheDocument();
    expect(screen.getByText(/n° cuenta/i)).toBeInTheDocument();
    expect(screen.getByText(/titular/i)).toBeInTheDocument();
    expect(screen.getByText(/estado/i)).toBeInTheDocument();
    expect(screen.getByText(/cantidad/i)).toBeInTheDocument();
    expect(screen.getByText(/acción/i)).toBeInTheDocument();
    console.log('✅ Table headers rendered');
  });

    test('logout button clears localStorage and stays on page (placeholder behavior)', async () => {
    localStorage.setItem('user', JSON.stringify({ email: 'admin@test.com', role: 'admin' }));
    localStorage.setItem('email', 'admin@test.com');
    localStorage.setItem('token', '1234');

    render(
        <MemoryRouter>
        <AdminDashboardScreen />
        </MemoryRouter>
    );

    const logoutBtn = screen.getByRole('button', { name: /admin@test.com/i });
    fireEvent.click(logoutBtn);
    console.log('🧪 Logout button clicked');

    await waitFor(() => {
        expect(localStorage.getItem('user')).toBeNull();
        expect(localStorage.getItem('token')).toBeNull();
        expect(localStorage.getItem('email')).toBeNull();
        console.log('✅ Local storage cleared on logout');
    });
    });

});
