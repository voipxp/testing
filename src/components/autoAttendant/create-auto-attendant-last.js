import React from 'react'
import { useReduxState } from 'reactive-react-redux'
import {
  Column,
  Control,
  Button,
  Icon,
  Tag,
  Box,
  Title,
  Field,
  Level
} from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserFriends,
  faUsersCog,
  faSmileBeam,
  faEnvelope,
  faPhone
} from '@fortawesome/free-solid-svg-icons'
import {
  UiDownArrow,
  UiRightArrow,
  UiPolyDownLastArrow,
  UiPolyDownLastMenuArrow
} from '@/components/ui'

const optionsData = [
  { key: 1, icon: faUserFriends, tag: 'Call Center' },
  { key: 2, icon: faUsersCog, tag: 'Hunt Group' },
  { key: 3, icon: faSmileBeam, tag: 'Operator' },
  { key: 4, icon: faEnvelope, tag: 'Voice Mail' }
]

export const CreateAutoAttendantLast = () => {
  const state = useReduxState()

  const [loading, setLoading] = React.useState(true)
  const [showMenuItem, setShowMenuItem] = React.useState()

  const completeSave = () => {
    console.log('final state :', state.autoAttendant)
  }

  React.useEffect(() => {
    setLoading(false)
  }, [])

  const polyArrow = (value, index) => (
    <UiPolyDownLastArrow key={index} arrowNumber={index} />
  )

  const findValue = (menuValue, digit) => {
    const menuArray = state.autoAttendant.digits.filter(
      digit => digit.menu === menuValue
    )
    return menuArray.findIndex(
      element => element.menu === menuValue && element.digit === digit.digit
    )
  }

  const findMenuNumber = menuValue =>
    state.autoAttendant.menu.findIndex(
      element => element.toString() === menuValue.toString()
    ) + 1

  const singleMenu = (digit, actionValue, optionValue, menuValue) => {
    return (
      <Column.Group centered>
        <Column narrow offset={1}>
          <Column.Group centered>
            <Column narrow>
              <Control>
                <UiPolyDownLastMenuArrow
                  arrowNumber={findValue(menuValue, digit)}
                  menuNumber={findMenuNumber(menuValue)}
                />
              </Control>
            </Column>
          </Column.Group>

          <Column.Group centered>
            <Column offset={1} narrow>
              <Field>
                <Control>
                  <Tag color="link">{actionValue.action}</Tag>
                </Control>
              </Field>
            </Column>
          </Column.Group>

          <Column.Group centered>
            <Column offset={1} narrow>
              <Field>
                <Control>
                  <Button static rounded outlined color="link">
                    {digit.digit}
                  </Button>
                </Control>
              </Field>
            </Column>
          </Column.Group>

          <Column.Group centered>
            <Column offset={1} narrow>
              <Control>
                <UiDownArrow />
              </Control>
            </Column>
          </Column.Group>

          <Column.Group centered>
            <Column offset={1} narrow>
              <Control>
                <Button static rounded outlined color="link">
                  <Icon>
                    <FontAwesomeIcon
                      icon={
                        optionsData.find(element =>
                          element.key === optionValue.key ? element.icon : null
                        ).icon
                      }
                    />
                  </Icon>
                  <span>
                    {optionValue.option.slice(
                      0,
                      optionValue.option.indexOf('(')
                    )}
                  </span>
                </Button>
              </Control>
            </Column>
          </Column.Group>
        </Column>
      </Column.Group>
    )
  }

  const showMenu = e => {
    e.preventDefault()
    setShowMenuItem(e.target.textContent)
  }

  return (
    <Box style={{ width: '1390px' }}>
      <Column.Group centered>
        <Column>
          <Column.Group>
            <Column offset={5}>
              <Title>Auto Attendant</Title>
            </Column>
          </Column.Group>

          <Column.Group vcentered>
            <Field horizontal>
              <Field.Body>
                <Level>
                  <Column offset={12}>
                    <Level.Item>
                      <Control>
                        <Icon size="large">
                          <FontAwesomeIcon icon={faPhone} size="2x" />
                        </Icon>
                      </Control>
                    </Level.Item>
                  </Column>

                  <Column>
                    <Level.Item>
                      <Control>
                        <UiRightArrow />
                      </Control>
                    </Level.Item>
                  </Column>

                  <Column>
                    <Level.Item>
                      <Box style={{ maxHeight: '110px' }}>
                        <Control>
                          <Tag color="link" size="medium">
                            {state.autoAttendant.profile.username}
                          </Tag>
                        </Control>
                        <Control>
                          <Tag color="link" size="medium">
                            {state.autoAttendant.profile.number}
                          </Tag>
                        </Control>
                      </Box>
                    </Level.Item>
                  </Column>
                </Level>
              </Field.Body>
            </Field>
          </Column.Group>

          <Column.Group>
            <Column>
              <Column.Group>
                <Column offset={6}>
                  {state.autoAttendant.menu.map((value, index) =>
                    polyArrow(value, index)
                  )}
                </Column>
              </Column.Group>

              <Column.Group>
                {state.autoAttendant.menu.map(menuValue => (
                  <React.Fragment key={menuValue}>
                    <Column>
                      <Column.Group>
                        <Column offset={2} narrow>
                          <Button
                            color={showMenuItem === menuValue ? 'link' : 'info'}
                            onClick={showMenu}
                          >
                            {menuValue}
                          </Button>
                        </Column>
                      </Column.Group>

                      <Column.Group>
                        {state.autoAttendant.digits.map(digit => {
                          if (
                            digit.menu === menuValue &&
                            digit.menu === showMenuItem
                          ) {
                            const actionValue = state.autoAttendant.actions.find(
                              action =>
                                action.menu === menuValue &&
                                action.digit === digit.digit
                                  ? action.action
                                  : null
                            )
                            const optionValue = state.autoAttendant.options.find(
                              option =>
                                option.menu === menuValue &&
                                option.digit === digit.digit
                                  ? option.option
                                  : null
                            )
                            return (
                              <React.Fragment
                                key={`${menuValue}_${actionValue.action}_${
                                  digit.digit
                                }_${optionValue.option}`}
                              >
                                {singleMenu(
                                  digit,
                                  actionValue,
                                  optionValue,
                                  menuValue
                                )}
                              </React.Fragment>
                            )
                          } else {
                            return null
                          }
                        })}
                      </Column.Group>
                    </Column>
                  </React.Fragment>
                ))}
              </Column.Group>

              <Column.Group>
                <Column offset={9}>
                  <Control>
                    <Button
                      state={loading ? 'loading' : ''}
                      color="success"
                      onClick={completeSave}
                    >
                      Save
                    </Button>
                  </Control>
                </Column>
              </Column.Group>
            </Column>
          </Column.Group>
        </Column>
      </Column.Group>
    </Box>
  )
}
