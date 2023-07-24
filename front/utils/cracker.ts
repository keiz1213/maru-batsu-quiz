import confetti from 'canvas-confetti'

const count = 200
const defaults = {
  origin: { y: 0.7 },
  zIndex: 100000
}

const fire = (particleRatio: number, opts: Object) => {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio)
    })
  )
}
export const realisticLook = () => {
  fire(0.25, {
    spread: 26,
    startVelocity: 55
  })
  fire(0.2, {
    spread: 60
  })
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 45
  })
}

export const bothSidesCracker = () => {
  confetti({
    angle: 50,
    spread: 50,
    particleCount: 100,
    zIndex: 100000,
    origin: { x: 0.1, y: 0.4 }
  })

  confetti({
    angle: 130,
    spread: 50,
    particleCount: 100,
    zIndex: 100000,
    origin: { x: 0.9, y: 0.4 }
  })
}
