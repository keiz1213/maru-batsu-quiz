import { NotificationType } from '~/types/notificationType'

export const useToast = () => {
  const toast = useState<{
    isSet: boolean
    message: string
    type: NotificationType | null
  }>('toast', () => {
    return {
      isSet: false,
      message: '',
      type: null
    }
  })

  const setToast = (message: string, type: NotificationType) => {
    toast.value.isSet = true
    toast.value.message = message
    toast.value.type = type
  }

  const clearToast = () => {
    toast.value.isSet = false
    toast.value.message = ''
    toast.value.type = null
  }

  const notify = (message: string, type: NotificationType) => {
    const toast = useNuxtApp().$toast

    switch (type) {
      case NotificationType.Success:
        toast.success(message, {})
        break
      case NotificationType.Error:
        toast.error(message, {
          autoClose: false
        })
        break
    }
  }

  const notifyOnSpot = (message: string, type: NotificationType) => {
    notify(message, type)
    clearToast()
  }

  return {
    toast: readonly(toast),
    setToast: setToast,
    clearToast: clearToast,
    notify: notify,
    notifyOnSpot: notifyOnSpot
  }
}
