class Load2 {
  setLoading = () => {
    const { setLoading } = useLoading()
    setLoading()
  }

  clearLoading = () => {
    const { clearLoading } = useLoading()
    clearLoading()
  }
}
