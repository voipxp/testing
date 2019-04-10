import { createSlice } from 'redux-starter-kit'
import uiTemplate from '/services/api/ui-template'

const initialState = {}

const slice = createSlice({
  slice: 'template',
  initialState,
  reducers: {
    setTemplate: (state, { payload }) => payload
  }
})

const { actions, reducer } = slice
export const { setTemplate } = actions

export const loadTemplate = () => async dispatch => {
  const template = await uiTemplate.get()
  dispatch(setTemplate(template))
}
export default reducer
