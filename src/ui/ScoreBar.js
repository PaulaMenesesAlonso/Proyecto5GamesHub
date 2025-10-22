import { getScores } from '../core/storage.js'

export function ScoreBar() {
  const scores = getScores()
  const bar = document.createElement('section')
  bar.classList.add('score-bar')

  bar.innerHTML = `
    <h2>🏆Puntuaciones🏆</h2>
    <div class="scores">
      <p><strong>Tres en Raya:</strong> ${scores.tictactoe.wins} victorias</p>
      <p><strong>Memorama:</strong> ${
        scores.memorama.bestTime ?? '--'
      } mejor tiempo</p>
      <p><strong>Simon:</strong> nivel máximo ${scores.simon.bestLevel}</p>
    </div>
  `
  return bar
}
