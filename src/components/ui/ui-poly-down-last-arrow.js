import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledPolyDownLastArrow = styled.svg`
  width: 120px;
  height: 40px;
  overflow: visible;
`

export const UiPolyDownLastArrow = props => {
  const fromPoint = `${-25 - 120 * props.arrowNumber},-20 ${-25 -
    120 * props.arrowNumber},45 ${-535 + 15 * props.arrowNumber},45 ${-535 +
    15 * props.arrowNumber},60`
  const toPoint = `${-25 - 120 * props.arrowNumber},-20 ${-25 -
    120 * props.arrowNumber},45 ${-535 + 315 * props.arrowNumber},45 ${-535 +
    315 * props.arrowNumber},60`
  return (
    <StyledPolyDownLastArrow>
      <defs>
        <marker
          id="poly-down-last-arrow"
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
        markerEnd="url(#poly-down-last-arrow)"
      >
        <animate
          attributeName="points"
          dur="1s"
          repeatCount="1"
          from={fromPoint}
          to={toPoint}
        />
      </polyline>
    </StyledPolyDownLastArrow>
  )
}

UiPolyDownLastArrow.propTypes = {
  arrowNumber: PropTypes.number
}
