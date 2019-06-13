import React from 'react'
import PropTypes from 'prop-types'
import { useReduxState } from 'reactive-react-redux'
import { Column, Control, Button, Icon, Tag, Field } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserFriends,
  faUsersCog,
  faSmileBeam,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons'
import { UiDownArrow } from '@/components/ui'

const optionsData = [
  { icon: faUserFriends, tag: 'Call Center' },
  { icon: faUsersCog, tag: 'Hunt Group' },
  { icon: faSmileBeam, tag: 'Operator' },
  { icon: faEnvelope, tag: 'Voice Mail' }
]

export const CreateAutoAttendantLast = props => {
  const state = useReduxState()

  const singleMenu = (digit, actionValue, optionValue) => (
    <Column.Group>
      <Column>
        <Control>
          <UiDownArrow />
        </Control>

        <Control kind="addons">
          <Tag>{actionValue.action}</Tag>
          <Button static rounded outlined color="link">
            {digit.digit}
          </Button>
        </Control>

        <Control>
          <UiDownArrow />
        </Control>

        <Control>
          <Button static rounded outlined color="link">
            <Icon>
              <FontAwesomeIcon
                icon={
                  optionsData.find(element =>
                    element.tag === optionValue.option ? element.icon : null
                  ).icon
                }
              />
            </Icon>
          </Button>
        </Control>
      </Column>
    </Column.Group>
  )

  return (
    <Field>
      <Control>
        <Tag size="large">{props.menu}</Tag>
      </Control>

      {state.autoAttendant.digits.map(digit => {
        if (digit.menu === props.menu) {
          const actionValue = state.autoAttendant.actions.find(action =>
            action.menu === props.menu && action.digit === digit.digit
              ? action.action
              : null
          )
          const optionValue = state.autoAttendant.options.find(option =>
            option.menu === props.menu && option.digit === digit.digit
              ? option.option
              : null
          )
          return (
            <React.Fragment key={props.menu}>
              {singleMenu(digit, actionValue, optionValue)}
            </React.Fragment>
          )
        } else {
          return null
        }
      })}
    </Field>
  )
}

CreateAutoAttendantLast.propTypes = {
  digit: PropTypes.object,
  action: PropTypes.object,
  option: PropTypes.object,
  menu: PropTypes.string
}
