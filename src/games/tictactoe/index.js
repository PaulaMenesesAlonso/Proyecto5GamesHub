import { checkWinner } from './logic.js'
import { updateScores, getScores } from '../../core/storage.js'

export default function init(root) {
  let board = Array(9).fill(null)
  let turn = 'X'
  let gameOver = false

  const section = document.createElement('section')
  section.classList.add('tictactoe')

  const title = document.createElement('h2')
  title.textContent = '🎯 Tres en Raya'

  const status = document.createElement('p')
  status.classList.add('status')

  const grid = document.createElement('div')
  grid.classList.add('grid')

  board.forEach((_, i) => {
    const cell = document.createElement('button')
    cell.classList.add('cell')
    cell.setAttribute('aria-label', `Celda ${i + 1}`)
    cell.addEventListener('click', () => handleClick(i, cell))
    grid.appendChild(cell)
  })

  const resetBtn = document.createElement('button')
  resetBtn.textContent = '🔄 Reiniciar'
  resetBtn.classList.add('reset-btn')
  resetBtn.addEventListener('click', reset)

  section.append(title, status, grid, resetBtn)
  root.appendChild(section)
  updateStatus()

  function handleClick(i, cell) {
    if (board[i] || gameOver) return
    board[i] = turn
    cell.textContent = turn
    const result = checkWinner(board)
    if (result) endGame(result)
    else {
      turn = turn === 'X' ? 'O' : 'X'
      updateStatus()
    }
  }

  function updateStatus() {
    status.textContent = gameOver ? '' : `Turno de: ${turn}`
  }

  function endGame(result) {
    gameOver = true
    if (result === 'draw') {
      status.textContent = '🤝 Empate'
    } else {
      status.textContent = `🏆 Gana ${result}`
    }
    updateScores((scores) => {
      if (result === 'draw') scores.tictactoe.draws++
      else if (result === 'X') scores.tictactoe.wins++
      else scores.tictactoe.losses++
      return scores
    })
  }

  function reset() {
    board = Array(9).fill(null)
    turn = 'X'
    gameOver = false
    grid.querySelectorAll('.cell').forEach((c) => (c.textContent = ''))
    updateStatus()
  }
}
