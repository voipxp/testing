import { createSlice } from 'redux-starter-kit'
import { useReduxState } from 'reactive-react-redux'
import { useAction } from './hooks'

/*
  state.ui = {
    initialized: false,
    showLoadingModal: false
  }
*/
const { actions, reducer } = createSlice({
  slice: 'ui',
  initialState: {
    initialized: false,
    showLoadingModal: false
  },
  reducers: {
    setInitialized: (state, { payload }) => {
      state.initialized = payload
    },
    showLoadingModal: state => {
      state.showLoadingModal = true
    },
    hideLoadingModal: state => {
      state.showLoadingModal = false
    }
  }
})

export { reducer as uiReducer }

export const { showLoadingModal, hideLoadingModal, setInitialized } = actions

export const useUi = () => {
  const state = useReduxState()
  return {
    isLoadingModalOpen: state.ui.showLoadingModal,
    showLoadingModal: useAction(showLoadingModal),
    hideLoadingModal: useAction(hideLoadingModal)
  }
}
