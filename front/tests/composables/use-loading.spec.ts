// @vitest-environment nuxt

import { expect, it } from 'vitest'

afterEach(() => {
  const { clearLoading } = useLoading()
  clearLoading()
})

it("default loading is false", () => {
  const { loading } = useLoading()
  expect(loading.value).toBeFalsy()
})

it('switching from false to true for loading.', () => {
  const { loading, setLoading } = useLoading()
  expect(loading.value).toBeFalsy()
  setLoading()
  expect(loading.value).toBeTruthy()
})

it('switching from true to false for loading.', () => {
  const { loading, setLoading, clearLoading } = useLoading()
  setLoading()
  expect(loading.value).toBeTruthy()
  clearLoading()
  expect(loading.value).toBeFalsy()
})
