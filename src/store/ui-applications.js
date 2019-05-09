import { createSlice } from 'redux-starter-kit'
import { useReduxState } from 'reactive-react-redux'
import { useAction } from './hooks'
import uiApplicationsApi from '@/api/ui/applications'

/*
  state.uiApplications = [
    {id, ...}
  ]
*/
const { actions, reducer } = createSlice({
  slice: 'uiApplications',
  initialState: [],
  reducers: {
    setApplications: (state, { payload = [] }) => payload
  }
})

export { reducer as uiApplicationsReducer }

export const loadApplications = () => async dispatch => {
  const applications = await uiApplicationsApi.get()
  dispatch(actions.setApplications(applications))
}

export const useUiApplications = () => {
  const state = useReduxState()
  return {
    applications: state.uiApplications,
    loadApplications: useAction(loadApplications)
  }
}
