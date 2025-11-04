import { randomColor, playSequence, playTone, colors } from './logic.js'
import { updateScores, getScores } from '../../core/storage.js'
import { renderScores } from '../../ui/ScoreBar.js'

function playErrorSound() {
  playTone(150, 300)
  setTimeout(() => playTone(90, 500), 250)
}

export default function init(root) {
  const section = document.createElement('section')
  section.classList.add('simon')

  const title = document.createElement('h2')
  title.textContent = '🎵 Simon Dice'

  const grid = document.createElement('div')
  grid.classList.add('simon-grid')

  const status = document.createElement('p')
  const startBtn = document.createElement('button')
  startBtn.textContent = '▶️ Empezar'
  startBtn.classList.add('btn')

  section.append(title, status, grid, startBtn)
  root.appendChild(section)

  colors.forEach((color) => {
    const btn = document.createElement('button')
    btn.classList.add('simon-btn', `btn-${color}`)
    btn.dataset.color = color
    grid.appendChild(btn)
  })

  let sequence = []
  let playerSequence = []
  let level = 0
  let listening = false
  let isPlayingSequence = false

  startBtn.addEventListener('click', startGame)

  async function startGame() {
    sequence = []
    playerSequence = []
    level = 0
    listening = false
    nextRound()
  }

  async function nextRound() {
    level++
    status.textContent = `Nivel ${level} 🎯`
    playerSequence = []
    listening = false
    isPlayingSequence = true

    sequence.push(randomColor())

    await playSequence(sequence)

    isPlayingSequence = false
    listening = true
  }

  grid.addEventListener('click', (e) => {
    if (
      !listening ||
      isPlayingSequence ||
      !e.target.classList.contains('simon-btn')
    )
      return

    const color = e.target.dataset.color
    flashPlayer(e.target)
    playTone(color)
    playerSequence.push(color)
    checkPlayerInput()
  })

  function flashPlayer(btn) {
    btn.classList.add('active')
    setTimeout(() => btn.classList.remove('active'), 200)
  }

  function checkPlayerInput() {
    const currentMove = playerSequence.length - 1
    if (playerSequence[currentMove] !== sequence[currentMove]) {
      gameOver()
      return
    }

    if (playerSequence.length === sequence.length) {
      setTimeout(nextRound, 800)
    }
  }

  function gameOver() {
    listening = false
    isPlayingSequence = false
    playErrorSound()
    status.textContent = `💥 Fallaste en el nivel ${level}`
    updateScores((scores) => {
      if (level > scores.simon.bestLevel) {
        scores.simon.bestLevel = level
      }
      return scores
    })
    const scoreBar = document.querySelector('.score-bar')
    if (scoreBar) scoreBar.innerHTML = renderScores()
  }
}
