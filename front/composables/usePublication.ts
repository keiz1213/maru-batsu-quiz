export const usePublication = () => {
  const publicationIds = ref<string[]>([])
  const publisherNames = ref<string[]>([])

  const addPublicationId = (publicationId: string) => {
    publicationIds.value.push(publicationId)
  }

  const addPublisherName = (publisherName: string) => {
    publisherNames.value.push(publisherName)
  }

  return { publicationIds, publisherNames, addPublicationId, addPublisherName }
}
