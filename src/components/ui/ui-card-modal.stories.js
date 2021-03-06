import React from 'react'
import { UiButton, UiCardModal } from '.'

export default {
  title: 'Components|UiCardModal',
  component: UiCardModal
}

export const Example = () => {
  const [showModal, setShowModal] = React.useState(false)
  return (
    <>
      <UiButton onClick={() => setShowModal(true)}>Show Modal</UiButton>
      <UiCardModal
        title="Example Modal"
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={() => setShowModal(false)}
        onDelete={() => setShowModal(false)}
        saveText="Custom Save"
      >
        <p>Children Content Goes Here. It can be html or another Component</p>
      </UiCardModal>
    </>
  )
}
