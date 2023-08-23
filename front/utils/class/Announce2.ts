class Announce2 {
  updateAnnounceText = (text: string) => {
    const { updateAnnounceText } = useAnnounce()
    updateAnnounceText(text)
  }
}

export default Announce2
