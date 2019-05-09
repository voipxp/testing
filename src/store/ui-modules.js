import { createSlice } from 'redux-starter-kit'
import { useReduxState } from 'reactive-react-redux'
import { useAction } from './hooks'
import uiModulesApi from '@/api/ui/modules'

/*
  state.uiModules = {
    [serviceName]: {}
  }
*/
const { actions, reducer } = createSlice({
  slice: 'ui',
  initialState: {},
  reducers: {
    setModules: (state, { payload = {} }) => payload
  }
})

export { reducer as uiModulesReducer }

export const loadModules = () => async dispatch => {
  const modules = await uiModulesApi.get()
  const map = modules.reduce((obj, module) => {
    obj[module.name] = module
    return obj
  }, {})
  dispatch(actions.setModules(map))
}

export const useUiModules = () => {
  const state = useReduxState()
  return {
    modules: state.uiModules,
    loadModules: useAction(loadModules)
  }
}
