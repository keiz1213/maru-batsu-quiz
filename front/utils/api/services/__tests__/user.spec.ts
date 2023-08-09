import { getUser } from '~/utils/api/services/user'
import { postUser } from '~/utils/api/services/user'
import { deleteUser } from '~/utils/api/services/user'
import { describe, it, expect, vi } from 'vitest'

describe('user', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  const mocks = vi.hoisted(() => {
    return {
      useCustomFetch: vi.fn()
    }
  })

  vi.mock('~/composables/useCustomFetch', () => {
    return {
      useCustomFetch: mocks.useCustomFetch
    }
  })

  const user = {
    id: 1,
    uid: 'testUid',
    name: 'test',
    avatar_url: 'https://example.com/photo.jpg',
    games: []
  }

  describe('getUser', () => {
    it('fetch a user', async () => {
      mocks.useCustomFetch.mockReturnValueOnce({
        data: { value: user },
        error: { value: false }
      })

      const result = await getUser(user.id)
      expect(result).toEqual(user)
      expect(mocks.useCustomFetch).toHaveBeenCalledWith(
        `/api/v1/users/${user.id}`,
        { method: 'get' }
      )
    })

    it('throw error', async () => {
      mocks.useCustomFetch.mockReturnValueOnce({ error: { value: true } })
      await expect(getUser(user.id)).rejects.toThrow(Error)
      expect(mocks.useCustomFetch).toHaveBeenCalledWith(
        `/api/v1/users/${user.id}`,
        { method: 'get' }
      )
    })
  })

  describe('postUser', () => {
    it('post a user', async () => {
      mocks.useCustomFetch.mockReturnValueOnce({
        data: { value: user },
        error: { value: false }
      })

      const result = await postUser()
      expect(result).toEqual(user)
      expect(mocks.useCustomFetch).toHaveBeenCalledWith(`/api/v1/users`, {
        method: 'post'
      })
    })

    it('throw error', async () => {
      mocks.useCustomFetch.mockReturnValueOnce({ error: { value: true } })
      await expect(postUser()).rejects.toThrow(Error)
      expect(mocks.useCustomFetch).toHaveBeenCalledWith(`/api/v1/users`, {
        method: 'post'
      })
    })
  })

  describe('deleteUser', () => {
    it('delete a user', async () => {
      mocks.useCustomFetch.mockReturnValueOnce({
        error: { value: false }
      })
      const userId = 1
      await deleteUser(userId)
      expect(mocks.useCustomFetch).toHaveBeenCalledWith(
        `/api/v1/users/${user.id}`,
        { method: 'delete' }
      )
    })

    it('throw error', async () => {
      mocks.useCustomFetch.mockReturnValueOnce({ error: { value: true } })
      const userId = 1
      await expect(deleteUser(userId)).rejects.toThrow(Error)
      expect(mocks.useCustomFetch).toHaveBeenCalledWith(
        `/api/v1/users/${user.id}`,
        { method: 'delete' }
      )
    })
  })
})
