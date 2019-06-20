import React from 'react'
import PropTypes from 'prop-types'
import { useReduxDispatch } from 'reactive-react-redux'
import { Column, Control, Box, Button, Tag, Icon } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserFriends,
  faUsersCog,
  faSmileBeam,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons'
import { saveOption } from '@/store/auto-attendant'

const optionsData = [
  { key: 1, icon: faUserFriends, tag: 'Call Center' },
  { key: 2, icon: faUsersCog, tag: 'Hunt Group' },
  { key: 3, icon: faSmileBeam, tag: 'Operator' },
  { key: 4, icon: faEnvelope, tag: 'Voice Mail' }
]

export const CreateAutoAttendantOptions = props => {
  const dispatch = useReduxDispatch()

  const [showOptions, setShowOptions] = React.useState(true)
  const [showOptionsValue, setShowOptionsValue] = React.useState(false)
  const [optionsValue, setOptionsValue] = React.useState(0)

  const optionSelect = e => {
    e.preventDefault()
    setOptionsValue(e.target.value)
    setShowOptionsValue(true)
    setShowOptions(false)
    optionsData.map(option =>
      option.key === parseInt(e.target.value)
        ? dispatch(
            saveOption({ option: option.tag, digit: props.digitPressed })
          )
        : null
    )
    props.optionSelect()
  }

  return (
    <Column size={6}>
      {showOptions ? (
        <Box>
          <Button.Group>
            {optionsData.map(option => (
              <Control key={`${props.digitPressed}_${option.key}`}>
                <Button value={option.key} onClick={optionSelect}>
                  <Icon>
                    <FontAwesomeIcon icon={option.icon} />
                  </Icon>
                </Button>
                <Tag>{option.tag}</Tag>
              </Control>
            ))}
          </Button.Group>
        </Box>
      ) : null}

      {showOptionsValue
        ? optionsData.map(option => {
            return option.key === parseInt(optionsValue) ? (
              <Control key={`${props.digitPressed}_${option.key}`}>
                <Button static value={option.key}>
                  <Icon>
                    <FontAwesomeIcon icon={option.icon} />
                  </Icon>
                </Button>
                <Tag>{option.tag}</Tag>
              </Control>
            ) : null
          })
        : null}
    </Column>
  )
}

CreateAutoAttendantOptions.propTypes = {
  optionSelect: PropTypes.func.isRequired,
  digitPressed: PropTypes.string
}
