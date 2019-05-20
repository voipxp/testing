import { createAction, createReducer } from 'redux-starter-kit'
import { useSelector } from 'react-redux'
import { useAction } from './hooks'
import uiModulesApi from '@/api/ui/modules'

const initialState = {}
const load = createAction('UI_MODULES_LOAD')

export const uiModulesReducer = createReducer(initialState, {
  [load]: (state, { payload = {} }) => payload
})

export const loadModules = () => async dispatch => {
  const modules = await uiModulesApi.get()
  const map = modules.reduce((obj, module) => {
    obj[module.name] = module
    return obj
  }, {})
  dispatch(load(map))
}

export const useUiModules = () => {
  return {
    modules: useSelector(state => state.uiModules),
    loadModules: useAction(loadModules)
  }
}
