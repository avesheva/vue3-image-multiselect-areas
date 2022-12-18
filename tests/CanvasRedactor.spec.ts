import { mount, VueWrapper } from '@vue/test-utils'
import LibComponent from '../lib'

test('Renders lib component', () => {
  const wrapper: VueWrapper = mount(LibComponent as never)

  wrapper.exists()
})

