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
      <CreateAutoAttendantSummary
        digit={digit}
        action={actionValue}
        option={optionValue}
        key={`${digit.digit}_${digit.menu}`}
      />
    )
  }

  return (
    <UiCard title="Create Auto Attendant">
      <Field horizontal>
        <Field.Body>
          <Column.Group>
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

              {showMenu ? (
                <>
                  <Column>
                    <Level.Item>
                      <Control>
                        <UiRightArrow />
                      </Control>
                    </Level.Item>
                  </Column>

                  <Column>
                    <Level.Item>
                      <Control>
                        <CreateAutoAttendantMenu
                          setDownArrow={setDownArrowValue}
                          setMenuValue={setMenuValue}
                        />
                      </Control>
                    </Level.Item>
                  </Column>
                </>
              ) : null}
            </Level>
          </Column.Group>
        </Field.Body>
      </Field>

      <Column.Group>
        {isDownArrow ? (
          <Column>
            <Column.Group>
              <Column narrow />
              <Column offset={2}>
                <UiDownArrow />
              </Column>
            </Column.Group>

            <Column.Group>
              <Column narrow />
              <Column narrow />
              <Column narrow />
              <Column offset={1}>
                <Tag size="large" color="link">
                  {menuTag}
                </Tag>
              </Column>
            </Column.Group>

            <Column.Group>
              <Column narrow />
              <Column narrow />
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
            </Column.Group>
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
