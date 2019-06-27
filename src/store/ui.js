import { createAction, createReducer } from 'redux-starter-kit'
import { useSelector } from 'react-redux'

const initialState = {
  initialized: false,
  loading: false
}
export const setInitialized = createAction('UI_INITIALIZED')

export const uiReducer = createReducer(initialState, {
  [setInitialized]: (state, { payload }) => {
    state.initialized = payload
  }
})

export const useUi = () => {
  return {
    initialized: useSelector(state => state.ui.initialized),
    loading: useSelector(state => state.ui.loading)
  }
}
