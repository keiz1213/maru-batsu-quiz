// @vitest-environment nuxt
import { NotificationType } from '~/types/notificationType'
import { useToast } from '~/composables/use-toast'
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
    type: null
  }
  const { toast } = useToast()
  expect(toast.value).toEqual(defaultToast)
})

describe('setToast', () => {
  it('can set toast.', () => {
    const { toast, setToast } = useToast()
    setToast('test', NotificationType.Success)
    const expectedToast = {
      isSet: true,
      message: 'test',
      type: NotificationType.Success
    }
    expect(toast.value).toEqual(expectedToast)
  })
})
describe('clearToast', () => {
  it('can clear toast.', () => {
    const { toast, setToast, clearToast } = useToast()
    setToast('test', NotificationType.Success)
    const defaultToast = {
      isSet: false,
      message: '',
      type: null
    }
    const expectedToast = {
      isSet: true,
      message: 'test',
      type: NotificationType.Success
    }
    expect(toast.value).toEqual(expectedToast)
    clearToast()
    expect(toast.value).toEqual(defaultToast)
  })
})
describe('notify', () => {
  it('can notify suceess toast.', () => {
    const { notify } = useToast()
    notify('test toast!', NotificationType.Success)
    expect(mocks.success).toHaveBeenCalledWith('test toast!', {})
    expect(mocks.error).not.toHaveBeenCalledOnce()
  })

  it('can notify error toast.', () => {
    const { notify } = useToast()
    notify('test toast!', NotificationType.Error)
    expect(mocks.error).toHaveBeenCalledWith('test toast!', {
      autoClose: false
    })
    expect(mocks.success).not.toHaveBeenCalledOnce()
  })
})

describe('notifyOnSpot', () => {
  const { toast, notifyOnSpot } = useToast()
  it('notify on spot', () => {
    const defaultToast = {
      isSet: false,
      message: '',
      type: null
    }
    notifyOnSpot('on spot!', NotificationType.Error)
    expect(mocks.error).toHaveBeenCalledWith('on spot!', {
      autoClose: false
    })
    expect(toast.value).toEqual(defaultToast)
  })
})
