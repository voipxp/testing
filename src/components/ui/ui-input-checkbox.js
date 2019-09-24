import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Label } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faMinus } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const StyledLabel = styled.label`
  :hover {
    cursor: pointer;
  }
`

/**
 * Displays a form checkbox, styled according to Odin UI styles. If **checked** is undefined, it will display as indeterminate. Label may be passed as a prop and it will wrap the element.
 */
export const UiInputCheckbox = ({
  name,
  label,
  checked,
  loading,
  disabled,
  onChange,
  ...rest
}) => {
  const ref = React.useRef()
  const isUndefined = typeof checked === 'undefined'
  const icon = isUndefined ? faMinus : (checked ? faCheck : faTimes)
  const color = checked ? 'success' : 'grey-light'
  const iconColor = checked ? null : 'grey-light'
  const state = loading ? 'loading' : null

  const sendChanges = () => {
    if (onChange) {
      onChange({ target: { type: 'checkbox', name, checked: !checked } })
    }
  }

  const handleClick = e => {
    e.preventDefault()
    sendChanges()
    ref.current.blur()
  }

  const handleKeyDown = e => {
    if (e.keyCode === 32 || e.keyCode === 13) {
      e.preventDefault()
      sendChanges()
    }
  }

  return (
    <Label as={StyledLabel}>
      <Button
        ref={ref}
        size="small"
        state={state}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={!!disabled}
        aria-pressed={!!checked}
        title={label || name}
        outlined
        color={color}
        {...rest}
      >
        <Icon color={iconColor}>
          {!loading && <FontAwesomeIcon icon={icon} />}
        </Icon>
      </Button>
      {label && <span style={{ paddingLeft: '1rem' }}>{label}</span>}
    </Label>
  )
}

UiInputCheckbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  /** Displays indeterminate if undefined */
  checked: PropTypes.bool,
  /** { target: { type: 'checkbox', name: 'name', checked: true }} */
  onChange: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool
}
