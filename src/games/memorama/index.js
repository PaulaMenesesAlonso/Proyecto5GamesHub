import { generateCards } from './logic.js'
import { updateScores, getScores } from '../../core/storage.js'

export default function init(root) {
  const section = document.createElement('section')
  section.classList.add('memorama')

  const title = document.createElement('h2')
  title.textContent = '🧩 Memorama'

  const grid = document.createElement('div')
  grid.classList.add('mem-grid')

  const movesDisplay = document.createElement('p')
  const timeDisplay = document.createElement('p')

  const resetBtn = document.createElement('button')
  resetBtn.textContent = '🔄 Reiniciar'
  resetBtn.classList.add('reset-btn')
  resetBtn.addEventListener('click', startGame)

  section.append(title, movesDisplay, timeDisplay, grid, resetBtn)
  root.appendChild(section)

  let cards = []
  let flipped = []
  let moves = 0
  let startTime
  let timerInterval

  startGame()

  function startGame() {
    clearInterval(timerInterval)
    cards = generateCards()
    flipped = []
    moves = 0
    grid.innerHTML = ''
    movesDisplay.textContent = `Movimientos: 0`
    timeDisplay.textContent = `Tiempo: 0s`

    startTime = Date.now()
    timerInterval = setInterval(updateTime, 1000)

    cards.forEach((icon, i) => {
      const card = document.createElement('button')
      card.classList.add('card')
      card.dataset.icon = icon
      card.addEventListener('click', () => flipCard(card))
      grid.appendChild(card)
    })
  }

  function updateTime() {
    const seconds = Math.floor((Date.now() - startTime) / 1000)
    timeDisplay.textContent = `Tiempo: ${seconds}s`
  }

  function flipCard(card) {
    if (
      flipped.length === 2 ||
      card.classList.contains('matched') ||
      card.classList.contains('flipped')
    )
      return

    card.classList.add('flipped')
    card.textContent = card.dataset.icon
    flipped.push(card)

    if (flipped.length === 2) {
      moves++
      movesDisplay.textContent = `Movimientos: ${moves}`
      checkMatch()
    }
  }

  function checkMatch() {
    const [a, b] = flipped
    if (a.dataset.icon === b.dataset.icon) {
      a.classList.add('matched')
      b.classList.add('matched')
      flipped = []
      if (document.querySelectorAll('.matched').length === cards.length)
        endGame()
    } else {
      setTimeout(() => {
        a.classList.remove('flipped')
        b.classList.remove('flipped')
        a.textContent = ''
        b.textContent = ''
        flipped = []
      }, 800)
    }
  }

  function endGame() {
    clearInterval(timerInterval)
    const totalTime = Math.floor((Date.now() - startTime) / 1000)
    timeDisplay.textContent = `Tiempo: ${totalTime}s — ¡Completado! 🎉`

    updateScores((scores) => {
      if (!scores.memorama.bestTime || totalTime < scores.memorama.bestTime) {
        scores.memorama.bestTime = totalTime
      }
      if (!scores.memorama.fewestMoves || moves < scores.memorama.fewestMoves) {
        scores.memorama.fewestMoves = moves
      }
      return scores
    })
  }
}
