import { configureStore } from 'redux-starter-kit'
import alerts from './alerts'
import session, { loadSessionFromStorage } from './session'
import ui, {
  loadTemplate,
  loadSettings,
  loadApiUrl,
  setInitialized,
  loadApplications,
  loadModules
} from './ui'

const store = configureStore({
  reducer: { alerts, session, ui }
})

// TODO: Move this to app component
const loadInitialState = async () => {
  await store.dispatch(loadApiUrl())
  store.dispatch(loadSessionFromStorage())
  await Promise.all([
    store.dispatch(loadModules()),
    store.dispatch(loadApplications()),
    store.dispatch(loadTemplate()),
    store.dispatch(loadSettings())
  ])
  store.dispatch(setInitialized(true))
}

loadInitialState()

export default store
