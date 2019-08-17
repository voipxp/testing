import React from 'react'
import PropTypes from 'prop-types'
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
import { useAutoAttendant } from '@/store/auto-attendant'

const optionsData = [
  { key: 1, icon: faUserFriends, tag: 'Call Center' },
  { key: 2, icon: faUsersCog, tag: 'Hunt Group' },
  { key: 3, icon: faSmileBeam, tag: 'Operator' },
  { key: 4, icon: faEnvelope, tag: 'Voice Mail' }
]

export const CreateAutoAttendantOptions = props => {
  const {
    autoAttendant,
    getHuntGroups,
    getCallCenters,
    getOperators,
    saveOption
  } = useAutoAttendant()
  const [loading, setLoading] = React.useState(false)
  const [showOptions, setShowOptions] = React.useState(true)
  const [showOptionsValue, setShowOptionsValue] = React.useState(false)
  const [showOptionsIcon, setShowOptionsIcon] = React.useState(false)
  const [optionsValue, setOptionsValue] = React.useState(0)
  const [nameDropdownValue, setNameDropdownValue] = React.useState('')

  const optionSelect = key => {
    setLoading(true)
    const textContent = optionsData.find(element =>
      element.key === key ? element : null
    ).tag
    setOptionsValue(textContent)
    if (textContent === 'Hunt Group') {
      Promise.resolve(
        getHuntGroups(props.groupId, props.serviceProviderId)
      ).then(() => setLoading(false))
    } else if (textContent === 'Call Center') {
      Promise.resolve(
        getCallCenters(props.groupId, props.serviceProviderId)
      ).then(() => setLoading(false))
    } else if (textContent === 'Operator') {
      Promise.resolve(
        getOperators(props.groupId, props.serviceProviderId)
      ).then(() => setLoading(false))
    }
    if (textContent === 'Voice Mail') {
      setNameDropdownValue('Voice Mail')
      setLoading(false)
    }
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
        ? saveOption({
            optionsValue: optionsValue,
            option: nameDropdownValue,
            digit: props.digitPressed,
            key: option.key
          })
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
                      <Button state={loading ? 'loading' : ''}>
                        <span
                          style={{
                            width: '160px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {nameDropdownValue || `Select ${optionsValue}...`}
                        </span>
                        <Icon size="small">
                          <FontAwesomeIcon icon={faAngleDown} />
                        </Icon>
                      </Button>
                    </Dropdown.Trigger>
                    <Dropdown.Menu onClick={nameSelect}>
                      <Dropdown.Content>
                        {optionsValue === 'Hunt Group' &&
                          autoAttendant &&
                          autoAttendant.huntGroups &&
                          autoAttendant.huntGroups.map(huntGroup => (
                            <Dropdown.Item
                              key={huntGroup.name}
                              value={huntGroup.name}
                            >
                              {huntGroup.name}
                              {huntGroup.phoneNumber
                                ? `(${huntGroup.phoneNumber})`
                                : ''}
                            </Dropdown.Item>
                          ))}
                        {optionsValue === 'Call Center' &&
                          autoAttendant &&
                          autoAttendant.callCenters &&
                          autoAttendant.callCenters.map(callCenter => (
                            <Dropdown.Item
                              key={callCenter.name}
                              value={callCenter.name}
                            >
                              {callCenter.name}
                              {callCenter.phoneNumber
                                ? `(${callCenter.phoneNumber})`
                                : ''}
                            </Dropdown.Item>
                          ))}
                        {optionsValue === 'Operator' &&
                          autoAttendant &&
                          autoAttendant.operators &&
                          autoAttendant.operators.map(operator => (
                            <Dropdown.Item
                              key={operator.userId}
                              value={operator.userId}
                            >
                              {operator.userId}
                              {operator.phoneNumber
                                ? `(${operator.phoneNumber})`
                                : ''}
                            </Dropdown.Item>
                          ))}
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
  groupId: PropTypes.string,
  serviceProviderId: PropTypes.string,
  optionSelect: PropTypes.func.isRequired,
  digitPressed: PropTypes.string
}
