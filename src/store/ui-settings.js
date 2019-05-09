import { createSlice } from 'redux-starter-kit'
import { useReduxState } from 'reactive-react-redux'
import { useAction } from './hooks'
import uiSettingsApi from '@/api/ui/settings'

/*
  state.uiSettings = {}
*/
const { actions, reducer } = createSlice({
  slice: 'ui',
  initialState: {},
  reducers: {
    setSettings: (state, { payload = {} }) => payload
  }
})

export { reducer as uiSettingsReducer }

export const loadSettings = () => async dispatch => {
  const settings = await uiSettingsApi.get()
  dispatch(actions.setSettings(settings))
}

export const useUiSettings = () => {
  const state = useReduxState()
  return {
    settings: state.uiSettings,
    loadSettings: useAction(loadSettings)
  }
}
