import { configureStore } from 'redux-starter-kit'
import { userRegistrationReducer } from './user-registration'
import { userServicesReducer } from './user-services'
import { userSpeedDial8Reducer } from './user-speed-dial-8'
import { userUserInterceptReducer } from './user-intercept'
import { sessionReducer, loadSessionFromStorage, clearSession } from './session'

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    userRegistration: userRegistrationReducer,
    userServices: userServicesReducer,
    userSpeedDial8: userSpeedDial8Reducer,
    userIntercept: userUserInterceptReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
})

export const loadInitialState = async () => {
  try {
    await store.dispatch(loadSessionFromStorage())
  } catch (error) {
    await store.dispatch(clearSession())
  }
}
