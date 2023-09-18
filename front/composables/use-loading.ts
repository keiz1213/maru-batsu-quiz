export const useLoading = () => {
  const loading = useState<boolean>('loading', () => {
    return false
  })

  const startLoading = () => {
    loading.value = true
  }

  const stopLoading = () => {
    loading.value = false
  }

  return {
    loading,
    startLoading,
    stopLoading
  }
}
