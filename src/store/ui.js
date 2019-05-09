import { createAction, createReducer } from 'redux-starter-kit'
import { useReduxState } from 'reactive-react-redux'
import { useAction } from './hooks'

const initialState = {
  initialized: false,
  loading: false
}
export const setInitialized = createAction('UI_INITIALIZED')
export const showLoadingModal = createAction('UI_LOADING_START')
export const hideLoadingModal = createAction('UI_LOADING_END')

export const uiReducer = createReducer(initialState, {
  [setInitialized]: (state, { payload }) => {
    state.initialized = payload
  },
  [showLoadingModal]: state => {
    state.loading = true
  },
  [hideLoadingModal]: state => {
    state.loading = false
  }
})

export const useUi = () => {
  const state = useReduxState()
  return {
    initialized: state.ui.initialized,
    loading: state.ui.loading,
    showLoadingModal: useAction(showLoadingModal),
    hideLoadingModal: useAction(hideLoadingModal)
  }
}
