import React from 'react'
import PropTypes from 'prop-types'
import { Field, Label, Control, Column } from 'rbx'
import { UiButton } from './ui-button'

export const UiFormField = ({ label, children, horizontal = false }) => {
  return horizontal ? (
    <UiFormFieldHorizontal label={label}>{children}</UiFormFieldHorizontal>
  ) : (
    <UiFormFieldVertical label={label}>{children}</UiFormFieldVertical>
  )
}
UiFormField.propTypes = {
  horizontal: PropTypes.bool,
  label: PropTypes.string,
  children: PropTypes.any
}

export const UiFormFieldVertical = ({ label, children }) => (
  <Field>
    {label && <Label>{label}</Label>}
    <Control>{children}</Control>
  </Field>
)
UiFormFieldVertical.propTypes = {
  label: PropTypes.string,
  children: PropTypes.any
}

export const UiFormFieldHorizontal = ({ label, children }) => (
  <Column.Group gapSize={2}>
    <Column size="is-two-fifths">
      <UiButton static fullwidth>
        {label}
      </UiButton>
    </Column>
    <Column>{children}</Column>
  </Column.Group>
)
UiFormFieldHorizontal.propTypes = {
  label: PropTypes.string,
  children: PropTypes.any
}
