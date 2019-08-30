import React from 'react'
import { UiFormError } from './ui-form-error'
import { Input } from 'rbx'

export default {
  title: 'Components|UiFormError',
  component: UiFormError
}

export const example = () => (
  <form>
    <Input type="text" name="error" value="" placeholder="error" />
    <UiFormError message="This is an error" />
  </form>
)
