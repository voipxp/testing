import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const Wrapper = styled.span`
  position: relative;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
`

const CloseIcon = styled.span`
  position: absolute !important;
  left: -10px !important;
  top: -10px !important;
  z-index: 30 !important;
  width: auto !important;
  height: auto !important;
  &:hover {
    cursor: pointer;
    filter: brightness(60%);
  }
`

/**
 * A simple close button that wraps the child component on the top-left corner.
 */
export const UiClose = ({ onClick }) => (
  <Wrapper>
    <Icon as={CloseIcon} onClick={onClick} color="grey">
      <FontAwesomeIcon icon={faTimesCircle} size="lg" />
    </Icon>
  </Wrapper>
)

UiClose.propTypes = {
  /** Callback when clicked */
  onClick: PropTypes.func
}
