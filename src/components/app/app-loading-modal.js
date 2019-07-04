import React from 'react'
import { UiLoadingModal } from '@/components/ui'
import { LoadingEmitter } from '@/utils/loading'

export const AppLoadingModal = () => {
  const [loading, setLoading] = React.useState(false)
  React.useEffect(() => {
    LoadingEmitter.on('SHOW_LOADING_MODAL', () => setLoading(true))
    LoadingEmitter.on('HIDE_LOADING_MODAL', () => setLoading(false))
    return () => LoadingEmitter.removeAllListeners()
  }, [])
  return <UiLoadingModal isOpen={loading} />
}
