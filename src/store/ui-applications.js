import { createAction, createReducer } from 'redux-starter-kit'
import { useSelector } from 'react-redux'
import { useAction } from './hooks'
import uiApplicationsApi from '@/api/ui/applications'

const initialState = []
const load = createAction('UI_APPLICATIONS_LOAD')

export const uiApplicationsReducer = createReducer(initialState, {
  [load]: (state, { payload = [] }) => payload
})

export const loadApplications = () => async dispatch => {
  const applications = await uiApplicationsApi.get()
  dispatch(load(applications))
}

export const useUiApplications = () => {
  return {
    applications: useSelector(state => state.uiApplications),
    loadApplications: useAction(loadApplications)
  }
}
