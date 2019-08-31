import React from 'react'
import { Card } from 'rbx'
import { UiLoading } from './ui-loading'

/**
 * Renders a UiLoading indicator in a UiCard
 */
export const UiLoadingCard = () => (
  <Card>
    <Card.Content>
      <UiLoading />
    </Card.Content>
  </Card>
)
