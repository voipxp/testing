import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.span`
  position: relative;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
`

const Delete = styled.a`
  position: absolute !important;
  background-color: #7a7a7a !important;
  left: -10px !important;
  top: -10px !important;
  z-index: 30 !important;
  margin: 0;
  padding: 0;
`

export const UiClose = ({ onClick, children }) => (
  <>
    <Wrapper>
      <Delete className="delete" onClick={onClick} />
    </Wrapper>
    {children}
  </>
)

UiClose.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any
}
