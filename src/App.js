import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './Screens/LoginScreen';
import DashboardScreen from './Screens/DashboardScreen';
import GlobalStyle from './styles/GlobalStyle';
import AdminDashboardScreen from './Screens/AdminDashboardScreen';

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
