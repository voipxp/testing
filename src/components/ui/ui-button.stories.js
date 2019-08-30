import React from 'react'
import { Button } from 'rbx'
import { UiButton } from './ui-button'

export default {
  title: 'UiButton',
  component: UiButton
}

export const allButtons = () => (
  <>
    <Button.Group>
      <UiButton icon="add" size="small" color="link" />
      <UiButton icon="cancel" size="small" color="light" />
      <UiButton icon="check" color="dark" state="loading" />
      <UiButton>No Icon</UiButton>
      <UiButton icon="check" color="success">
        Check
      </UiButton>
      <UiButton icon="delete" color="danger" outlined>
        Outlined
      </UiButton>
      <UiButton static>Static</UiButton>
      <UiButton disabled color="info">
        Disabled
      </UiButton>
      <UiButton icon="edit" size="medium" color="info">
        Medium
      </UiButton>
    </Button.Group>
    <UiButton fullwidth>This is Full Width</UiButton>
  </>
)

allButtons.story = {
  name: 'All Buttons'
}
