export const useLoading = () => {
  const isLoading = ref(false)

  const setLoading = () => {
    isLoading.value = true
  }

  const unsetLoading = () => {
    isLoading.value = false
  }

  return { isLoading, setLoading, unsetLoading }
}
