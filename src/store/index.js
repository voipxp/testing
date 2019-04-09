import { configureStore } from 'redux-starter-kit'
import alerts from './alerts'

const store = configureStore({
  reducer: { alerts }
})

export default store
