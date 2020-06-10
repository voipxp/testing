import { createAction, createReducer } from 'redux-starter-kit'
import { useSelector } from 'react-redux'
import { useAction } from './hooks'
import uiResourcesApi from '@/api/ui/resources'

const initialState = []
const load = createAction('UI_RESOURCES_LOAD')

export const uiResourcesReducer = createReducer(initialState, {
  [load]: (state, { payload = [] }) => payload
})

export const loadResources = () => async dispatch => {
  const resources = await uiResourcesApi.get()
  dispatch(load(resources))
}

export const useUiResources = () => {
  return {
    resources: useSelector(state => state.uiResources),
    loadResources: useAction(loadResources)
  }
}
