import React from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from './components/navbar/Navbar.jsx'
import CadastroItem from './pages/CadastroItem/CadastroItem.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar />
    <CadastroItem />
  </React.StrictMode>
)
