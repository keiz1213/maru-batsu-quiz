// @vitest-environment nuxt
import { vi, expect, it } from 'vitest'

it('test', () => {
  // const { currentUser } = useCurrentUser()
  // expect(currentUser.value.id).equal(0)
  const { login } = useAuth()
  expect(login).toBe(Function)
})
