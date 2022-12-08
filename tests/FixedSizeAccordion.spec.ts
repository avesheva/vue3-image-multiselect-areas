import { mount, VueWrapper } from '@vue/test-utils'
import Accordion from '../lib'

test('Renders accordion', () => {
  const wrapper: VueWrapper = mount(Accordion as never, {
    props: {
      open: false,
    },
  })

  wrapper.exists()
})

