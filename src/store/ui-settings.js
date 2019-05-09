import { createAction, createReducer } from 'redux-starter-kit'
import { useReduxState } from 'reactive-react-redux'
import { useAction } from './hooks'
import uiSettingsApi from '@/api/ui/settings'

const initialState = {}
const set = createAction('UI_SETTINGS_LOAD')

export const uiSettingsReducer = createReducer(initialState, {
  [set]: (state, { payload = {} }) => payload
})

export const loadSettings = () => async dispatch => {
  const settings = await uiSettingsApi.get()
  dispatch(set(settings))
}

export const useUiSettings = () => {
  const state = useReduxState()
  return {
    settings: state.uiSettings,
    loadSettings: useAction(loadSettings)
  }
}
