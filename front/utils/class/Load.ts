class Load {
  loading: Ref<boolean>
  setLoading: Function
  clearLoading: Function

  constructor() {
    const { loading, setLoading, clearLoading } = useLoading()

    this.loading = loading
    this.setLoading = setLoading
    this.clearLoading = clearLoading
  }
}

export default Load
