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
        toast.success(message, {
          position: toast.POSITION.TOP_CENTER,
          transition: toast.TRANSITIONS.FLIP,
        })
        break
      case 'info':
        toast.info(message, {
          position: toast.POSITION.TOP_CENTER,
          transition: toast.TRANSITIONS.FLIP,
        })
        break
      case 'warning':
        toast.warning(message, {
          position: toast.POSITION.TOP_CENTER,
          transition: toast.TRANSITIONS.FLIP,
        })
        break
      case 'error':
        toast.error(message, {
          position: toast.POSITION.TOP_CENTER,
          transition: toast.TRANSITIONS.FLIP,
        })
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
