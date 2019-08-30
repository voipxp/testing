import React from 'react'
import { UiFormField } from '.'
import { Input } from 'rbx'

export default {
  title: 'Components|UiFormField',
  component: UiFormField
}

export const example = () => (
  <form>
    <UiFormField label="Vertical 1">
      <Input type="text" name="vertical1" value="" placeholder="stuff" />
    </UiFormField>
    <UiFormField label="Vertical 2">
      <Input type="text" name="vertical2" value="" placeholder="other stuff" />
    </UiFormField>
    <hr />
    <UiFormField label="Horizontal 1" horizontal>
      <Input type="text" name="horizontal1" value="" placeholder="thing" />
    </UiFormField>
    <UiFormField label="Horizontal 2" horizontal>
      <Input
        type="text"
        name="horizontal2"
        value=""
        placeholder="other thing"
      />
    </UiFormField>
  </form>
)
