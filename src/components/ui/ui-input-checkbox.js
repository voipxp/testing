import React from 'react'
import PropTypes from 'prop-types'
import { Label, Checkbox, Field } from 'rbx'
import cuid from 'cuid'

export const UiInputCheckbox = ({
  label,
  name,
  checked = false,
  onChange,
  children,
  ...rest
}) => {
  const ref = React.useRef()
  const [id, setId] = React.useState()

  React.useEffect(() => {
    setId(cuid())
  }, [])

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
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  children: PropTypes.any
}
