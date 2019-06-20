import React from 'react'
import PropTypes from 'prop-types'
import { Column, Control, Button, Icon, Tag } from 'rbx'
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

export const CreateAutoAttendantSummary = props => {
  return (
    <Column narrow offset={1}>
      <Control>
        <UiDownArrow />
      </Control>

      <Control kind="addons">
        <Tag>{props.action.action}</Tag>
        <Button static rounded outlined color="link">
          {props.digit.digit}
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
                  element.tag === props.option.option ? element.icon : null
                ).icon
              }
            />
          </Icon>
        </Button>
      </Control>
    </Column>
  )
}

CreateAutoAttendantSummary.propTypes = {
  digit: PropTypes.object,
  action: PropTypes.object,
  option: PropTypes.object
}
