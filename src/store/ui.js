import { createSlice } from 'redux-starter-kit'
import { setBaseUrl } from '@/api'
import uiApplicationsApi from '@/api/ui/applications'
import uiSettingsApi from '@/api/ui/settings'
import uiTemplateApi from '@/api/ui/template'
import uiModulesApi from '@/api/ui/modules'

export const apiUrl = () => {
  if (process.env.API_BASE) return process.env.API_BASE
  const port = process.env.API_PORT
  return port
    ? `${window.location.protocol}//${window.location.hostname}:${port}/api/v2`
    : '/api/v2'
}

const slice = createSlice({
  slice: 'ui',
  initialState: {
    apiUrl: '/api/v2',
    initialized: false,
    showLoadingModal: false,
    applications: [],
    modules: {},
    settings: {},
    template: {}
  },
  reducers: {
    setApiUrl: (state, { payload }) => {
      state.apiUrl = payload || apiUrl()
    },
    setInitialized: (state, { payload }) => {
      state.initialized = payload
    },
    showLoadingModal: state => {
      state.showLoadingModal = true
    },
    hideLoadingModal: state => {
      state.showLoadingModal = false
    },
    setApplications: (state, { payload }) => {
      state.applications = payload || []
    },
    setModules: (state, { payload }) => {
      state.modules = payload || {}
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

export default reducer

export const { showLoadingModal, hideLoadingModal, setInitialized } = actions

export const loadApplications = () => async dispatch => {
  const applications = await uiApplicationsApi.get()
  dispatch(actions.setApplications(applications))
}

export const loadSettings = () => async dispatch => {
  const settings = await uiSettingsApi.get()
  dispatch(actions.setSettings(settings))
}

export const loadTemplate = () => async dispatch => {
  const template = await uiTemplateApi.get()
  document.title = template.pageTitle || 'odin Web'
  dispatch(actions.setTemplate(template))
}

export const loadApiUrl = () => async dispatch => {
  const url = apiUrl()
  dispatch(actions.setApiUrl(url))
  setBaseUrl(url)
}

export const loadModules = () => async dispatch => {
  const modules = await uiModulesApi.get()
  const map = modules.reduce((obj, module) => {
    obj[module.name] = module
    return obj
  }, {})
  dispatch(actions.setModules(map))
}
