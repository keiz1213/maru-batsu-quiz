class Counter {
  static inc = () => {
    const { inc } = useCounter()
    inc()
  }
}

export default Counter
