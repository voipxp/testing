import React from 'react'
import { Button } from 'rbx'
import { UiButton } from '.'

export default {
  title: 'Components|UiButton',
  component: UiButton
}

export const example = () => (
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
    </Button.Group>
    <Button.Group>
      <UiButton icon="edit" size="medium" color="info">
        Medium
      </UiButton>
      <UiButton icon="cogs" size="large" color="warning">
        Large
      </UiButton>
    </Button.Group>
    <UiButton fullwidth size="large">
      Large Full Width
    </UiButton>
  </>
)
