import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SocketProvider } from "./socketProvider.jsx";
import { NotificationProvider } from './context/NotificationContext.jsx';


const currentUserName = localStorage.getItem("queueUserName");
createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <SocketProvider>
    
<NotificationProvider userName={currentUserName}>
  <App />
</NotificationProvider>
  </SocketProvider>
  // </React.StrictMode>
)