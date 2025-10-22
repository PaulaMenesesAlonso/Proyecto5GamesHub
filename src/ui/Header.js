import { renderGame } from '../main.js'

export function Header() {
  const header = document.createElement('header')
  header.classList.add('main-header')

  header.innerHTML = `
    <h1 class="logo">🎮GamesHub🎮</h1>
    <nav class="nav">
      <ul class="nav-list">
        <li><button class="nav-btn" data-game="tictactoe">Tres en Raya</button></li>
        <li><button class="nav-btn" data-game="memorama">Memorama</button></li>
        <li><button class="nav-btn" data-game="simon">Simon Dice</button></li>
      </ul>
    </nav>
  `

  header.addEventListener('click', (e) => {
    if (e.target.matches('.nav-btn')) {
      const gameName = e.target.dataset.game
      renderGame(gameName)
    }
  })

  return header
}
