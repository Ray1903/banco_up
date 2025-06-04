import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './Screens/LoginScreen';
import DashboardScreen from './Screens/DashboardScreen';
import GlobalStyle from './styles/GlobalStyle';
import AdminDashboardScreen from './Screens/AdminDashboardScreen';

/**
 * App Component
 * -------------
 * Root component that defines application routing.
 *
 * Structure:
 * - Applies global styles.
 * - Sets up React Router with 3 routes:
 *   - "/" → Login screen
 *   - "/dashboard" → User dashboard
 *   - "/admin" → Admin dashboard
 *
 * Purpose:
 * Acts as the entry point for rendering different views based on route.
 */
function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/admin" element={<AdminDashboardScreen />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
