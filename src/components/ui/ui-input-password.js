import React from 'react'
import PropTypes from 'prop-types'
import { Input, Field, Control, Button, Icon } from 'rbx'
import escapeRegExp from 'lodash/escapeRegExp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faExclamationTriangle,
  faCheck,
  faKey,
  faEye,
  faEyeSlash
} from '@fortawesome/free-solid-svg-icons'

/**
 *
 * Displays a password input and a repeat password input field, with an option of displaying the password. Provide an **onGeneratePassword** callback to automatically generate the password.
 *
 * You may pass any ordinary input field properties through such as **required**, **minLength**, **disabled**, etc..
 */
export const UiInputPassword = ({
  required = false,
  onGeneratePassword,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [repeatPassword, setRepeatPassword] = React.useState('')
  const [passwordValid, setPasswordValid] = React.useState(false)
  const [repeatPasswordValid, setRepeatPasswordValid] = React.useState(false)
  const [pattern, setPattern] = React.useState('')

  const passwordRef = React.useRef()
  const repeatPasswordRef = React.useRef()

  const validatePasswords = () => {
    setTimeout(() => {
      setPasswordValid(passwordRef.current.validity.valid)
      setRepeatPasswordValid(repeatPasswordRef.current.validity.valid)
    }, 0)
  }

  const handlePassword = e => {
    setPattern(escapeRegExp(e.target.value))
    validatePasswords()
    props.onChange(e)
  }

  const handleRepeatPassword = e => {
    setRepeatPassword(e.target.value)
    validatePasswords()
    props.onChange({ target: { name: props.name, value: props.value } })
  }

  const handleGeneratePassword = async e => {
    e.preventDefault()
    const newPassword = await onGeneratePassword()
    setPattern(escapeRegExp(newPassword))
    setRepeatPassword(newPassword)
    validatePasswords()
    props.onChange({ target: { name: props.name, value: newPassword } })
  }

  const toggleShowPassword = e => {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  return (
    <>
      <Field kind="addons">
        <Control expanded iconRight>
          <Input
            {...props}
            placeholder="Password"
            required={required}
            ref={passwordRef}
            type={showPassword ? 'text' : 'password'}
            onChange={handlePassword}
            autoCapitalize="off"
          />
          <Icon
            align="right"
            size="medium"
            color={passwordValid ? 'success' : 'light-grey'}
          >
            <FontAwesomeIcon
              icon={passwordValid ? faCheck : faExclamationTriangle}
            />
          </Icon>
        </Control>
        <Control>
          <Button color="link" onClick={handleGeneratePassword}>
            <Icon>
              <FontAwesomeIcon icon={faKey} />
            </Icon>
          </Button>
        </Control>
      </Field>
      <Field kind="addons">
        <Control expanded iconRight>
          <Input
            {...props}
            placeholder="Repeat Password"
            ref={repeatPasswordRef}
            type={showPassword ? 'text' : 'password'}
            name={`${props.name}-validation`}
            value={repeatPassword}
            onChange={handleRepeatPassword}
            pattern={pattern}
            required={required || props.value}
            autoCapitalize="off"
          />
          <Icon
            align="right"
            size="medium"
            color={repeatPasswordValid ? 'success' : 'light-grey'}
          >
            <FontAwesomeIcon
              icon={repeatPasswordValid ? faCheck : faExclamationTriangle}
            />
          </Icon>
        </Control>
        <Control>
          <Button color="link" onClick={toggleShowPassword}>
            <Icon>
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </Icon>
          </Button>
        </Control>
      </Field>
    </>
  )
}

UiInputPassword.propTypes = {
  /** Name of the field */
  name: PropTypes.string.isRequired,
  /** Callback with change results */
  onChange: PropTypes.func.isRequired,
  /** Callback to generate the password */
  onGeneratePassword: PropTypes.func.isRequired,
  /** Value of the field */
  value: PropTypes.string.isRequired,
  /** If the value is required */
  required: PropTypes.bool
}
