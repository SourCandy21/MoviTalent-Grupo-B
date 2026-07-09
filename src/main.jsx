import React from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from './pages/navbar/navbar'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar />
  </React.StrictMode>
)
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CadastroItem from './pages/CadastroItem.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CadastroItem />
  </StrictMode>,
)
