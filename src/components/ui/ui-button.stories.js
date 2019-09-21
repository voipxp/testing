import React from 'react'
import { Button } from 'rbx'
import { UiButton } from '.'

export default {
  title: 'Components|UiButton',
  component: UiButton
}

export const Example = () => (
  <>
    <Button.Group align="centered">
      <UiButton>Default</UiButton>
      <UiButton icon="check" color="dark" state="loading">
        Load
      </UiButton>
      <UiButton icon="edit" color="link" rounded>
        Round
      </UiButton>
      <UiButton icon="check" color="success">
        Check
      </UiButton>
      <UiButton icon="delete" color="danger" outlined>
        Outline
      </UiButton>
      <UiButton static>Static</UiButton>
      <UiButton disabled color="info">
        Disabled
      </UiButton>
    </Button.Group>
    <Button.Group align="centered">
      <UiButton icon="bulk" size="small" color="link">
        Small
      </UiButton>
      <UiButton icon="download" color="danger">
        Normal
      </UiButton>
      <UiButton icon="edit" size="medium" color="primary">
        Medium
      </UiButton>
      <UiButton icon="cogs" size="large" color="warning">
        Large
      </UiButton>
    </Button.Group>
    <UiButton
      fullwidth
      size="large"
      color="dark"
      icon="target"
      rounded
      outlined
    >
      Large Rounded Outlined Fullwidth Icon
    </UiButton>
  </>
)
