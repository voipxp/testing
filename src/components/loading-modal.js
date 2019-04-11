import React from 'react'
import PropTypes from 'prop-types'

const LoadingModal = ({ isOpen }) => {
  if (!isOpen) return null
  return (
    <div className="modal pbs-modal-spinner is-active">
      <div className="modal-background" />
      <div className="modal-content">
        <div className="spinner" />
      </div>
    </div>
  )
}

LoadingModal.propTypes = {
  isOpen: PropTypes.bool
}

export default LoadingModal
