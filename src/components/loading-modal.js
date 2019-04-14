import React from 'react'
import { Modal } from 'rbx'
import { connect } from 'react-redux'
import Spinner from './spinner'
import PropTypes from 'prop-types'

function LoadingModal({ showLoadingModal }) {
  return (
    <Modal active={showLoadingModal}>
      <Modal.Background />
      <Modal.Content>
        <Spinner />
      </Modal.Content>
    </Modal>
  )
}

LoadingModal.propTypes = {
  showLoadingModal: PropTypes.bool
}

const mapState = ({ ui }) => ({
  showLoadingModal: ui.showLoadingModal
})

export default connect(mapState)(LoadingModal)
