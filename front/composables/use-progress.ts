export const useProgress = () => {
  const completed = useState<number>('completed', () => {
    return 0
  })

  const addCompleted = (num: number) => {
    completed.value += num
  }

  return { completed, addCompleted }
}
