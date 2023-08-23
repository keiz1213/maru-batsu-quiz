class Announce {
  updateAnnounceText = (text: string) => {
    const { updateAnnounceText } = useAnnounce()
    updateAnnounceText(text)
  }
}

export default Announce
