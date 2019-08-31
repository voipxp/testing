import React from 'react'
import { UiFormField, UiFormError } from '@/components/ui'
import { Button, Input } from 'rbx'
import { useForm } from '.'

const notes = `
Form helper to handle onChange events and track the validity of the form. Pass in a formRef to enable validations, then utilize HTML5 validation attributes on your inputs.

useForm returns a an object with the initial form object, an ability to update the form object, an onchange handler, and whether or not the form is valid, and an object containing any errors. The errors are identified by the input name.

    const { form, setForm, onChange, isValid, errors } = useForm(initialState, formRef)
`

export default {
  title: 'Hooks|useForm',
  parameters: { notes }
}

export const example = () => {
  const UseFormExample = () => {
    const formRef = React.useRef()
    const initialState = { firstName: '', lastName: '', age: '' }
    const { form, onChange, isValid, errors } = useForm(initialState, formRef)
    return (
      <form ref={formRef} onSubmit={e => e.preventDefault()}>
        <UiFormField label="First Name" horizontal>
          <Input
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={onChange}
            value={form.firstName}
            minLength={5}
          />
          <UiFormError message={errors.firstName} />
        </UiFormField>
        <UiFormField label="Last Name" horizontal>
          <Input
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={onChange}
            value={form.lastName}
            minLength={5}
          />
          <UiFormError message={errors.lastName} />
        </UiFormField>
        <UiFormField label="Age" horizontal>
          <Input
            type="number"
            placeholder="Age"
            name="age"
            onChange={onChange}
            value={form.age}
            max={10}
          />
          <UiFormError message={errors.age} />
        </UiFormField>
        <Button color="link" type="submit" disabled={!isValid}>
          Submit
        </Button>
      </form>
    )
  }
  return <UseFormExample />
}
