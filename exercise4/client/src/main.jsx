import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import StoreContextProvider from './context/storesContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </React.StrictMode>,
)
