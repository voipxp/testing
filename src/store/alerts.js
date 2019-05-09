import { createSlice } from 'redux-starter-kit'
import { useCallback } from 'react'
import { useReduxDispatch, useReduxState } from 'reactive-react-redux'
import cuid from 'cuid'

/*
  state.alerts = [
    { id, type, message }
  ]
*/
const { actions, reducer } = createSlice({
  slice: 'alerts',
  initialState: [],
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

export { reducer as alertsReducer }

const parse = message => {
  if (!message) return 'Unknown Error'
  if (message.data) return parse(message.data)
  const error = message.error || message.message || message
  return error.toString()
}

const alert = (type, msg, timeout = 3000) => {
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

export const useAlerts = () => {
  const state = useReduxState()
  const dispatch = useReduxDispatch()
  return {
    alerts: state.alerts,
    removeAlert: useCallback((...args) => dispatch(removeAlert(...args)), [
      dispatch
    ]),
    alertPrimary: useCallback((...args) => dispatch(alertPrimary(...args)), [
      dispatch
    ]),
    alertLink: useCallback((...args) => dispatch(alertLink(...args)), [
      dispatch
    ]),
    alertInfo: useCallback((...args) => dispatch(alertInfo(...args)), [
      dispatch
    ]),
    alertSuccess: useCallback((...args) => dispatch(alertSuccess(...args)), [
      dispatch
    ]),
    alertWarning: useCallback((...args) => dispatch(alertWarning(...args)), [
      dispatch
    ]),
    alertDanger: useCallback((...args) => dispatch(alertDanger(...args)), [
      dispatch
    ])
  }
}
