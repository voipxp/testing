import React from 'react'
import PropTypes from 'prop-types'
import { Card, Button } from 'rbx'

/**
 * Renders a uniform Card with a title, optional buttons, and the content.
 */
export const UiCard = ({ title, helpModule, buttons, children }) => {
  return (
    <Card>
      {title && (
        <Card.Header>
          <Card.Header.Title>{title}
          { helpModule && <>&nbsp;&nbsp; {helpModule}</> }
          </Card.Header.Title>
          {buttons && (
            <Card.Header.Icon>
              <Button.Group>{buttons}</Button.Group>
            </Card.Header.Icon>
          )}
        </Card.Header>
      )}
      <Card.Content>{children}</Card.Content>
    </Card>
  )
}

UiCard.propTypes = {
  title: PropTypes.string.isRequired,
  buttons: PropTypes.any,
  children: PropTypes.any,
  helpModule: PropTypes.any,
}
