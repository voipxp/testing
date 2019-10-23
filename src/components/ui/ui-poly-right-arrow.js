import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledPolyRightArrow = styled.svg`
  width: 120px;
  height: 40px;
  overflow: visible;
`

export const UiPolyRightArrow = props => {
  const fromPoint = `40, ${80 - 86 * props.arrowNumber} 80,${80 -
    86 * props.arrowNumber} 80,0 120,0`
  const toPoint = `40, ${80 - 86 * props.arrowNumber} 120,${80 -
    86 * props.arrowNumber} 120,20 180,20`
  return (
    <StyledPolyRightArrow>
      <defs>
        <marker
          id="poly-right-arrow"
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
        points={toPoint}
        fill="white"
        stroke="#3273dc"
        strokeWidth="2"
        markerEnd="url(#poly-right-arrow)"
      >
        <animate
          attributeName="points"
          dur="1s"
          repeatCount="1"
          from={fromPoint}
          to={toPoint}
        />
      </polyline>
    </StyledPolyRightArrow>
  )
}

UiPolyRightArrow.propTypes = {
  arrowNumber: PropTypes.number
}
