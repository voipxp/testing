import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'rbx'
import { UiSpinner } from './ui-spinner'

export const UiModalLoading = ({ isOpen = false }) => {
  if (!isOpen) return null
  return (
    <div className="modal is-active">
      <Modal.Background />
      <Modal.Content>
        <UiSpinner />
      </Modal.Content>
    </div>
  )
}

UiModalLoading.propTypes = {
  isOpen: PropTypes.bool.isRequired
}

export default UiModalLoading
