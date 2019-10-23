import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledPolyDownLastMenuArrow = styled.svg`
  width: 120px;
  height: 40px;
  overflow: visible;
`

const coordinate1 = [
  {
    key: 1,
    value: 165
  },
  {
    key: 2,
    value: 140
  },
  {
    key: 3,
    value: 140
  }
]

const coordinate3 = [
  {
    key: 1,
    value: 70
  },
  {
    key: 2,
    value: 70
  },
  {
    key: 3,
    value: 70
  }
]

export const UiPolyDownLastMenuArrow = props => {
  const firstTwoCoordinates = coordinate1.find(
    element => element.key === props.menuNumber
  ).value

  const lastTwoCoordinates = coordinate3.find(
    element => element.key === props.menuNumber
  ).value
  const fromPoint = `${firstTwoCoordinates -
    120 * props.arrowNumber},-10 ${firstTwoCoordinates -
    120 *
      props.arrowNumber},25 ${lastTwoCoordinates},15 ${lastTwoCoordinates},30`
  const toPoint = `${firstTwoCoordinates -
    120 * props.arrowNumber},-10 ${firstTwoCoordinates -
    120 *
      props.arrowNumber},25 ${lastTwoCoordinates},25 ${lastTwoCoordinates},50`
  return (
    <StyledPolyDownLastMenuArrow>
      <defs>
        <marker
          id="poly-down-last-menu-arrow"
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
        markerEnd="url(#poly-down-last-menu-arrow)"
      >
        <animate
          attributeName="points"
          dur="1s"
          repeatCount="1"
          from={fromPoint}
          to={toPoint}
        />
      </polyline>
    </StyledPolyDownLastMenuArrow>
  )
}

UiPolyDownLastMenuArrow.propTypes = {
  arrowNumber: PropTypes.number,
  menuNumber: PropTypes.number
}
