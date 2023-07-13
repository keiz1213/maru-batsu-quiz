export const useRedirectPath = () => {
  const redirectPath = useState<string>('redirectPath', () => {
    return ''
  })

  const setRedirectPath = (path: string) => {
    redirectPath.value = path
  }

  const unsetRedirectPath = () => {
    redirectPath.value = ''
  }

  return { redirectPath, setRedirectPath, unsetRedirectPath }
}
