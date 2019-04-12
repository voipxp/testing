import React from 'react'
import { Modal } from 'rbx'
import Spinner from './spinner'
import PropTypes from 'prop-types'

const LoadingModal = ({ isOpen }) => {
  if (!isOpen) return null
  return (
    <Modal active={isOpen}>
      <Modal.Background />
      <Modal.Content>
        <Spinner />
      </Modal.Content>
    </Modal>
  )
}

LoadingModal.propTypes = {
  isOpen: PropTypes.bool
}

export default LoadingModal
