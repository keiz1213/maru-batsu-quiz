import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Helloworld from '../../components/Helloworld.vue'

describe('Helloworld', () => {
  test('メッセージが表示される', () => {
    const wrapper = mount(Helloworld, {
      props: {
        name: 'world'
      }
    })
    expect(wrapper.text()).toContain('Hello, world')
  })
})
