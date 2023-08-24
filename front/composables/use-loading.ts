export const useLoading = () => {
  const loading = useState<boolean>('loading', () => {
    return false
  })

  const setLoading = () => {
    loading.value = true
  }

  const clearLoading = () => {
    loading.value = false
  }

  return {
    loading,
    setLoading,
    clearLoading
  }
}
