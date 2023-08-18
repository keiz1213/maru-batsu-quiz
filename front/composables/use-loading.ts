export const useLoading = () => {
  const loading = ref(false)

  const setLoading = () => {
    loading.value = true
  }

  const clearLoading = () => {
    loading.value = false
  }

  return { loading, setLoading, clearLoading }
}
