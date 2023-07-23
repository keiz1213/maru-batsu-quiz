export const useFriendlyForwarding = () => {
  const redirectPath = useState<string>('redirectPath', () => {
    return ''
  })

  const setRedirectPath = (path: string) => {
    redirectPath.value = path
  }

  const clearRedirectPath = () => {
    redirectPath.value = ''
  }

  const isForwarding = computed(() => !!redirectPath.value)

  return { redirectPath, setRedirectPath, clearRedirectPath, isForwarding }
}
