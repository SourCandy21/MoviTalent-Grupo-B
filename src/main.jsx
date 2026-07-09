import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CadastroItem from './pages/CadastroItem.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CadastroItem />
  </StrictMode>,
)
