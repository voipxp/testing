import React from 'react'
import PropTypes from 'prop-types'
import { Label, Checkbox, Field } from 'rbx'
import cuid from 'cuid'

export const UiInputCheckbox = ({
  label,
  name,
  checked,
  onChange,
  children,
  ...rest
}) => {
  const ref = React.useRef()
  const [id, setId] = React.useState()

  React.useEffect(() => {
    setId(cuid())
  }, [])

  React.useEffect(() => {
    ref.current.indeterminate = checked === undefined
  }, [checked])

  return (
    <Field>
      <Checkbox
        className="is-checkradio"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        onClick={() => ref.current.blur()}
        ref={ref}
        {...rest}
      />
      <Label htmlFor={id}>{label}</Label>
    </Field>
  )
}
UiInputCheckbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.any
}
