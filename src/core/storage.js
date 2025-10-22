const STORAGE_KEY = 'gameshubScores'

const defaultData = () => ({
  tictactoe: { wins: 0, losses: 0, draws: 0 },
  memorama: { bestTime: null, fewestMoves: null },
  simon: { bestLevel: 0 }
})

export function getScores() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultData()
  } catch {
    return defaultData()
  }
}

export function setScores(newData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
}

export function updateScores(updateFn) {
  const current = getScores()
  const updated = updateFn(structuredClone(current))
  setScores(updated)
  return updated
}

export function resetScores() {
  setScores(defaultData())
}
