export const getSkyWayToken = async (): Promise<string> => {
  const { data, error } = await useCustomFetch(`/api/v1/skyway_token`, {
    method: 'get'
  })
  if (error.value) {
    throw new Error()
  } else {
    const skyWayToken = data.value as string
    return skyWayToken
  }
}
