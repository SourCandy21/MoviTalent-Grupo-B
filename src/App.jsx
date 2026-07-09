import { useState } from 'react'
import logo from './assets/logo.png'
import './App.css'
<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
</style>

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section className="Navbar">
        <div className="nav-container">

          <div className="nome-site">
          <p>Nome do Site</p>
          </div>


          <nav className="nav-menu">

            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>

          </nav>

        </div>
      </section>
    </>
  )
}

export default App
