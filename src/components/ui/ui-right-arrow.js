import React from 'react'
import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
from {
  width: 20px;
}
to {
    width: 100px;
  }
`

const StyledRightArrow = styled.svg`
  width: 20px;
  height: 40px;
  animation: ${rotate} 2s ease;
  animation-fill-mode: forwards;
  overflow: visible;
`

export const UiRightArrow = () => {
  return (
    <StyledRightArrow>
      <defs>
        <marker
          id="right-arrow"
          markerWidth="4"
          markerHeight="8"
          refX="0"
          refY="1"
          viewBox="0 0 1 2"
        >
          <polygon points="0,0 1,1 0,2" fill="#3273dc" stroke="none" />
        </marker>
      </defs>
      <line
        x1="0"
        y1="50%"
        x2="100%"
        y2="50%"
        strokeWidth="2"
        markerEnd="url(#right-arrow)"
        stroke="#3273dc"
      />
    </StyledRightArrow>
  )
}
