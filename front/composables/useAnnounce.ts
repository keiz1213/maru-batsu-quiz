export const useAnnounce = () => {
  const announceText = ref('ここに問題')

  const updateAnnounceText = (data: string) => {
    announceText.value = data
  }

  return {
    announceText,
    updateAnnounceText
  }
}
