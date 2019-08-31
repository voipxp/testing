import React from 'react'
import PropTypes from 'prop-types'
import { Field, Label, Control, Column } from 'rbx'
import { UiButton } from './ui-button'

/**
 * A form field wrapper that ensures proper spacing and labels.  If passed **horizontal** the labels and input will be presented on the same line.
 */
export const UiFormField = ({ label, children, horizontal = false }) => {
  return horizontal ? (
    <UiFormFieldHorizontal label={label}>{children}</UiFormFieldHorizontal>
  ) : (
    <UiFormFieldVertical label={label}>{children}</UiFormFieldVertical>
  )
}
UiFormField.propTypes = {
  /** Present the label and field horizontally */
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
