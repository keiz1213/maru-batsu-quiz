export const useTimer = () => {
  const timeElapsed = ref(0)
  const timerInterval = ref()
  const timeLimit = ref(10)

  const startTimer = () => {
    timerInterval.value = setInterval(() => {
      if (++timeElapsed.value === timeLimit.value) {
        clearInterval(timerInterval.value)
      }
    }, 1000)
  }

  const resetTimer = (): void => {
    timeElapsed.value = 0
    timeLimit.value = 10
  }
  return { timeElapsed, timeLimit, startTimer, resetTimer }
}
