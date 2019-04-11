import { configureStore } from 'redux-starter-kit'
import alerts from './alerts'
import session, { loadSessionFromStorage } from './session'
import ui, {
  loadTemplate,
  loadSettings,
  loadApiUrl,
  setInitialized
} from './ui'

const store = configureStore({
  reducer: { alerts, session, ui }
})

async function loadInitialState() {
  await store.dispatch(loadApiUrl())
  await store.dispatch(loadSessionFromStorage())
  await Promise.all([
    store.dispatch(loadTemplate()),
    store.dispatch(loadSettings())
  ])
  store.dispatch(setInitialized(true))
}

loadInitialState()

export default store
