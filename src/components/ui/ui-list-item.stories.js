import React from 'react'
import { UiSection, UiListItem } from '.'

export default {
  title: 'Components|UiListItem',
  component: UiListItem
}

export const Example = () => (
  <>
    <UiSection title="Section 1">
      <UiListItem label="Section 1 - Label 1">Section 1 - Value 1</UiListItem>
      <UiListItem label="Section 1 - Label 2">Section 1 - Value 2</UiListItem>
    </UiSection>
    <UiSection title="Section 2">
      <UiListItem label="Section 2 - Label 1">Section 2 - Value 1</UiListItem>
      <UiListItem label="Section 2 - Label 2">Section 2 - Value 2</UiListItem>
    </UiSection>
  </>
)
