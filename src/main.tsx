import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

window.onerror = (msg, url, line) => {
  const root = document.getElementById('root');
  if (root) root.innerHTML = `<div style="color:white; background:red; padding:20px;">
    <h1>ERRO DETETADO</h1>
    <p>${msg}</p>
    <p>Linha: ${line}</p>
  </div>`;
};

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(<App />);
}
