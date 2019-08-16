import React from 'react'
import PropTypes from 'prop-types'

export const UiFormError = ({ message }) => {
  return message ? <p className="help is-danger">{message}</p> : null
}
UiFormError.propTypes = {
  message: PropTypes.string
}
