import { createAction, createReducer } from 'redux-starter-kit'
import { useReduxState } from 'reactive-react-redux'
import { useAction } from './hooks'
import api from '@/api/user-speed-dial-8'

const initialState = {}
const load = createAction('USER_SPEED_DIAL_8_LOAD')

export const userSpeedDial8Reducer = createReducer(initialState, {
  [load]: (state, { payload }) => {
    if (payload.userId) state[payload.userId] = payload
  }
})

export const loadUserSpeedDial8 = userId => {
  return async dispatch => {
    const userSpeedDial8 = await api.show(userId)
    dispatch(load(userSpeedDial8))
    return userSpeedDial8
  }
}

export const updateUserSpeedDial8 = speedCodes => {
  return async dispatch => {
    const data = await api.update(speedCodes)
    dispatch(load(data))
    return data
  }
}

export const useUserSpeedDial8 = userId => {
  const state = useReduxState()
  return {
    user: state.userSpeedDial8[userId],
    loadUserSpeedDial8: useAction(loadUserSpeedDial8),
    updateUserSpeedDial8: useAction(updateUserSpeedDial8)
  }
}
