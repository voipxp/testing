import { configureStore } from 'redux-starter-kit'
import alerts from './alerts'
import session, { loadSessionFromStorage } from './session'
import template from './template'

const store = configureStore({
  reducer: { alerts, session, template }
})

store.dispatch(loadSessionFromStorage())

export default store
