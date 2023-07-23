import { User } from '~/types/user'

export const getUser = async (userId: number): Promise<User> => {
  const { data, error } = await useCustomFetch(`/api/v1/users/${userId}`, {
    method: 'get'
  })
  if (error.value) {
    throw new Error()
  } else {
    const user = data.value as User
    return user
  }
}

export const postUser = async (): Promise<User> => {
  const { data, error } = await useCustomFetch(`/api/v1/users`, {
    method: 'post'
  })
  if (error.value) {
    throw new Error()
  } else {
    const user = data.value as User
    return user
  }
}

export const deleteUser = async (userId: number): Promise<void> => {
  const { error } = await useCustomFetch(`/api/v1/users/${userId}`, {
    method: 'delete'
  })
  if (error.value) {
    throw new Error()
  }
}
