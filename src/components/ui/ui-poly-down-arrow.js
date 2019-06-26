import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledPolyDownArrow = styled.svg`
  width: 120px;
  height: 40px;
  overflow: visible;
`

export const UiPolyDownArrow = props => {
  const fromPoint = `${275 - 120 * props.arrowNumber},0 ${275 -
    120 * props.arrowNumber},25 151,25 151,40`
  const toPoint = `${275 - 120 * props.arrowNumber},0 ${275 -
    120 * props.arrowNumber},25 131,25 131,40`
  return (
    <StyledPolyDownArrow>
      <defs>
        <marker
          id="poly-down-arrow"
          markerWidth="4"
          markerHeight="8"
          refX="0"
          refY="1"
          viewBox="0 0 1 2"
          orient="auto-start-reverse"
        >
          <polygon points="0,0 1,1 0,2" fill="#3273dc" stroke="none" />
        </marker>
      </defs>
      <polyline
        points={toPoint}
        fill="white"
        stroke="#3273dc"
        strokeWidth="2"
        markerEnd="url(#poly-down-arrow)"
      >
        <animate
          attributeName="points"
          dur="1s"
          repeatCount="1"
          from={fromPoint}
          to={toPoint}
        />
      </polyline>
    </StyledPolyDownArrow>
  )
}

UiPolyDownArrow.propTypes = {
  arrowNumber: PropTypes.number
}
