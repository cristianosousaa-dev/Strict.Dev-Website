import React from 'react';
import ReactDOM from 'react-dom/client';
import { hydrateRoot } from 'react-dom/client';
import App from '../App';
import '../styles/globals.css';
import { initWebVitals, logPerformanceSummary } from '../utils/webVitals';

// Initialize Web Vitals tracking
if (typeof window !== 'undefined') {
  // Track Core Web Vitals
  initWebVitals();

  // Log performance summary on load (development only)
  window.addEventListener('load', () => {
    // Small delay to ensure all metrics are captured
    setTimeout(() => {
      logPerformanceSummary();
    }, 0);
  });
}

const rootElement = document.getElementById('root')!;

// Se o HTML já foi pré-renderizado (react-snap), usa hydrate
// Senão, usa createRoot (dev mode)
if (rootElement.hasChildNodes()) {
  hydrateRoot(
    rootElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}