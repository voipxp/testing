import { configureStore } from 'redux-starter-kit'
import { alertsReducer, alertWarning } from './alerts'
import { userRegistrationReducer } from './user-registration'
import { userServicesReducer } from './user-services'
import { userSpeedDial8Reducer } from './user-speed-dial-8'
import { userUserInterceptReducer } from './user-intercept'
import { userAssignedServicesReducer } from './user-assigned-services'
import { userViewableServicesReducer } from './user-viewable-services'
import { userReducer } from './user'
import {
  sessionReducer,
  loadSessionFromStorage,
  clearSession,
  loadSessionFromToken
} from './session'
import { serviceProvidersReducer } from './service-providers'
import { uiReducer, setInitialized } from './ui'
import { loadApplications, uiApplicationsReducer } from './ui-applications'
import { loadModules, uiModulesReducer } from './ui-modules'
import { loadSettings, uiSettingsReducer } from './ui-settings'
import { loadTemplate, uiTemplateReducer } from './ui-template'
import { parse, stringify } from 'query-string'

export const store = configureStore({
  reducer: {
    alerts: alertsReducer,
    serviceProviders: serviceProvidersReducer,
    session: sessionReducer,
    user: userReducer,
    userAssignedServices: userAssignedServicesReducer,
    userRegistration: userRegistrationReducer,
    userServices: userServicesReducer,
    userViewableServices: userViewableServicesReducer,
    userSpeedDial8: userSpeedDial8Reducer,
    userIntercept: userUserInterceptReducer,
    ui: uiReducer,
    uiApplications: uiApplicationsReducer,
    uiModules: uiModulesReducer,
    uiSettings: uiSettingsReducer,
    uiTemplate: uiTemplateReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
})

// look for either a token passed in the URL or saved in localstorage
const loadSession = () => {
  const [hash, query] = window.location.hash.split('?')
  const { token, ...rest } = parse(query)
  if (token) {
    const params = stringify(rest)
    window.location.hash = params ? `${hash}?${params}` : hash
    return store.dispatch(loadSessionFromToken(token))
  } else {
    return store.dispatch(loadSessionFromStorage())
  }
}

export const loadInitialState = async () => {
  try {
    await store.dispatch(clearSession(false))
    await Promise.all([
      loadSession(),
      store.dispatch(loadModules()),
      store.dispatch(loadApplications()),
      store.dispatch(loadTemplate()),
      store.dispatch(loadSettings())
    ])
  } catch (error) {
    await store.dispatch(clearSession())
    await store.dispatch(alertWarning('Please Login'))
    console.log('loadInitialState', error)
  } finally {
    await store.dispatch(setInitialized(true))
  }
}
