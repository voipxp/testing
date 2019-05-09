import React from 'react'
import { useUi } from '@/store/ui'
import { UiLoadingModal } from '@/components/ui'

export const AppLoadingModal = () => {
  const { isLoadingModalOpen } = useUi()
  return <UiLoadingModal isOpen={isLoadingModalOpen} />
}
