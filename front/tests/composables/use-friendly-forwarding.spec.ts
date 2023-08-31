// @vitest-environment nuxt
import { expect, it } from 'vitest'

afterEach(() => {
  const { clearRedirectPath } = useFriendlyForwarding()
  clearRedirectPath()
})

it("default redirectPath is ''", () => {
  const defaultRedirectPath = ''
  const { redirectPath } = useFriendlyForwarding()
  expect(redirectPath.value).toEqual(defaultRedirectPath)
})

it('can set redirectPath', () => {
  const defaultRedirectPath = ''
  const { redirectPath, setRedirectPath } = useFriendlyForwarding()
  expect(redirectPath.value).toEqual(defaultRedirectPath)
  setRedirectPath('/home')
  expect(redirectPath.value).toEqual('/home')
})

it('can clear redirectPath', () => {
  const defaultRedirectPath = ''
  const { redirectPath, setRedirectPath, clearRedirectPath } =
    useFriendlyForwarding()
  expect(redirectPath.value).toEqual(defaultRedirectPath)
  setRedirectPath('/home')
  expect(redirectPath.value).toEqual('/home')
  clearRedirectPath()
  expect(redirectPath.value).toEqual(defaultRedirectPath)
})

it('can be confirmed whether a redirect should occur', () => {
  const { setRedirectPath, isForwarding } = useFriendlyForwarding()
  expect(isForwarding()).toBeFalsy()
  setRedirectPath('/home')
  expect(isForwarding()).toBeTruthy()
})
