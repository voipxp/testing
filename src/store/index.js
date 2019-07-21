import { configureStore } from 'redux-starter-kit'
import { userRegistrationReducer } from './user-registration'
import { userServicesReducer } from './user-services'
import { userSpeedDial8Reducer } from './user-speed-dial-8'
import { userUserInterceptReducer } from './user-intercept'
import { sessionReducer, loadSessionFromStorage, clearSession } from './session'
import { loadModules, uiModulesReducer } from './ui-modules'
import { loadSettings, uiSettingsReducer } from './ui-settings'

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    userRegistration: userRegistrationReducer,
    userServices: userServicesReducer,
    userSpeedDial8: userSpeedDial8Reducer,
    userIntercept: userUserInterceptReducer,
    uiModules: uiModulesReducer,
    uiSettings: uiSettingsReducer
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
      store.dispatch(loadSettings())
    ])
    return true
  } catch (error) {
    console.log('loadInitialState', error)
  }
}
