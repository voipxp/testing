import { configureStore } from 'redux-starter-kit'
import alerts from './alerts'
import session from './session'
import template from './template'

const store = configureStore({
  reducer: { alerts, session, template }
})

export default store
