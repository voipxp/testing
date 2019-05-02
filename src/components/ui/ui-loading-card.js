import React from 'react'
import { Card } from 'rbx'
import { UiLoading } from '.'

export const UiLoadingCard = () => (
  <Card>
    <Card.Content>
      <UiLoading />
    </Card.Content>
  </Card>
)

export default UiLoadingCard
