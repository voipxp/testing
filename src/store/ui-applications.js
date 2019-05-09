import { createAction, createReducer } from 'redux-starter-kit'
import { useReduxState } from 'reactive-react-redux'
import { useAction } from './hooks'
import uiApplicationsApi from '@/api/ui/applications'

const initialState = []
const set = createAction('UI_APPLICATIONS_LOAD')

export const uiApplicationsReducer = createReducer(initialState, {
  [set]: (state, { payload = [] }) => payload
})

export const loadApplications = () => async dispatch => {
  const applications = await uiApplicationsApi.get()
  dispatch(set(applications))
}

export const useUiApplications = () => {
  const state = useReduxState()
  return {
    applications: state.uiApplications,
    loadApplications: useAction(loadApplications)
  }
}
