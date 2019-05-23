import React from 'react'
import PropTypes from 'prop-types'
import { Label, Checkbox, Field, Control, Column } from 'rbx'
import { UiButton } from './ui-button'

export const UiInputCheckbox = ({
  label,
  name,
  checked = false,
  onChange,
  children,
  horizontal = false
}) => {
  return horizontal ? (
    <UiInputCheckboxHorizontal
      label={label}
      name={name}
      checked={checked}
      onChange={onChange}
    >
      {children}
    </UiInputCheckboxHorizontal>
  ) : (
    <UiInputCheckboxVertical
      label={label}
      name={name}
      checked={checked}
      onChange={onChange}
    >
      {children}
    </UiInputCheckboxVertical>
  )
}
UiInputCheckbox.propTypes = {
  horizontal: PropTypes.bool,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  children: PropTypes.any
}

export const UiInputCheckboxHorizontal = ({
  label,
  name,
  checked = false,
  onChange,
  children
}) => (
  <Column.Group gapSize={2} vcentered>
    <Column size="is-two-fifths">
      <UiButton static fullwidth>
        {label}
      </UiButton>
    </Column>
    <Column>
      <Label>
        <Checkbox name={name} checked={checked} onChange={onChange} />
        &nbsp; {label}
      </Label>
    </Column>
  </Column.Group>
)
UiInputCheckboxHorizontal.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  children: PropTypes.any
}

export const UiInputCheckboxVertical = ({
  label,
  name,
  checked = false,
  onChange,
  children
}) => (
  <div>
    <Label>
      <Checkbox name={name} checked={checked} onChange={onChange} />
      &nbsp; {label}
    </Label>
  </div>
)
UiInputCheckboxVertical.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  children: PropTypes.any
}
