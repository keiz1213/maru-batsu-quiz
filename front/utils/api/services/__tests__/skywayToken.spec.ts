import { getSkyWayToken } from '~/utils/api/services/skywayToken'
import { describe, it, expect, vi } from 'vitest'

describe('getSkyWayToken', () => {
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

  it('fetch current user id', async () => {
    mocks.useCustomFetch.mockReturnValueOnce({
      data: { value: 'test token' },
      error: { value: false }
    })

    const result = await getSkyWayToken()
    expect(result).toBe('test token')
  })

  it('throw error', async () => {
    mocks.useCustomFetch.mockReturnValueOnce({ error: { value: true } })
    await expect(getSkyWayToken()).rejects.toThrow(Error)
  })
})
