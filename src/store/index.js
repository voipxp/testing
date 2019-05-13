import { configureStore } from 'redux-starter-kit'
import { alertsReducer } from './alerts'
import { userServicesReducer } from './user-services'
import { userAssignedServicesReducer } from './user-assigned-services'
import { userViewableServicesReducer } from './user-viewable-services'
import { userReducer } from './user'
import { sessionReducer, loadSessionFromStorage, clearSession } from './session'
import { serviceProvidersReducer } from './service-providers'
import { uiReducer, setInitialized } from './ui'
import { loadApplications, uiApplicationsReducer } from './ui-applications'
import { loadModules, uiModulesReducer } from './ui-modules'
import { loadSettings, uiSettingsReducer } from './ui-settings'
import { loadTemplate, uiTemplateReducer } from './ui-template'

export const store = configureStore({
  reducer: {
    alerts: alertsReducer,
    serviceProviders: serviceProvidersReducer,
    session: sessionReducer,
    user: userReducer,
    userAssignedServices: userAssignedServicesReducer,
    userServices: userServicesReducer,
    userViewableServices: userViewableServicesReducer,
    ui: uiReducer,
    uiApplications: uiApplicationsReducer,
    uiModules: uiModulesReducer,
    uiSettings: uiSettingsReducer,
    uiTemplate: uiTemplateReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
})

export const loadInitialState = async () => {
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
