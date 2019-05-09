import React from 'react'
import { useLoadingModal } from '@/store/ui'
import { UiLoadingModal } from '@/components/ui'

export const AppLoadingModal = () => {
  const { isLoadingModalOpen } = useLoadingModal()
  return <UiLoadingModal isOpen={isLoadingModalOpen} />
}
