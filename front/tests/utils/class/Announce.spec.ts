// @vitest-environment nuxt
import { expect, it } from 'vitest'
import Announce from '~/utils/class/Announce'

it('can update announceText', () => {
  const { announceText } = useAnnounce()
  const announce = new Announce()
  expect(announceText.value).toBe('')
  announce.updateAnnounceText('1問目!')
  expect(announceText.value).toBe('1問目!')
  announceText.value = ''
})
