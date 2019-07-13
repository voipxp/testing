import React from 'react'
import PropTypes from 'prop-types'
import { useReduxState } from 'reactive-react-redux'
import { Field, Column, Control, Button, Icon, Tag } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserFriends,
  faUsersCog,
  faSmileBeam,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons'
import { UiPolyDownArrow, UiDownArrow } from '@/components/ui'

const optionsData = [
  { key: 1, icon: faUserFriends, tag: 'Call Center' },
  { key: 2, icon: faUsersCog, tag: 'Hunt Group' },
  { key: 3, icon: faSmileBeam, tag: 'Operator' },
  { key: 4, icon: faEnvelope, tag: 'Voice Mail' }
]

export const CreateAutoAttendantSummary = props => {
  const state = useReduxState()

  const findValue = () => {
    const latestMenuArray = state.autoAttendant.digits.filter(
      digit => digit.menu === props.digit.menu
    )
    const value = latestMenuArray.findIndex(
      element =>
        element.menu === props.digit.menu && element.digit === props.digit.digit
    )
    return value
  }

  return (
    <Column.Group>
      <Column narrow>
        <Control>
          <UiPolyDownArrow arrowNumber={findValue()} />
        </Control>

        <Column.Group centered>
          <Column offset={12} narrow>
            <Field>
              <Control>
                <Tag color="link">{props.action.action}</Tag>
              </Control>
            </Field>
          </Column>
        </Column.Group>

        <Column.Group centered>
          <Column offset={12} narrow>
            <Field>
              <Control>
                <Button static rounded outlined color="link">
                  {props.digit.digit}
                </Button>
              </Control>
            </Field>
          </Column>
        </Column.Group>

        <Column.Group centered>
          <Column offset={12} narrow>
            <Control>
              <UiDownArrow />
            </Control>
          </Column>
        </Column.Group>

        <Column.Group centered>
          <Column offset={12} narrow>
            <Control>
              <Button static rounded outlined color="link">
                <Icon>
                  <FontAwesomeIcon
                    icon={
                      optionsData.find(element =>
                        element.key === props.option.key ? element.icon : null
                      ).icon
                    }
                  />
                </Icon>
                <span>
                  {props.option.option.slice(
                    0,
                    props.option.option.indexOf('(')
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

CreateAutoAttendantSummary.propTypes = {
  digit: PropTypes.object,
  action: PropTypes.object,
  option: PropTypes.object
}
