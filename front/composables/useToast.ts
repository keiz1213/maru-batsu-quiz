export const useToast = () => {
  const toast = useState<{
    isSet: boolean
    message: string
    type: string
  }>('toast', () => {
    return {
      isSet: false,
      message: '',
      type: ''
    }
  })

  const setToast = (message: string, type: string) => {
    toast.value.isSet = true
    toast.value.message = message
    toast.value.type = type
  }

  const unsetToast = () => {
    toast.value.isSet = false
    toast.value.message = ''
    toast.value.type = ''
  }

  const notify = (message: string, type: string) => {
    const toast = useNuxtApp().$toast

    switch (type) {
      case 'success':
        toast.success(message)
        break
      case 'info':
        toast.info(message)
        break
      case 'warning':
        toast.warning(message)
        break
      case 'error':
        toast.error(message)
        break
    }
  }

  return {
    toast: readonly(toast),
    setToast: setToast,
    unsetToast: unsetToast,
    notify: notify
  }
}
