import React from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './components/app'; // Importa tus estilos globales

const container = document.getElementById('tone')
const root = createRoot(container)
root.render(<App />)