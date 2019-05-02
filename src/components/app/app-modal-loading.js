import React from 'react'
import { useReduxState } from 'reactive-react-redux'
import { UiModalLoading } from '@/components/ui'

const AppModalLoading = () => {
  const state = useReduxState()
  const { showLoadingModal } = state.ui
  return <UiModalLoading isOpen={showLoadingModal} />
}

export default AppModalLoading
