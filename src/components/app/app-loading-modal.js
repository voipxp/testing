import React from 'react'
import { UiLoadingModal } from '@/components/ui'
import { useApp } from '@/graphql'

export const AppLoadingModal = () => {
  const data = useApp()
  return <UiLoadingModal isOpen={data.loading} />
}
