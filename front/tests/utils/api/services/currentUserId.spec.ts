import { getCurrentUserId } from '~/utils/api/services/current-user-id'
import { describe, it, expect, vi } from 'vitest'

describe('getCurrentUserId', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  const mocks = vi.hoisted(() => {
    return {
      useCustomFetch: vi.fn()
    }
  })

  vi.mock('~/composables/use-custom-fetch', () => {
    return {
      useCustomFetch: mocks.useCustomFetch
    }
  })

  it('fetch current user id', async () => {
    mocks.useCustomFetch.mockReturnValueOnce({
      data: { value: 1 },
      error: { value: false }
    })

    const result = await getCurrentUserId()
    expect(result).toBe(1)
  })

  it('throw error', async () => {
    mocks.useCustomFetch.mockReturnValueOnce({ error: { value: true } })
    await expect(getCurrentUserId()).rejects.toThrow(Error)
  })
})
