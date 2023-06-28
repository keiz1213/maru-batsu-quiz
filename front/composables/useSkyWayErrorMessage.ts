export const useSkyWayErrorMessage = () => {
  const errorMessage = ref<string>('')

  const updateErrorMessage = (message: string) => {
    errorMessage.value = message
  }

  const clearErrorMessage = () => {
    errorMessage.value = ''
  }

  return {
    errorMessage,
    updateErrorMessage,
    clearErrorMessage
  }
}
