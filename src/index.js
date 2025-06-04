import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/**
 * Entry Point (index.js)
 * -----------------------
 * Initializes and renders the root React component (App).
 * Wraps the app with React.StrictMode for highlighting potential issues.
 *
 * Also imports and uses:
 * - index.css: global base styles
 * - reportWebVitals: optional performance monitoring setup
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
