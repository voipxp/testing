import { configureStore } from 'redux-starter-kit'
import { userRegistrationReducer } from './user-registration'
import { userSpeedDial8Reducer } from './user-speed-dial-8'

export const store = configureStore({
  reducer: {
    userRegistration: userRegistrationReducer,
    userSpeedDial8: userSpeedDial8Reducer
  },
  devTools: process.env.NODE_ENV !== 'production'
})
