import { getScores } from '../core/storage.js'

export function ScoreBar() {
  const bar = document.createElement('section')
  bar.classList.add('score-bar')

  bar.innerHTML = renderScores()
  return bar
}

export function renderScores() {
  const scores = getScores()

  return `
    <h2>🏆 Puntuaciones</h2>
    <div class="scores">
      <p><strong>Tres en Raya:</strong> ${scores.tictactoe.wins} victorias</p>
      <p><strong>Memorama:</strong> ${
        scores.memorama.bestTime ?? '--'
      }s mejor tiempo</p>
      <p><strong>Simón:</strong> nivel máximo ${
        scores.simon.bestLevel ?? '--'
      }</p>
    </div>
  `
}
