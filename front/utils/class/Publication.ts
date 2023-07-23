class Publication {
  publicationIds: Ref<string[]>
  publisherNames: Ref<string[]>
  addPublicationId: Function
  addPublisherName: Function

  constructor() {
    const {
      publisherNames,
      addPublisherName,
      publicationIds,
      addPublicationId
    } = usePublication()

    this.publicationIds = publicationIds
    this.publisherNames = publisherNames
    this.addPublicationId = addPublicationId
    this.addPublisherName = addPublisherName
  }
}

export default Publication
