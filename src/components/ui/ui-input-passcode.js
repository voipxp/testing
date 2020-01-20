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
 * Displays a passcode input and a repeat passcode input field, with an option of displaying the passcode. Provide an **onGeneratePasscode** callback to automatically generate the passcode.
 *
 * You may pass any ordinary input field properties through such as **required**, **minLength**, **disabled**, etc..
 */
export const UiInputPasscode = ({
  required = false,
  onGeneratePasscode,
  ...props
}) => {
  const [showPasscode, setShowPasscode] = React.useState(false)
  const [repeatPasscode, setRepeatPasscode] = React.useState('')
  const [passcodeValid, setPasscodeValid] = React.useState(false)
  const [repeatPasscodeValid, setRepeatPasscodeValid] = React.useState(false)
  const [pattern, setPattern] = React.useState('')

  const passcodeRef = React.useRef()
  const repeatPasscodeRef = React.useRef()

  const validatePasscodes = () => {
    setTimeout(() => {
      setPasscodeValid(passcodeRef.current.validity.valid)
      setRepeatPasscodeValid(repeatPasscodeRef.current.validity.valid)
    }, 0)
  }

  const handlePasscode = e => {
    setPattern(escapeRegExp(e.target.value))
    validatePasscodes()
    props.onChange(e)
  }

  const handleRepeatPasscode = e => {
    setRepeatPasscode(e.target.value)
    validatePasscodes()
    props.onChange({ target: { name: props.name, value: props.value } })
  }

  const handleGeneratePasscode = async e => {
    e.preventDefault()
    const newPasscode = await onGeneratePasscode()
    setPattern(escapeRegExp(newPasscode))
    setRepeatPasscode(newPasscode)
    validatePasscodes()
    props.onChange({ target: { name: props.name, value: newPasscode } })
  }

  const toggleShowPasscode = e => {
    e.preventDefault()
    setShowPasscode(!showPasscode)
  }

  return (
    <>
      <Field kind="addons">
        <Control expanded iconRight>
          <Input
            {...props}
            placeholder="Passcode"
            required={required}
            ref={passcodeRef}
            type={showPasscode ? 'text' : 'passcode'}
            onChange={handlePasscode}
            autoCapitalize="off"
          />
          <Icon
            align="right"
            size="medium"
            color={passcodeValid ? 'success' : 'light-grey'}
          >
            <FontAwesomeIcon
              icon={passcodeValid ? faCheck : faExclamationTriangle}
            />
          </Icon>
        </Control>
        <Control>
          <Button color="link" onClick={handleGeneratePasscode}>
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
            placeholder="Repeat Passcode"
            ref={repeatPasscodeRef}
            type={showPasscode ? 'text' : 'passcode'}
            name={`${props.name}-validation`}
            value={repeatPasscode}
            onChange={handleRepeatPasscode}
            pattern={pattern}
            required={required || props.value}
            autoCapitalize="off"
          />
          <Icon
            align="right"
            size="medium"
            color={repeatPasscodeValid ? 'success' : 'light-grey'}
          >
            <FontAwesomeIcon
              icon={repeatPasscodeValid ? faCheck : faExclamationTriangle}
            />
          </Icon>
        </Control>
        <Control>
          <Button color="link" onClick={toggleShowPasscode}>
            <Icon>
              <FontAwesomeIcon icon={showPasscode ? faEye : faEyeSlash} />
            </Icon>
          </Button>
        </Control>
      </Field>
    </>
  )
}

UiInputPasscode.propTypes = {
  /** Name of the field */
  name: PropTypes.string.isRequired,
  /** Callback with change results */
  onChange: PropTypes.func.isRequired,
  /** Callback to generate the passcode */
  onGeneratePasscode: PropTypes.func.isRequired,
  /** Value of the field */
  value: PropTypes.string.isRequired,
  /** If the value is required */
  required: PropTypes.bool
}
