import { mount, VueWrapper } from '@vue/test-utils'
import LibComponent from '../lib'

test('Renders lib component', () => {
  const wrapper: VueWrapper = mount(LibComponent as never, {
    props: {
      imageUrl: 'https://www.watermelon.org/wp-content/uploads/2020/07/Frog-Carving-27-1000x1000.jpg',
    },
  })

  wrapper.exists()
})

