import { createAction, createReducer } from 'redux-starter-kit'
import { useReduxState } from 'reactive-react-redux'
import { useAction } from './hooks'
import uiTemplateApi from '@/api/ui/template'

const initialState = {}
const load = createAction('UI_TEMPLATE_LOAD')

export const uiTemplateReducer = createReducer(initialState, {
  [load]: (state, { payload = {} }) => payload
})

export const loadTemplate = () => async dispatch => {
  const template = await uiTemplateApi.get()
  document.title = (template && template.pageTitle) || 'odin Web'
  dispatch(load(template))
}

export const useUiTemplate = () => {
  const state = useReduxState()
  return {
    template: state.uiTemplate,
    loadTemplate: useAction(loadTemplate)
  }
}
