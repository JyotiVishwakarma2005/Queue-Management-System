import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SocketProvider } from "./socketProvider.jsx";
import React from 'react';

createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  // </React.StrictMode>
)