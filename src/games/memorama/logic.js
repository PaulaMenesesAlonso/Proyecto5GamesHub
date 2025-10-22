export function shuffle(array) {
  let currentIndex = array.length,
    randomIndex
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ]
  }
  return array
}

export function generateCards() {
  const icons = ['🐱', '🐶', '🐰', '🐸', '🐼', '🐹', '🦊', '🐯']
  const deck = [...icons, ...icons]
  return shuffle(deck)
}
