import { render } from '@testing-library/react-native'

import Home from '../app/screen/Home'

jest.mock('@react-native-async-storage/async-storage')
test('첫 화면이 랜더링 된다', () => {
  const app = render(<Home />)
  const json = app.toJSON()
  expect(json).toMatchSnapshot()
})
