// @vitest-environment nuxt

import { Game } from '~/types/game'
import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import MbqCardGame from '../MbqCardGame.vue'
import TrophyOutlineIcon from 'vue-material-design-icons/TrophyOutline.vue'
import FolderPlusOutlineIcon from 'vue-material-design-icons/FolderPlusOutline.vue'
import UpdateIcon from 'vue-material-design-icons/Update.vue'

describe('MbqCardGame', () => {
  let game: Game
  let wrapper: VueWrapper


  beforeEach(() => {
    game = {
      id: 1,
      title: 'Test Game',
      description: 'This is a test game',
      number_of_winner: 3,
      created_at: '2023-08-04T12:34:56Z',
      updated_at: '2023-08-04T14:22:33Z'
    } as Game

    wrapper = mount(MbqCardGame, {
      props: {
        game: game
      }
    })
  })

  describe('header', () => {
    it('correct title', () => {
      const title = wrapper.find('#card-title')
      expect(title.text()).toBe('Test Game')
    })
  })

  describe('content', () => {
    describe('description', () => {
      it('correct description', () => {
        const description = wrapper.find('#card-description')
        expect(description.text()).toBe('This is a test game')
      })
    })

    describe('number of winner', () => {
      it('correct number of winner', () => {
        const numberOfWinner = wrapper.find('#card-number-of-winner')
        expect(numberOfWinner.text()).toBe('勝ち抜き人数: 3人')
      })

      it('render trophy icon', () => {
        const trophyIcon = wrapper.findComponent(TrophyOutlineIcon)
        expect(trophyIcon.exists()).toBe(true)
      })
    })

    describe('created at', () => {
      it('correct created at', () => {
        const createdAt = wrapper.find('#card-created-at')
        expect(createdAt.text()).toBe('作成日: 2023/08/04')
      })

      it('render folder icon', () => {
        const folderIcon = wrapper.findComponent(FolderPlusOutlineIcon)
        expect(folderIcon.exists()).toBe(true)
      })
    })

    describe('updated at', () => {
      it('correct updated at', () => {
        const updatedAt = wrapper.find('#card-updated-at')
        expect(updatedAt.text()).toBe('更新日: 2023/08/04')
      })

      it('render update icon', () => {
        const updateIcon = wrapper.findComponent(UpdateIcon)
        expect(updateIcon.exists()).toBe(true)
      })
    })
  })
})
