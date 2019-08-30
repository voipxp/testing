import { UiFormField, UiFormError } from '@/components/ui'
import { useForm } from '@/utils'
import { Button, Input } from 'rbx'
import React from 'react'

export default {
  title: 'Hooks|useForm'
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
