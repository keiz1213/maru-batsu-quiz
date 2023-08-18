export const useAnnounce = () => {
  const announceText = ref('')

  const updateAnnounceText = (data: string) => {
    announceText.value = data
  }

  return {
    announceText,
    updateAnnounceText
  }
}
