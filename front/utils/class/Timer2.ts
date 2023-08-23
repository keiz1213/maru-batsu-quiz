class Timer2 {
  startTimer = () => {
    const { startTimer } = useTimer()
    startTimer()
  }

  resetTimer = (): void => {
    const { resetTimer } = useTimer()
    resetTimer()
  }
}

export default Timer2
