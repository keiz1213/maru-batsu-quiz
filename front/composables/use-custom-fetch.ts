import type { UseFetchOptions } from 'nuxt/app'
import { defu } from 'defu'

export const useCustomFetch = async <T>(
  url: string,
  options: UseFetchOptions<T> = {}
) => {
  const { user } = useFirebaseAuth()
  const firebaseIdToken = (await user.value?.getIdToken()) as string
  const config = useRuntimeConfig()

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.baseURL,
    key: url,
    headers: {
      authorization: `Bearer ${firebaseIdToken}`
    }
  }
  const params = defu(options, defaults)

  return useFetch(url, params)
}
