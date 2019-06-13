import React from 'react'
import PropTypes from 'prop-types'
import { useReduxState } from 'reactive-react-redux'
import { Column, Level, Box, Field, Control, Button, Icon, Tag } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { UiCard, UiRightArrow, UiDownArrow } from '@/components/ui'
import { CreateAutoAttendantMenu } from './create-auto-attendant-menu'
import { CreateAutoAttendantDigits } from './create-auto-attendant-digits'
import { CreateAutoAttendantSummary } from './create-auto-attendant-summary'

export const CreateAutoAttendantMain = props => {
  const state = useReduxState()

  const [loading, setLoading] = React.useState(false)
  const [isDownArrow, setDownArrow] = React.useState(false)
  const [showMenu, setShowMenu] = React.useState(true)
  const [showNumpad, setShowNumpad] = React.useState(true)
  const [showSummary, setShowSummary] = React.useState(false)
  const [menuTag, setMenuTag] = React.useState()
  const [showDoneButton, setShowDoneButton] = React.useState(false)
  const [showNextButton, setShowNext] = React.useState(false)

  const setDownArrowValue = () => {
    setLoading(true)
    setDownArrow(true)
    setShowMenu(false)
    setShowNumpad(true)
    setShowSummary(false)
    setLoading(false)
  }

  const optionSelect = () => {
    setShowDoneButton(true)
  }

  const setMenuValue = value => {
    setMenuTag(value)
  }

  const completeMenuFlow = () => {
    setShowNumpad(false)
    setShowSummary(true)
    setShowMenu(true)
    setShowNext(true)
    setShowDoneButton(false)
  }

  const completeNextFlow = () => {
    props.completeNextFlow()
  }

  const autoAttendantSummary = digit => {
    const actionValue = state.autoAttendant.actions.find(action =>
      action.menu === state.autoAttendant.latestMenu &&
      action.digit === digit.digit
        ? action.action
        : null
    )
    const optionValue = state.autoAttendant.options.find(option =>
      option.menu === state.autoAttendant.latestMenu &&
      option.digit === digit.digit
        ? option.option
        : null
    )
    return (
      <Field key={`${digit.digit}_${digit.menu}`}>
        <CreateAutoAttendantSummary
          digit={digit}
          action={actionValue}
          option={optionValue}
        />
      </Field>
    )
  }

  return (
    <UiCard title="Create Auto Attendant">
      <Field horizontal>
        <Field.Body>
          <Column.Group gapSize={2}>
            <Level>
              <Column>
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
                      <Button state={loading ? 'loading' : ''} static>
                        {state.autoAttendant.profile.username}
                      </Button>
                    </Control>
                    <Control>
                      <Button state={loading ? 'loading' : ''} static>
                        {state.autoAttendant.profile.number}
                      </Button>
                    </Control>
                  </Box>
                </Level.Item>
              </Column>

              {showMenu ? (
                <Column>
                  <Level.Item>
                    <Control>
                      <UiRightArrow />
                    </Control>
                    <CreateAutoAttendantMenu
                      setDownArrow={setDownArrowValue}
                      setMenuValue={setMenuValue}
                    />
                  </Level.Item>
                </Column>
              ) : null}
            </Level>
          </Column.Group>
        </Field.Body>
      </Field>

      <Column.Group>
        {isDownArrow ? (
          <Column size="three-fifths" offset="one-fifth">
            <Control>
              <UiDownArrow />
            </Control>
            <Control>
              <Tag size="large">{menuTag}</Tag>
            </Control>
            {showNumpad ? (
              <CreateAutoAttendantDigits optionSelect={optionSelect} />
            ) : null}
            {showSummary
              ? state.autoAttendant.digits.map(digit =>
                  digit.menu === state.autoAttendant.latestMenu
                    ? autoAttendantSummary(digit)
                    : null
                )
              : null}
          </Column>
        ) : null}
      </Column.Group>

      {showDoneButton ? (
        <Column size={4} offset={8}>
          <Control>
            <Button
              state={loading ? 'loading' : ''}
              color="link"
              onClick={completeMenuFlow}
            >
              Done
            </Button>
          </Control>
        </Column>
      ) : null}

      {showNextButton ? (
        <Column size={4} offset={8}>
          <Control>
            <Button
              state={loading ? 'loading' : ''}
              color="link"
              onClick={completeNextFlow}
            >
              Next
            </Button>
          </Control>
        </Column>
      ) : null}
    </UiCard>
  )
}

CreateAutoAttendantMain.propTypes = { completeNextFlow: PropTypes.func }
