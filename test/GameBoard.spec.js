import { mount } from '@vue/test-utils'
import WalletDialog from '@/components/dialogs/wallet-dialogs.vue'

describe('WalletDialog', () => {
    test('is a Vue instance', () => {
        const wrapper = mount(WalletDialog)
        expect(wrapper.vm).toBeTruthy()
    })
})