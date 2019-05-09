import { createSlice } from 'redux-starter-kit'
import { useReduxState } from 'reactive-react-redux'
import { useAction } from './hooks'
import uiTemplateApi from '@/api/ui/template'

/*
  state.uiTemplate = {}
*/
const { actions, reducer } = createSlice({
  slice: 'ui',
  initialState: {},
  reducers: {
    setTemplate: (state, { payload = {} }) => payload
  }
})

export { reducer as uiTemplateReducer }

export const loadTemplate = () => async dispatch => {
  const template = await uiTemplateApi.get()
  document.title = (template && template.pageTitle) || 'odin Web'
  dispatch(actions.setTemplate(template))
}

export const useUiTemplate = () => {
  const state = useReduxState()
  return {
    template: state.uiTemplate,
    loadTemplate: useAction(loadTemplate)
  }
}
