class Timer {
  timeElapsed: Ref<number>
  timeLimit: Ref<number>
  startTimer: Function
  resetTimer: Function

  constructor() {
    const { timeElapsed, timeLimit, startTimer, resetTimer } = useTimer()

    this.timeElapsed = timeElapsed
    this.timeLimit = timeLimit
    this.startTimer = startTimer
    this.resetTimer = resetTimer
  }
}

export default Timer
