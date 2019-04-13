import { createSlice } from 'redux-starter-kit'
import { setBaseUrl } from '/services/api'
import uiApplications from '/services/api/ui-applications'
import uiSettings from '/services/api/ui-settings'
import uiTemplate from '/services/api/ui-template'
import uiModules from '../services/api/ui-modules'

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

export function loadApplications() {
  return async dispatch => {
    const applications = await uiApplications.get()
    dispatch(actions.setApplications(applications))
  }
}

export function loadSettings() {
  return async dispatch => {
    const settings = await uiSettings.get()
    dispatch(actions.setSettings(settings))
  }
}

export function loadTemplate() {
  return async dispatch => {
    const template = await uiTemplate.get()
    document.title = template.pageTitle || 'odin Web'
    dispatch(actions.setTemplate(template))
  }
}

export function loadApiUrl() {
  return async dispatch => {
    const url = apiUrl()
    dispatch(actions.setApiUrl(url))
    setBaseUrl(url)
  }
}

export function loadModules() {
  return async dispatch => {
    const modules = await uiModules.get()
    const map = modules.reduce((obj, module) => {
      obj[module.name] = module
      return obj
    }, {})
    dispatch(actions.setModules(map))
  }
}

export function apiUrl() {
  if (process.env.API_BASE) return process.env.API_BASE
  const port = process.env.API_PORT
  return port
    ? `${window.location.protocol}//${window.location.hostname}:${port}/api/v2`
    : '/api/v2'
}
