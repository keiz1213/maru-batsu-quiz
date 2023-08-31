// @vitest-environment nuxt
import { expect, it } from 'vitest'
import Timer from '~/utils/class/Timer'

let timer: Timer

afterEach(() => {
  timer.resetTimer()
})

beforeEach(() => {
  timer = new Timer()
})

it("timer starts and when it reaches the time limit, the timer stops automatically.", () => {
  const { timeElapsed, timeLimit } = useTimer()
  expect(timeElapsed.value).toEqual(0)
  expect(timeLimit.value).toEqual(10)
  vi.useFakeTimers()
  vi.spyOn(global, 'setInterval')
  vi.spyOn(global, 'clearInterval')

  timer.startTimer()
  for (let i = 0; i < timeLimit.value; i++) {
    vi.advanceTimersByTime(1000)
  }

  expect(setInterval).toHaveBeenCalledTimes(1)
  expect(clearInterval).toHaveBeenCalledTimes(1)
})

it("when the timer is started and hasn't reached the time limit, the timer won't stop.", async () => {
  const { timeElapsed, timeLimit } = useTimer()
  expect(timeElapsed.value).toEqual(0)
  expect(timeLimit.value).toEqual(10)
  vi.useFakeTimers()
  vi.spyOn(global, 'setInterval')
  vi.spyOn(global, 'clearInterval')

  timer.startTimer()
  for (let i = 0; i < 7; i++) {
    vi.advanceTimersByTime(1000)
  }

  expect(setInterval).toHaveBeenCalledTimes(1)
  expect(clearInterval).not.toHaveBeenCalledTimes(1)
})
