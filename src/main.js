// src/main.js
import './styles/base.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/games.css'

import { Header } from './ui/Header.js'
import { ScoreBar } from './ui/ScoreBar.js'
import { Footer } from './ui/Footer.js'
import { navigate } from './core/router.js'

const app = document.querySelector('#app')
const main = document.createElement('main')
main.id = 'game-root'

app.append(Header(), ScoreBar(), main, Footer())

// 🔮 Función para renderizar un juego en el main
export async function renderGame(gameName) {
  main.innerHTML = '<p class="loading">Cargando juego...</p>'
  try {
    const init = await navigate(gameName)
    main.innerHTML = ''
    init(main) // el juego inyecta su propio contenido
  } catch (err) {
    console.error(err)
    main.innerHTML = '<p class="error">Error al cargar el juego.</p>'
  }
}

// 🚀 Carga inicial (Tres en Raya)
renderGame('tictactoe')
