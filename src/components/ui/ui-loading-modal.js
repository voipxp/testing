import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'rbx'
import { UiLoading } from './ui-loading'

/**
 * UiLoadingModal shows a full-screen modal overlay with a spinner. Pass in the **isOpen** prop to control visibility on the screen.
 */
export const UiLoadingModal = ({ isOpen = false }) => {
  if (!isOpen) return null
  return (
    <div className="modal is-active">
      <Modal.Background />
      <Modal.Content>
        <UiLoading />
      </Modal.Content>
    </div>
  )
}

UiLoadingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired
}
