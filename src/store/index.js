import { configureStore } from 'redux-starter-kit'
import alerts from './alerts'
import userServices from './user-services'
import userAssignedServices from './user-assigned-services'
import userViewableServices from './user-viewable-services'
import session, { loadSessionFromStorage, clearSession } from './session'
import serviceProviders from './service-providers'
import ui, {
  loadTemplate,
  loadSettings,
  setInitialized,
  loadApplications,
  loadModules
} from './ui'

const store = configureStore({
  reducer: {
    alerts,
    serviceProviders,
    session,
    userServices,
    userAssignedServices,
    userViewableServices,
    ui
  },
  devTools: process.env.NODE_ENV !== 'production'
})

const loadInitialState = async () => {
  try {
    await store.dispatch(loadSessionFromStorage())
  } catch (error) {
    await store.dispatch(clearSession())
  }
  try {
    await Promise.all([
      store.dispatch(loadModules()),
      store.dispatch(loadApplications()),
      store.dispatch(loadTemplate()),
      store.dispatch(loadSettings())
    ])
    store.dispatch(setInitialized(true))
  } catch (error) {
    console.log('loadInitialState', error)
  }
}

loadInitialState()

export default store
