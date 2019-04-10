import { createSlice } from 'redux-starter-kit'
import uiSettings from '/services/api/ui-settings'
import uiTemplate from '/services/api/ui-template'

const initialState = {
  settings: {},
  template: {},
  initialized: false
}

const slice = createSlice({
  slice: 'ui',
  initialState,
  reducers: {
    setInitialized: (state, { payload }) => {
      state.initialized = payload
    },
    setSettings: (state, { payload }) => {
      state.settings = payload || {}
    },
    setTemplate: (state, { payload }) => {
      state.template = payload || {}
    }
  }
})

const { actions, reducer } = slice
export const { setSettings, setTemplate, setInitialized } = actions

export const loadSettings = () => async dispatch => {
  const settings = await uiSettings.get()
  dispatch(setSettings(settings))
}

export const loadTemplate = () => async dispatch => {
  const template = await uiTemplate.get()
  document.title = template.pageTitle || 'odin Web'
  dispatch(setTemplate(template))
}

export default reducer
