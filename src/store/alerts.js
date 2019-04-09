/*
  state.alerts: [
    { id, type, message }
  ]
*/

import { createSlice } from 'redux-starter-kit'
import cuid from 'cuid'

const initialState = []

const slice = createSlice({
  slice: 'alerts',
  initialState,
  reducers: {
    addAlert: (state, { payload }) => {
      state.push(payload)
    },
    removeAlert: (state, { payload = {} }) => {
      const id = payload.id || payload
      return state.filter(alert => alert.id !== id)
    }
  }
})

const { actions, reducer } = slice

function parse(message) {
  if (!message) return 'Unknown Error'
  if (message.data) return parse(message.data)
  const error = message.error || message.message || message
  return error.toString()
}

function alert(type, msg, timeout = 3000) {
  return async dispatch => {
    const alert = { id: cuid(), type, message: parse(msg) }
    dispatch(actions.addAlert(alert))
    setTimeout(() => dispatch(actions.removeAlert(alert)), timeout)
  }
}

export const { removeAlert } = actions
export const alertPrimary = msg => alert('primary', msg)
export const alertLink = msg => alert('link', msg)
export const alertInfo = msg => alert('info', msg)
export const alertSuccess = msg => alert('success', msg)
export const alertWarning = msg => alert('warning', msg, 5000)
export const alertDanger = msg => alert('danger', msg, 10000)

export default reducer
