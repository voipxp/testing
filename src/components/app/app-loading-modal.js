import React from 'react'
import { useReduxState } from 'reactive-react-redux'
import { UiLoadingModal } from '@/components/ui'

export const AppLoadingModal = () => {
  const state = useReduxState()
  const { showLoadingModal } = state.ui
  return <UiLoadingModal isOpen={showLoadingModal} />
}
