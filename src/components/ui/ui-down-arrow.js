import React from 'react'
import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
from {
  height: 20px;
}
to {
    height: 100px;
  }
`

const StyledDownArrow = styled.svg`
  width: 20px;
  height: 20px;
  animation: ${rotate} 2s ease;
  animation-fill-mode: forwards;
  overflow: visible;
`

export const UiDownArrow = () => {
  return (
    <StyledDownArrow>
      <defs>
        <marker
          id="down-arrow"
          markerWidth="4"
          markerHeight="8"
          refX="0"
          refY="1"
          viewBox="0 0 1 2"
          orient="auto-start-reverse"
        >
          <polygon points="0,0 2,0 1,2" fill="#3273dc" stroke="none" />
        </marker>
      </defs>
      <line
        x1="50%"
        y1="0"
        x2="50%"
        y2="100%"
        strokeWidth="2"
        markerEnd="url(#down-arrow)"
        stroke="#3273dc"
      />
    </StyledDownArrow>
  )
}
