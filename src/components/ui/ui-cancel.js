import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Span = styled.span`
  position: relative;
  width: 0;
  height: 0;
`

const Delete = styled.a`
  position: absolute;
  left: -10px;
  top: -10px;
  z-index: 30;
  margin: 0;
  padding: 0;
  background-color: #7a7a7a;
`

export const UiCancel = ({ onClick }) => (
  <Span onClick={onClick}>
    <Delete className="delete" />
  </Span>
)

UiCancel.propTypes = {
  onClick: PropTypes.func
}
