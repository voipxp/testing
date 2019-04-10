import { configureStore } from 'redux-starter-kit'
import alerts from './alerts'
import session, { loadSessionFromStorage } from './session'
import ui, { loadTemplate, loadSettings, setInitialized } from './ui'

const store = configureStore({
  reducer: { alerts, session, ui }
})

async function loadInitialState() {
  Promise.all([
    store.dispatch(loadSessionFromStorage()),
    store.dispatch(loadTemplate()),
    store.dispatch(loadSettings())
  ]).then(() => {
    store.dispatch(setInitialized(true))
  })
}

loadInitialState()

export default store
