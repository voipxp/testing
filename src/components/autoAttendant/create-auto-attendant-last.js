import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import {
  Column,
  Control,
  Button,
  Icon,
  Tag,
  Box,
  Title,
  Field,
  Level,
  Message,
  Progress
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
import { useAutoAttendant } from '@/store/auto-attendant'
import { useAlerts } from '@/store/alerts'

const optionsData = [
  { key: 1, icon: faUserFriends, tag: 'Call Center' },
  { key: 2, icon: faUsersCog, tag: 'Hunt Group' },
  { key: 3, icon: faSmileBeam, tag: 'Operator' },
  { key: 4, icon: faEnvelope, tag: 'Voice Mail' }
]

export const CreateAutoAttendantLast = withRouter(props => {
  const {
    autoAttendant,
    postAutoAttendant,
    editAutoAttendant,
    clearAutoAttendant
    // postSubMenu,
    // editSubMenu
  } = useAutoAttendant()
  const [loading, setLoading] = React.useState(false)
  const [showMenuItem, setShowMenuItem] = React.useState()
  const [showTryAgain, setShowTryAgain] = React.useState(false)
  const [showError, alertError] = React.useState(false)
  const { alertSuccess, alertDanger } = useAlerts()

  const completeSave = () => {
    setLoading(true)
    const businessHoursKeys = []
    const afterHoursKeys = []
    const optionBusinessHoursKeys = []
    const optionAfterHoursKeys = []
    autoAttendant.options.forEach(option => {
      if (option.menu === 'Business Hour') {
        optionBusinessHoursKeys.push({
          digit: option.digit,
          option: option.option,
          value: option.optionsValue
        })
      } else if (option.menu === 'After Office') {
        optionAfterHoursKeys.push({
          digit: option.digit,
          option: option.option,
          value: option.optionsValue
        })
      }
    })
    // const subMenuKeys = []
    autoAttendant.actions.forEach(action => {
      if (action.menu === 'Business Hour') {
        let actionToSend = ''
        let phoneNumber = ''
        optionBusinessHoursKeys.forEach(option => {
          if (action.digit === option.digit) {
            if (
              option.value === 'Hunt Group' ||
              option.value === 'Call Center' ||
              option.value === 'Operator'
            ) {
              actionToSend = 'Transfer Without Prompt'
            } else if (option.value === 'Voice Mail') {
              actionToSend = 'Transfer To Mailbox'
            }
            phoneNumber = !option.option.includes('(')
              ? null
              : option.option.slice(
                  option.option.indexOf('(') + 1,
                  option.option.indexOf(')') - 1
                )
          }
        })
        businessHoursKeys.push({
          key: action.digit,
          action: actionToSend,
          description: action.action,
          phoneNumber:
            phoneNumber !== null && phoneNumber.length > 0 ? phoneNumber : null
        })
      } else if (action.menu === 'After Office') {
        let actionToSend = ''
        let phoneNumber = ''
        optionAfterHoursKeys.map(option => {
          if (action.digit === option.digit) {
            if (
              option.value === 'Hunt Group' ||
              option.value === 'Call Center' ||
              option.value === 'Operator'
            ) {
              actionToSend = 'Transfer Without Prompt'
            } else if (option.value === 'Voice Mail') {
              actionToSend = 'Transfer To Mailbox'
            }
            phoneNumber = !option.option.includes('(')
              ? null
              : option.option.slice(
                  option.option.indexOf('(') + 1,
                  option.option.indexOf(')') - 1
                )
          }
        })
        afterHoursKeys.push({
          key: action.digit,
          action: actionToSend,
          description: action.action,
          phoneNumber:
            phoneNumber !== null && phoneNumber.length > 0 ? phoneNumber : null
        })
      } /* else if (action.menu === 'Sub Menu') {
        subMenuKeys.push({ key: action.digit, action: action.action })
      }*/ else {
        return null
      }
    })

    postAutoAttendant(props.groupId, props.serviceProviderId, {
      type: autoAttendant.profile.type ? autoAttendant.profile.type : '',
      serviceUserId: `${autoAttendant.profile.username}@${autoAttendant.profile.domain}`,
      serviceInstanceProfile: {
        name: autoAttendant.profile.username,
        callingLineIdLastName: autoAttendant.profile.username,
        callingLineIdFirstName: autoAttendant.profile.username,
        extension: autoAttendant.profile.extension,
        phoneNumber: autoAttendant.profile.number
      }
    })
      .then(() => {
        editAutoAttendant(props.groupId, props.serviceProviderId, {
          serviceInstanceProfile: {
            name: autoAttendant.profile.username,
            callingLineIdLastName: autoAttendant.profile.username,
            callingLineIdFirstName: autoAttendant.profile.username
          },
          type: autoAttendant.profile.type ? autoAttendant.profile.type : '',
          serviceUserId: `${autoAttendant.profile.username}@${autoAttendant.profile.domain}`,
          businessHoursMenu: {
            announcementSelection: 'Default',
            enableFirstMenuLevelExtensionDialing: false,
            keys: businessHoursKeys
          },
          afterHoursMenu: {
            announcementSelection: 'Default',
            enableFirstMenuLevelExtensionDialing: false,
            keys: afterHoursKeys
          }
        })
          .then(() => {
            alertSuccess('Auto Attendant Created')
            setLoading(false)
            navigateBack()
            clearAutoAttendant()
          })
          .catch(error => {
            alertDanger(error)
            setLoading(false)
            alertError(true)
          })
      })
      .catch(error => {
        alertDanger(error)
        setShowTryAgain(true)
        setLoading(false)
      })
    /* setLoading(true)
    Promise.resolve(
      postSubMenu({
        serviceUserId: `${autoAttendant.profile.username}@${autoAttendant.profile.domain}`,
        submenuId: 'Submenu 1'
      })
    )
      .then(
        editSubMenu({
          serviceUserId: `${autoAttendant.profile.username}@${autoAttendant.profile.domain}`,
          subMenu: businessHoursKeys,
          submenuId: 'Submenu 1'
        })
      )
      .then(() => setLoading(false))*/
  }

  const navigateBack = () => {
    props.history.goBack()
  }

  const polyArrow = (value, index) => (
    <UiPolyDownLastArrow key={index} arrowNumber={index} />
  )

  const findValue = (menuValue, digit) => {
    const menuArray = autoAttendant.digits.filter(
      digit => digit.menu === menuValue
    )
    return menuArray.findIndex(
      element => element.menu === menuValue && element.digit === digit.digit
    )
  }

  const findMenuNumber = menuValue =>
    autoAttendant.menu.findIndex(
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
                <Button
                  rounded
                  outlined
                  color="link"
                  style={{
                    width: '120px'
                  }}
                  title={
                    !optionValue.option.includes('(')
                      ? optionValue.option
                      : optionValue.option.slice(
                          0,
                          optionValue.option.indexOf('(')
                        )
                  }
                >
                  <Icon>
                    <FontAwesomeIcon
                      icon={
                        optionsData.find(element =>
                          element.key === optionValue.key ? element.icon : null
                        ).icon
                      }
                    />
                  </Icon>
                  <span
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {!optionValue.option.includes('(')
                      ? optionValue.option
                      : optionValue.option.slice(
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
      {showError ? (
        <Message color="warning">
          <Message.Header>Auto Attendant Creation Warning</Message.Header>
          <Message.Body>
            The Auto Attendant was created but its configuration was not saved.
            Go Back to Auto Attendants list and update the configuration or
            delete your newly created Auto Attendant.
          </Message.Body>
          <Button color="link" onClick={navigateBack}>
            Go Back
          </Button>
        </Message>
      ) : null}
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
                            {autoAttendant.profile.username}
                          </Tag>
                        </Control>
                        <Control>
                          <Tag color="link" size="medium">
                            {autoAttendant.profile.number}
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
                  {autoAttendant.menu.map((value, index) =>
                    polyArrow(value, index)
                  )}
                </Column>
              </Column.Group>

              <Column.Group>
                {autoAttendant.menu.map(menuValue => (
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
                        {autoAttendant.digits.map(digit => {
                          if (
                            digit.menu === menuValue &&
                            digit.menu === showMenuItem
                          ) {
                            const actionValue = autoAttendant.actions.find(
                              action =>
                                action.menu === menuValue &&
                                action.digit === digit.digit
                                  ? action.action
                                  : null
                            )
                            const optionValue = autoAttendant.options.find(
                              option =>
                                option.menu === menuValue &&
                                option.digit === digit.digit
                                  ? option.option
                                  : null
                            )
                            return (
                              <React.Fragment
                                key={`${menuValue}_${actionValue.action}_${digit.digit}_${optionValue.option}`}
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

              {loading ? (
                <Column.Group>
                  <Column size={12}>
                    <Control>
                      <Progress size="small" color="primary" />
                    </Control>
                  </Column>
                </Column.Group>
              ) : null}

              <Column.Group>
                <Column offset={9}>
                  <Control>
                    <Button
                      state={loading ? 'loading' : ''}
                      color={showTryAgain ? 'warning' : 'success'}
                      onClick={completeSave}
                      disabled={showError}
                    >
                      {showTryAgain ? 'Try Again' : 'Save'}
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
})

CreateAutoAttendantLast.propTypes = {
  history: PropTypes.object,
  groupId: PropTypes.string,
  serviceProviderId: PropTypes.string
}
