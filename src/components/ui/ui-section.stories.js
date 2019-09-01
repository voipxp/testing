import React from 'react'
import { UiSection, UiListItem } from '.'

export default {
  title: 'Components|UiSection',
  component: UiSection
}

export const Example = () => (
  <>
    <UiSection title="Section 1">
      <UiListItem label="Section 1 - Label 1">Section 1 - Value 1</UiListItem>
      <UiListItem label="Section 1 - Label 2">Section 1 - Value 2</UiListItem>
    </UiSection>
    <UiSection title="Section 2">
      <p>This is a paragraph</p>
    </UiSection>
  </>
)
