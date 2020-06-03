import { createAction, createReducer } from 'redux-starter-kit'
import { useSelector } from 'react-redux'
import { useAction } from './hooks'
import uiEmailApi from '@/api/ui/email'

const initialState = []
const load = createAction('UI_EMAIL_LOAD')

export const uiEmailReducer = createReducer(initialState, {
  [load]: (state, { payload = [] }) => payload
})

export const loadEmail = () => async dispatch => {
  const email = await uiEmailApi.get()
  dispatch(load(email))
}

export const useUiEmail = () => {
  return {
    email: useSelector(state => state.uiEmail),
    loadEmail: useAction(loadEmail)
  }
}
