class Announce {
  announceText: Ref<string>
  updateAnnounceText: Function

  constructor() {
    const { announceText, updateAnnounceText } = useAnnounce()

    this.announceText = announceText
    this.updateAnnounceText = updateAnnounceText
  }
}

export default Announce
