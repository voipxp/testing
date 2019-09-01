import React from 'react'
import { UiCheckbox } from '.'

export default {
  title: 'Components|UiCheckbox',
  component: UiCheckbox
}

export const Example = () => (
  <>
    <UiCheckbox />
    <UiCheckbox isChecked={true} />
    <UiCheckbox isChecked={false} />
  </>
)
