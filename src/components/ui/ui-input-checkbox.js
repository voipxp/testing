import React from 'react'
import PropTypes from 'prop-types'
import { Label, Checkbox } from 'rbx'

export const UiInputCheckbox = ({
  label,
  name,
  checked = false,
  onChange,
  children,
  ...rest
}) => (
  <div>
    <Label>
      <Checkbox
        name={name}
        checked={checked}
        onChange={onChange}
        {...rest}
        style={{ transform: 'scale(1.5)' }}
      />
      <span style={{ marginLeft: '.75rem' }}>{label}</span>
    </Label>
  </div>
)
UiInputCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  children: PropTypes.any
}
