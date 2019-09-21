import React from 'react'
import PropTypes from 'prop-types'

/**
 * A small error message that is usually displayed inside a form under an input element
 */
export const UiFormError = ({ message }) => {
  return message ? <p className="help is-danger">{message}</p> : null
}
UiFormError.propTypes = {
  message: PropTypes.string
}
