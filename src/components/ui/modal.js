// TODO: form validity check
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { isFunction } from 'lodash'
import { Modal, Delete, Button } from 'rbx'
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
      width: 900px;
    }
  }
`

const AnimatedModal = ({
  children,
  isOpen,
  onCancel,
  onSave,
  onDelete,
  title,
  cancelText = 'Cancel',
  saveText = 'Save',
  deleteText = 'Delete'
}) => (
  <CSSTransition
    classNames="modal"
    timeout={TIMEOUT}
    in={isOpen}
    mountOnEnter={true}
    unmountOnExit={true}
  >
    <StyledModal className="modal is-active">
      <Modal.Background />
      <Modal.Card>
        <Modal.Card.Head>
          <Modal.Card.Title>{title}</Modal.Card.Title>
          <Delete onClick={() => onCancel()} />
        </Modal.Card.Head>
        <Modal.Card.Body>{children}</Modal.Card.Body>
        <Modal.Card.Foot>
          {isFunction(onDelete) && (
            <Button color="danger" onClick={() => onDelete()}>
              {deleteText}
            </Button>
          )}
          <Button onClick={onCancel}>{cancelText}</Button>
          {isFunction(onSave) && (
            <Button color="success" onClick={() => onSave()}>
              {saveText}
            </Button>
          )}
        </Modal.Card.Foot>
      </Modal.Card>
    </StyledModal>
  </CSSTransition>
)

AnimatedModal.propTypes = {
  children: PropTypes.any,
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  title: PropTypes.string.isRequired,
  cancelText: PropTypes.string,
  saveText: PropTypes.string,
  deleteText: PropTypes.string
}

export default React.memo(AnimatedModal)
