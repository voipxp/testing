/*
  Ideas:
    - render prop with onDelete, onSave, onCancel
*/
import React, { useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Modal, Delete } from 'rbx'
import { CSSTransition } from 'react-transition-group'

const TIMEOUT = 300

const StyledModal = styled.div`
  flex-direction: column;
  &modal {
    flex-direction: column;
  }
  &.modal-card {
    overflow-y: visible;
  }
  &.modal-card-body {
    position: relative;
  }
  &.modal-card-foot {
    justify-content: flex-end !important;
  }
  &.modal-enter {
    animation-name: fadeIn;
    animation-duration: 350ms;
  }
  &.modal-enter .modal-card {
    animation-name: zoomIn;
    animation-duration: 350ms;
  }
  &.modal-exit {
    display: flex !important;
    animation-name: fadeOut;
    animation-duration: 350ms;
  }
  &.modal-exit .modal-card {
    animation-name: zoomOut;
    animation-duration: 350ms;
  }
  @media (min-width: 769px) {
    .modal-content,
    .modal-card {
      margin: 0 auto;
      max-height: calc(100vh - 40px);
      max-width: calc(100% - 80px);
      width: 800px;
    }
  }
`

/*
  Modal is immediately removed from the DOM when active is set
  to false.  In order to apply a transition we need to delay
  that.

  So, we are syncing the isOpen prop to the local state. When
  isOpen is false we set the transitionIn to false and then
  set showModal after a delay.
*/
const AnimatedModal = ({ children, isOpen, onClose, title }) => {
  const [state, setState] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState
    }),
    {
      showModal: null,
      transitionIn: null
    }
  )

  useEffect(() => {
    let timer
    if (!isOpen) {
      setState({ transitionIn: false })
      timer = setTimeout(() => setState({ showModal: false }), TIMEOUT)
    } else {
      setState({ transitionIn: true, showModal: true })
    }
    return () => clearTimeout(timer)
  }, [isOpen])

  return (
    <CSSTransition classNames="modal" timeout={TIMEOUT} in={state.transitionIn}>
      <Modal
        active={state.showModal}
        as={StyledModal}
        closeOnEsc={true}
        closeOnBlur={true}
        onClose={onClose}
      >
        <Modal.Background />
        <Modal.Card>
          <Modal.Card.Head>
            <Modal.Card.Title>{title}</Modal.Card.Title>
            <Delete />
          </Modal.Card.Head>
          <Modal.Card.Body>{isOpen && children}</Modal.Card.Body>
          <Modal.Card.Foot />
        </Modal.Card>
      </Modal>
    </CSSTransition>
  )
}

AnimatedModal.propTypes = {
  children: PropTypes.any,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string.isRequired
}

export default AnimatedModal
