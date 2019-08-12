import { configureStore } from 'redux-starter-kit'
import { userSpeedDial8Reducer } from './user-speed-dial-8'

export const store = configureStore({
  reducer: {
    userSpeedDial8: userSpeedDial8Reducer
  },
  devTools: process.env.NODE_ENV !== 'production'
})
