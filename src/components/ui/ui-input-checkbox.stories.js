import React from 'react'
import { UiInputCheckbox } from './ui-input-checkbox'

export default {
  title: 'Components|UiInputCheckbox',
  component: UiInputCheckbox
}

export const example = () => (
  <>
    <UiInputCheckbox
      name="check1"
      label="Not Checked"
      checked={false}
      onChange={() => console.log('check1')}
    />
    <UiInputCheckbox name="check2" label="Indeterminate" onChange={() => console.log('check2')} />
    <UiInputCheckbox
      name="check3"
      label="Checked"
      checked={true}
      onChange={() => console.log('check3')}
    />
    <UiInputCheckbox
      name="check4"
      label="Loading"
      checked={false}
      loading
      onChange={() => console.log('check4')}
    />
    <UiInputCheckbox
      disabled
      name="check5"
      label="Disabled"
      checked={false}
      onChange={() => console.log('check5')}
    />
  </>
)
