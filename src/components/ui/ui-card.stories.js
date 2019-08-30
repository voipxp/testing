import React from 'react'
import { UiButton, UiCard } from '.'

export default {
  title: 'Components|UiCard',
  component: UiCard
}

export const example = () => (
  <UiCard
    title="Card Title"
    buttons={
      <>
        <UiButton color="info" icon="add" size="small" />
        <UiButton color="light" icon="cancel" size="small" />
      </>
    }
  >
    <p>This is a child paragraph</p>
  </UiCard>
)
