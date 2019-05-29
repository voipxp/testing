import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck, faMinus } from '@fortawesome/free-solid-svg-icons'

export const UiCheckbox = ({ isChecked }) => {
  const isUndefined = typeof isChecked === 'undefined'
  const icon = isUndefined ? faMinus : isChecked ? faCheck : faTimes
  const color = isUndefined ? 'light' : isChecked ? 'success' : 'grey-light'
  return (
    <Icon color={color}>
      <FontAwesomeIcon icon={icon} />
    </Icon>
  )
}

UiCheckbox.propTypes = {
  isChecked: PropTypes.bool
}
