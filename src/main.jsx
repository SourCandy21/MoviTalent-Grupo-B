import React from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from './pages/navbar/navbar'
import CadastroItem from './pages/CadastroItem.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar />
    <CadastroItem />
  </React.StrictMode>
)
