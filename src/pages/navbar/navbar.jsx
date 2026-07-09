import { useState } from 'react'
import './App.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <section className="Navbar">
      <div className="nav-container">
        <nav className="nav-menu" aria-label="Menu principal">
          <button
            type="button"
            className={`menu-toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            <span />
            <span />
            <span />
          </button>

          <div className={`menu-panel ${menuOpen ? 'open' : ''}`}>
            <ul>
              <li><a href="#home">Home</a></li>
              <hr />
              <li><a href="#sobre">Sobre</a></li>
              <hr />
              <li><a href="#contato">Contato</a></li>
            </ul>
          </div>
        </nav>

        <div className="nome-site">
          <p>Nome do Site</p>
        </div>
      </div>
    </section>
  )
}

export default Navbar
