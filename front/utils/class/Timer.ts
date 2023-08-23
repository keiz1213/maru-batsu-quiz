class Timer {
  startTimer = () => {
    const { startTimer } = useTimer()
    startTimer()
  }

  resetTimer = () => {
    const { resetTimer } = useTimer()
    resetTimer()
  }
}

export default Timer
