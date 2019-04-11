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
    return alert
  }
}

export const { removeAlert } = actions
export const alertPrimary = (msg, ms) => alert('primary', msg, ms)
export const alertLink = (msg, ms) => alert('link', msg, ms)
export const alertInfo = (msg, ms) => alert('info', msg, ms)
export const alertSuccess = (msg, ms) => alert('success', msg, ms)
export const alertWarning = (msg, ms = 5000) => alert('warning', msg, ms)
export const alertDanger = (msg, ms = 10000) => alert('danger', msg, ms)

export default reducer
