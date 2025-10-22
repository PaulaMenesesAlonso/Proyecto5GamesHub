export const colors = ['green', 'red', 'yellow', 'blue']

const colorTones = {
  green: 329.63,
  red: 261.63,
  yellow: 220.0,
  blue: 164.81
}

const audioCtx = new (window.AudioContext || window.webkitAudioContext)()

export function playTone(colorOrFreq, duration = 300) {
  const oscillator = audioCtx.createOscillator()
  const gainNode = audioCtx.createGain()

  const freq =
    typeof colorOrFreq === 'number'
      ? colorOrFreq
      : colorTones[colorOrFreq] || 220

  oscillator.frequency.value = freq
  oscillator.type = 'sine'

  oscillator.connect(gainNode)
  gainNode.connect(audioCtx.destination)

  oscillator.start()
  gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(
    0.00001,
    audioCtx.currentTime + duration / 1000
  )
  oscillator.stop(audioCtx.currentTime + duration / 1000)
}

export function randomColor() {
  const index = Math.floor(Math.random() * colors.length)
  return colors[index]
}

function flashButton(btn, color) {
  return new Promise((resolve) => {
    playTone(color)
    btn.classList.add('active')
    setTimeout(() => {
      btn.classList.remove('active')
      setTimeout(resolve, 150)
    }, 500)
  })
}

export async function playSequence(sequence) {
  for (const color of sequence) {
    const btn = document.querySelector(`.btn-${color}`)
    if (btn) {
      await flashButton(btn, color)
    }
  }
}
