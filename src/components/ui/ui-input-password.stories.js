import React from 'react'
import { UiInputPassword } from './ui-input-password'
import { Button, Label } from 'rbx'

export default {
  title: 'Components|UiInputPassword',
  component: UiInputPassword
}

export const example = () => {
  const PasswordExample = () => {
    const formRef = React.useRef()
    const [form, setForm] = React.useState({ password: '' })
    const [formValid, setFormValid] = React.useState(false)
    const generatePassword = () => '123456'

    React.useEffect(() => {
      if (formRef.current) setFormValid(formRef.current.checkValidity())
    }, [form])

    const handleChange = e => {
      const { name, value } = e.target
      setForm({ ...form, [name]: value })
    }

    return (
      <form ref={formRef} onSubmit={e => e.preventDefault()}>
        <Label>New Password</Label>
        <UiInputPassword
          name="password"
          label="Password"
          onChange={handleChange}
          value={form.password}
          minLength={5}
          required
          onGeneratePassword={generatePassword}
        />
        <Button color="link" type="submit" disabled={!formValid}>
          Submit
        </Button>
      </form>
    )
  }
  return <PasswordExample />
}
