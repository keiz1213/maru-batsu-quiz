export const useLoading = () => {
  const loading = ref(false)

  const setLoading = () => {
    loading.value = true
  }

  const unsetLoading = () => {
    loading.value = false
  }

  return { loading, setLoading, unsetLoading }
}
