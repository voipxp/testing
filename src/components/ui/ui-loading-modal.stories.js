import React from 'react'
import { UiButton, UiLoadingModal } from '.'

export default {
  title: 'Components|UiLoadingModal',
  component: UiLoadingModal
}

export const example = () => {
  const UiLoadingModalExample = () => {
    const [loading, setLoading] = React.useState(false)
    const showModal = () => {
      setLoading(true)
      setTimeout(() => setLoading(false), 3000)
    }
    return (
      <>
        <UiButton onClick={showModal}>Show Modal for 3 seconds</UiButton>
        <UiLoadingModal isOpen={loading} />
      </>
    )
  }
  return <UiLoadingModalExample />
}
