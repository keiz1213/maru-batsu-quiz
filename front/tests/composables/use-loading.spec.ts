// @vitest-environment nuxt
import { expect, it } from 'vitest'

afterEach(() => {
  const { stopLoading } = useLoading()
  stopLoading()
})

it('default loading is false', () => {
  const { loading } = useLoading()
  expect(loading.value).toBeFalsy()
})

describe('startLoading', () => {
  it('switching from false to true for loading.', () => {
    const { loading, startLoading } = useLoading()
    expect(loading.value).toBeFalsy()
    startLoading()
    expect(loading.value).toBeTruthy()
  })
})

describe('stopLoading', () => {
  it('switching from true to false for loading.', () => {
    const { loading, startLoading, stopLoading } = useLoading()
    startLoading()
    expect(loading.value).toBeTruthy()
    stopLoading()
    expect(loading.value).toBeFalsy()
  })
})
