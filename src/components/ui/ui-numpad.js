import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button } from 'rbx'

export const UiNumpad = ({ buttonSelect }) => {
  return (
    <Box style={{ width: '250px' }}>
      <Button.Group onClick={buttonSelect}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '*', '#'].map(
          name => (
            <Button rounded outlined color="link" key={name}>
              {name}
            </Button>
          )
        )}
      </Button.Group>
    </Box>
  )
}

UiNumpad.propTypes = {
  buttonSelect: PropTypes.func.isRequired
}
