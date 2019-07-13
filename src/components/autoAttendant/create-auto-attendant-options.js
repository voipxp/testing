import React from 'react'
import PropTypes from 'prop-types'
import { useReduxDispatch } from 'reactive-react-redux'
import { Title, Dropdown, Column, Box, Button, Icon } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserFriends,
  faUsersCog,
  faSmileBeam,
  faEnvelope,
  faAngleDown,
  faCheck
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
  const [showOptionsIcon, setShowOptionsIcon] = React.useState(false)
  const [optionsValue, setOptionsValue] = React.useState(0)
  const [nameDropdownValue, setNameDropdownValue] = React.useState('')

  const optionSelect = key => {
    const textContent = optionsData.find(element =>
      element.key === key ? element : null
    ).tag
    setOptionsValue(textContent)
    setShowOptionsValue(true)
    setShowOptions(false)
  }

  const nameSelect = e => {
    e.preventDefault()
    setNameDropdownValue(e.target.textContent)
  }

  const saveNameNumber = () => {
    optionsData.map(option =>
      option.tag === optionsValue
        ? dispatch(
            saveOption({
              option: nameDropdownValue,
              digit: props.digitPressed,
              key: option.key
            })
          )
        : null
    )
    setShowOptionsValue(false)
    setShowOptionsIcon(true)
    props.optionSelect()
  }

  return (
    <Column>
      {showOptions ? (
        <Box style={{ width: '350px' }}>
          <Button.Group>
            {optionsData.map(option => (
              <Button
                rounded
                outlined
                color="link"
                key={`${props.digitPressed}_${option.key}`}
                onClick={() => optionSelect(option.key)}
              >
                <Icon>
                  <FontAwesomeIcon icon={option.icon} />
                </Icon>
                <span>{option.tag}</span>
              </Button>
            ))}
          </Button.Group>
        </Box>
      ) : null}

      {showOptionsValue ? (
        <Box style={{ maxWidth: '250px' }}>
          <Column.Group>
            <Column>
              <Column.Group>
                <Column>
                  <Title align="center">{optionsValue}</Title>
                </Column>
              </Column.Group>

              <Column.Group>
                <Column>
                  <Dropdown align="centered">
                    <Dropdown.Trigger>
                      <Button>
                        <span>
                          {nameDropdownValue || `Select ${optionsValue}...`}
                        </span>
                        <Icon size="small">
                          <FontAwesomeIcon icon={faAngleDown} />
                        </Icon>
                      </Button>
                    </Dropdown.Trigger>
                    <Dropdown.Menu onClick={nameSelect}>
                      <Dropdown.Content>
                        <Dropdown.Item>Name 1 (Number 1)</Dropdown.Item>
                        <Dropdown.Item>Name 2 (Number 2)</Dropdown.Item>
                        <Dropdown.Item>Name 3 (Number 3)</Dropdown.Item>
                        <Dropdown.Item>Name 4 (Number 4)</Dropdown.Item>
                      </Dropdown.Content>
                    </Dropdown.Menu>
                  </Dropdown>
                </Column>
              </Column.Group>

              {nameDropdownValue ? (
                <Column.Group>
                  <Column offset={3}>
                    <Button color="success" onClick={saveNameNumber}>
                      <Icon size="small">
                        <FontAwesomeIcon icon={faCheck} />
                      </Icon>
                      <span>Save</span>
                    </Button>
                  </Column>
                </Column.Group>
              ) : null}
            </Column>
          </Column.Group>
        </Box>
      ) : null}

      {showOptionsIcon
        ? optionsData.map(option =>
            option.tag === optionsValue ? (
              <Button
                static
                value={option.key}
                rounded
                outlined
                color="link"
                key={`${props.digitPressed}_${option.key}`}
              >
                <Icon>
                  <FontAwesomeIcon icon={option.icon} />
                </Icon>
                <span>{nameDropdownValue}</span>
              </Button>
            ) : null
          )
        : null}
    </Column>
  )
}

CreateAutoAttendantOptions.propTypes = {
  optionSelect: PropTypes.func.isRequired,
  digitPressed: PropTypes.string
}
