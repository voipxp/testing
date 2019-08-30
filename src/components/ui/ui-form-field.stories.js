import React from 'react'
import { UiFormField } from '.'
import { Input } from 'rbx'

export default {
  title: 'Components|UiFormField',
  component: UiFormField
}

export const example = () => (
  <form>
    <UiFormField label="Field">
      <Input type="text" name="field" value="" placeholder="field" />
    </UiFormField>
  </form>
)
