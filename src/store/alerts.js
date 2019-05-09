import { createAction, createReducer } from 'redux-starter-kit'
import { useAction } from './hooks'
import { useReduxState } from 'reactive-react-redux'
import cuid from 'cuid'

const initialState = []
const add = createAction('ALERTS_ADD')
const remove = createAction('ALERTS_REMOVE')

export const alertsReducer = createReducer(initialState, {
  [add]: (state, { payload }) => {
    state.push(payload)
  },
  [remove]: (state, { payload }) => {
    const id = payload.id || payload
    state.splice(state.findIndex(alert => alert.id === id), 1)
  }
})

export { remove as removeAlert }
export const alertPrimary = (msg, ms) => alert('primary', msg, ms)
export const alertLink = (msg, ms) => alert('link', msg, ms)
export const alertInfo = (msg, ms) => alert('info', msg, ms)
export const alertSuccess = (msg, ms) => alert('success', msg, ms)
export const alertWarning = (msg, ms = 5000) => alert('warning', msg, ms)
export const alertDanger = (msg, ms = 10000) => alert('danger', msg, ms)

export const useAlerts = () => {
  const state = useReduxState()
  return {
    alerts: state.alerts,
    removeAlert: useAction(remove),
    alertPrimary: useAction(alertPrimary),
    alertLink: useAction(alertLink),
    alertInfo: useAction(alertInfo),
    alertSuccess: useAction(alertSuccess),
    alertWarning: useAction(alertWarning),
    alertDanger: useAction(alertDanger)
  }
}

function parse(message) {
  if (!message) return 'Unknown Error'
  if (message.data) return parse(message.data)
  const error = message.error || message.message || message
  return error.toString()
}

function alert(type, msg, timeout = 3000) {
  return async dispatch => {
    const alert = { id: cuid(), type, message: parse(msg) }
    dispatch(add(alert))
    setTimeout(() => dispatch(remove(alert)), timeout)
    return alert
  }
}
