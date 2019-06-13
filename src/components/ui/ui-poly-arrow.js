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

const StyledPolyArrow = styled.svg`
  width: 20px;
  height: 40px;
  animation: ${rotate} 2s ease;
  animation-fill-mode: forwards;
  overflow: visible;
`

export const UiPolyArrow = () => {
  return (
    <StyledPolyArrow>
      <defs>
        <marker
          id="poly-arrow"
          markerWidth="4"
          markerHeight="8"
          refX="0"
          refY="1"
          viewBox="0 0 1 2"
        >
          <polygon points="0,0 1,1 0,2" fill="#3273dc" stroke="none" />
        </marker>
      </defs>
      <polyline
        points="0,40 20,40 20,0 80,0"
        fill="white"
        stroke="#3273dc"
        strokeWidth="2"
        markerEnd="url(#poly-arrow)"
      />
    </StyledPolyArrow>
  )
}
