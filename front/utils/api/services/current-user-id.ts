export const getCurrentUserId = async (): Promise<number> => {
  const { data, error } = await useCustomFetch(`/api/v1/current_user/user_id`, {
    method: 'get'
  })
  if (error.value) {
    throw new Error()
  } else {
    const currentUserId = data.value as number
    return currentUserId
  }
}
