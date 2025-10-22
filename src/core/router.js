const routes = {
  tictactoe: () => import('../games/tictactoe/index.js'),
  memorama: () => import('../games/memorama/index.js'),
  simon: () => import('../games/simon/index.js')
}

export async function navigate(gameName = 'tictactoe') {
  const loadGame = routes[gameName] || routes.tictactoe
  const module = await loadGame() // Import dinámico
  return module.default
}
