import React from 'react'
import PropTypes from 'prop-types'
import { useReduxState, useReduxDispatch } from 'reactive-react-redux'
import {
  Generic,
  Column,
  Level,
  Box,
  Field,
  Control,
  Button,
  Icon,
  Tag,
  Dropdown,
  Container,
  Title
} from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { UiCard, UiRightArrow, UiDownArrow, UiCardModal } from '@/components/ui'
import { CreateAutoAttendantMenu } from './create-auto-attendant-menu'
import { CreateAutoAttendantDigits } from './create-auto-attendant-digits'
import { CreateAutoAttendantSummary } from './create-auto-attendant-summary'
import { CreateAutoAttendantActions } from './create-auto-attendant-actions'
import { saveAnnouncementGreeting } from '@/store/auto-attendant'

export const CreateAutoAttendantMain = props => {
  const state = useReduxState()
  const dispatch = useReduxDispatch()

  const [loading, setLoading] = React.useState(false)
  const [isDownArrow, setDownArrow] = React.useState(false)
  const [showMenu, setShowMenu] = React.useState(true)
  const [showNumpad, setShowNumpad] = React.useState(true)
  const [showSummary, setShowSummary] = React.useState(false)
  const [menuTag, setMenuTag] = React.useState()
  const [showDoneButton, setShowDoneButton] = React.useState(false)
  const [showNextButton, setShowNext] = React.useState(false)
  const [showDigits, setShowDigits] = React.useState(false)
  const [showConfiguredMenu, setShowConfiguredMenu] = React.useState(false)
  const [showModalDialog, setShowModalDialog] = React.useState(false)
  const [
    announcementDropdownValue,
    setAnnouncementDropdownValue
  ] = React.useState()
  const [greetingDropdownValue, setGreetingDropdownValue] = React.useState()

  const setDownArrowValue = value => {
    setLoading(true)
    setDownArrow(true)
    setShowMenu(false)
    setShowNumpad(true)
    setShowSummary(false)
    setLoading(false)
    setShowConfiguredMenu(true)
    setShowModalDialog(value === 'After Office' || value === 'Holiday Hour')
  }

  const handleCardCancel = () => {
    setShowModalDialog(false)
  }

  const handleCardSave = () => {
    dispatch(
      saveAnnouncementGreeting({
        announcement: announcementDropdownValue,
        greeting: greetingDropdownValue
      })
    )
    setShowModalDialog(false)
  }

  const announcementSelect = e => {
    e.preventDefault()
    setAnnouncementDropdownValue(e.target.textContent)
  }

  const greetingSelect = e => {
    e.preventDefault()
    setGreetingDropdownValue(e.target.textContent)
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
    setShowDigits(false)
    setShowConfiguredMenu(false)
  }

  const completeNextFlow = () => {
    props.completeNextFlow()
  }

  const setValueShowDigits = () => {
    setShowDigits(true)
  }

  const add = () => {
    setShowNext(false)
  }

  const autoAttendantActions = digit => (
    <CreateAutoAttendantActions
      key={`${state.autoAttendant.latestMenu}_${digit.digit}`}
      digitPressed={digit.digit}
      optionSelect={optionSelect}
    />
  )

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
                          add={add}
                        />
                      </Control>
                    </Level.Item>
                  </Column>
                </>
              ) : null}

              <UiCardModal
                title="Select Announcement & Greeting"
                isOpen={showModalDialog}
                onCancel={handleCardCancel}
                onSave={handleCardSave}
              >
                <Container fluid style={{ marginBottom: '10rem', zIndex: 9 }}>
                  <Title align="center">{state.autoAttendant.latestMenu}</Title>
                  <Level>
                    <Level.Item>
                      <Dropdown>
                        <Dropdown.Trigger>
                          <Button>
                            <span>
                              {announcementDropdownValue ||
                                `Select Announcement...`}
                            </span>
                            <Icon size="small">
                              <FontAwesomeIcon icon={faAngleDown} />
                            </Icon>
                          </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Menu onClick={announcementSelect}>
                          <Dropdown.Content>
                            <Dropdown.Item>Announcement 1</Dropdown.Item>
                            <Dropdown.Item>Announcement 2</Dropdown.Item>
                            <Dropdown.Item>Announcement 3</Dropdown.Item>
                            <Dropdown.Item>Announcement 4</Dropdown.Item>
                          </Dropdown.Content>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Level.Item>

                    <Level.Item>
                      <Dropdown>
                        <Dropdown.Trigger>
                          <Button>
                            <span>
                              {greetingDropdownValue || `Select Greeting...`}
                            </span>
                            <Icon size="small">
                              <FontAwesomeIcon icon={faAngleDown} />
                            </Icon>
                          </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Menu onClick={greetingSelect}>
                          <Dropdown.Content>
                            <Dropdown.Item>Greeting 1</Dropdown.Item>
                            <Dropdown.Item>Greeting 2</Dropdown.Item>
                            <Dropdown.Item>Greeting 3</Dropdown.Item>
                            <Dropdown.Item>Greeting 4</Dropdown.Item>
                          </Dropdown.Content>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Level.Item>
                  </Level>
                </Container>
              </UiCardModal>

              {showConfiguredMenu && state.autoAttendant.menu.length > 1 ? (
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
                      <Box style={{ width: '400px', height: '200px' }}>
                        {state.autoAttendant.menu.map(menuValue => {
                          if (state.autoAttendant.latestMenu !== menuValue) {
                            const toolTipString = []
                            state.autoAttendant.digits.map(digit => {
                              if (digit.menu === menuValue) {
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
                                toolTipString.push(
                                  `${digit.digit} : ${
                                    actionValue.action
                                  }, ${optionValue.option.slice(
                                    0,
                                    optionValue.option.indexOf('(')
                                  )}`
                                )
                              }
                            })
                            return (
                              <Column.Group centered key={menuValue}>
                                <Column offset={8} size={12}>
                                  <Generic
                                    as="span"
                                    tooltip={toolTipString.toString()}
                                    textColor="primary"
                                    tooltipColor="link"
                                    textAlign="centered"
                                    tooltipPosition="bottom"
                                    tooltipActive
                                    tooltipMultiline
                                  >
                                    {menuValue}
                                  </Generic>
                                </Column>
                              </Column.Group>
                            )
                          }
                        })}
                      </Box>
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
              {showNumpad ? (
                <CreateAutoAttendantDigits setShowDigits={setValueShowDigits} />
              ) : null}
              {showSummary
                ? state.autoAttendant.digits.map(digit =>
                    digit.menu === state.autoAttendant.latestMenu
                      ? autoAttendantSummary(digit)
                      : null
                  )
                : null}

              <Column size={10}>
                {showDigits
                  ? Array.isArray(state.autoAttendant.digits)
                    ? state.autoAttendant.digits.map(digit =>
                        digit.menu === state.autoAttendant.latestMenu
                          ? autoAttendantActions(digit)
                          : null
                      )
                    : autoAttendantActions(state.autoAttendant.digits.digit)
                  : null}
              </Column>
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
