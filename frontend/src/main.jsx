import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.js'
createRoot(document.getElementById('root')).render(
  <StrictMode>
       <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
