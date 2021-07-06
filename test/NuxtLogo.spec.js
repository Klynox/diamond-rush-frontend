import { mount } from '@vue/test-utils'
import GameBoard from '@/components/game/gameboard'

describe('GameBoard', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(GameBoard)
    expect(wrapper.vm).toBeTruthy()
  })
})
