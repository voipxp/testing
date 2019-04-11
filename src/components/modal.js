/*
  Ideas:
    - render prop with onDelete, onSave, onCancel

  Transitions
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import cx from 'classnames'
import { CSSTransition } from 'react-transition-group'

const StyledModal = styled.div`
  flex-direction: column;
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
`

const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <CSSTransition classNames="modal" timeout={300} in={isOpen}>
      <StyledModal className={cx('modal', { 'is-active': isOpen })}>
        <div className="modal-background" onClick={onClose} />
        <div className="modal-card animated">
          <header className="modal-card-head">
            <p className="modal-card-title">{title}</p>
            <button className="delete" aria-label="close" onClick={onClose} />
          </header>
          <section className="modal-card-body">{isOpen && children}</section>
          <footer className="modal-card-foot" />
        </div>
      </StyledModal>
    </CSSTransition>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string.isRequired,
  children: PropTypes.any
}

export default Modal
