import confetti from 'canvas-confetti'

export function burstConfetti() {
  const colors = ['#ff8fc9', '#b78bff', '#f6f1e9']
  confetti({
    particleCount: 90,
    spread: 75,
    origin: { y: 0.6 },
    colors,
  })
}

export function heartConfetti() {
  const heart = confetti.shapeFromText({ text: '💗', scalar: 2 })
  confetti({
    particleCount: 30,
    spread: 60,
    shapes: [heart],
    scalar: 2,
    origin: { y: 0.6 },
  })
}
