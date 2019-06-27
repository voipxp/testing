import { configureStore } from 'redux-starter-kit'
import { userRegistrationReducer } from './user-registration'
import { userServicesReducer } from './user-services'
import { userSpeedDial8Reducer } from './user-speed-dial-8'
import { userUserInterceptReducer } from './user-intercept'
import { userAssignedServicesReducer } from './user-assigned-services'
import { userViewableServicesReducer } from './user-viewable-services'
import { sessionReducer, loadSessionFromStorage, clearSession } from './session'
import { uiReducer, setInitialized } from './ui'
import { loadApplications, uiApplicationsReducer } from './ui-applications'
import { loadModules, uiModulesReducer } from './ui-modules'
import { loadSettings, uiSettingsReducer } from './ui-settings'
import { loadTemplate, uiTemplateReducer } from './ui-template'

export const store = configureStore({
  reducer: {
    session: sessionReducer,
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
