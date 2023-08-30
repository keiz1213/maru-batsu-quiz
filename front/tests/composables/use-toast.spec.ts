// @vitest-environment nuxt

import { expect, it } from 'vitest'

afterEach(() => {
  vi.restoreAllMocks()
  const { clearToast } = useToast()
  clearToast()
})

const mocks = vi.hoisted(() => {
  return {
    success: vi.fn(),
    error: vi.fn()
  }
})

vi.mock('nuxt/app', async () => {
  const nuxt = (await vi.importActual('nuxt/app')) as Object
  return {
    ...nuxt,
    useNuxtApp: () => {
      return {
        $toast: {
          success: mocks.success,
          error: mocks.error
        }
      }
    }
  }
})

it('default toast', () => {
  const defaultToast = {
    isSet: false,
    message: '',
    type: ''
  }
  const { toast } = useToast()
  expect(toast.value).toEqual(defaultToast)
})

it('can set toast.', () => {
  const { toast, setToast } = useToast()
  setToast('test', 'success')
  const expectedToast = {
    isSet: true,
    message: 'test',
    type: 'success'
  }
  expect(toast.value).toEqual(expectedToast)
})

it('can clear toast.', () => {
  const { toast, setToast, clearToast } = useToast()
  setToast('test', 'success')
  const defaultToast = {
    isSet: false,
    message: '',
    type: ''
  }
  const expectedToast = {
    isSet: true,
    message: 'test',
    type: 'success'
  }
  expect(toast.value).toEqual(expectedToast)
  clearToast()
  expect(toast.value).toEqual(defaultToast)
})

it('can notify suceess toast.', () => {
  const { notify } = useToast()
  notify('test toast!', 'success')
  expect(mocks.success).toHaveBeenCalledWith('test toast!', {})
  expect(mocks.error).not.toHaveBeenCalledOnce()
})

it('can notify error toast.', () => {
  const { notify } = useToast()
  notify('test toast!', 'error')
  expect(mocks.error).toHaveBeenCalledWith('test toast!', { autoClose: false })
  expect(mocks.success).not.toHaveBeenCalledOnce()
})
