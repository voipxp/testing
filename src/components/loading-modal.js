import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { UiModalLoading } from '/components/ui'

const LoadingModal = ({ showLoadingModal }) => (
  <UiModalLoading isOpen={showLoadingModal} />
)

LoadingModal.propTypes = {
  showLoadingModal: PropTypes.bool.isRequired
}

const mapState = ({ ui }) => ({ showLoadingModal: ui.showLoadingModal })
export default connect(mapState)(LoadingModal)
