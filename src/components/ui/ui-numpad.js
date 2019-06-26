import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button } from 'rbx'

const buttonMap = [
  {
    id: 1,
    name: '1',
    isClicked: false
  },
  {
    id: 2,
    name: '2',
    isClicked: false
  },
  {
    id: 3,
    name: '3',
    isClicked: false
  },
  {
    id: 4,
    name: '4',
    isClicked: false
  },
  {
    id: 5,
    name: '5',
    isClicked: false
  },
  {
    id: 6,
    name: '6',
    isClicked: false
  },
  {
    id: 7,
    name: '7',
    isClicked: false
  },
  {
    id: 8,
    name: '8',
    isClicked: false
  },
  {
    id: 9,
    name: '9',
    isClicked: false
  },
  {
    id: 10,
    name: '0',
    isClicked: false
  },
  {
    id: 11,
    name: '*',
    isClicked: false
  },
  {
    id: 12,
    name: '#',
    isClicked: false
  }
]

export const UiNumpad = props => {
  const buttonSelect = e => {
    document.querySelector(`#${e.target.id}`).classList.remove('is-outlined')
    document.querySelector(`#${e.target.id}`).classList.add('is-selected')
    document.querySelector(`#${e.target.id}`).setAttribute('disabled', true)
    buttonMap.forEach(button => {
      return button.name === e.target.textContent
        ? (button.isClicked = true)
        : null
    })
    props.buttonSelect(e)
  }

  return (
    <Box style={{ width: '250px' }}>
      <Button.Group onClick={buttonSelect}>
        {buttonMap.map(button => (
          <Button
            id={`button_${button.id}`}
            rounded
            outlined
            color="link"
            key={button.name}
          >
            {button.name}
          </Button>
        ))}
      </Button.Group>
    </Box>
  )
}

UiNumpad.propTypes = {
  buttonSelect: PropTypes.func.isRequired
}
