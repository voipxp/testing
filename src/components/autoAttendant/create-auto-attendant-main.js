import React from 'react'
import PropTypes from 'prop-types'
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
import { useAutoAttendant } from '@/store/auto-attendant'

export const CreateAutoAttendantMain = props => {
  const {
    autoAttendant,
    saveAnnouncementSchedule,
    getAnnouncements,
    getSchedules
  } = useAutoAttendant()
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
  ] = React.useState('')
  const [scheduleDropdownValue, setScheduleDropdownValue] = React.useState('')

  const setDownArrowValue = value => {
    setLoading(true)
    setDownArrow(true)
    setShowMenu(false)
    setShowNumpad(true)
    setShowSummary(false)
    setShowConfiguredMenu(true)
    setShowModalDialog(value === 'After Office' || value === 'Holiday Hour')
    if (value === 'After Office' || value === 'Holiday Hour') {
      Promise.all([
        getAnnouncements(props.groupId, props.serviceProviderId),
        getSchedules(props.groupId, props.serviceProviderId)
      ]).then(() => setLoading(false))
      setShowModalDialog(true)
    }
  }

  const handleCardCancel = () => {
    setShowModalDialog(false)
  }

  const handleCardSave = () => {
    saveAnnouncementSchedule({
      announcement: announcementDropdownValue,
      schedule: scheduleDropdownValue
    })
    setShowModalDialog(false)
    setAnnouncementDropdownValue('')
    setScheduleDropdownValue('')
  }

  const announcementSelect = e => {
    e.preventDefault()
    setAnnouncementDropdownValue(e.target.textContent)
  }

  const scheduleSelect = e => {
    e.preventDefault()
    setScheduleDropdownValue(e.target.textContent)
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
    if (autoAttendant.menu.length === 3) {
      setShowConfiguredMenu(true)
    } else {
      setShowMenu(true)
      setShowConfiguredMenu(false)
    }
    setShowNext(true)
    setShowDoneButton(false)
    setShowDigits(false)
  }

  const completeNextFlow = () => {
    props.completeNextFlow()
  }

  const setValueShowDigits = () => {
    setShowDigits(true)
    setShowDoneButton(false)
  }

  const add = () => {
    setShowNext(false)
  }

  const autoAttendantActions = digit => (
    <CreateAutoAttendantActions
      key={`${autoAttendant.latestMenu}_${digit.digit}`}
      digitPressed={digit.digit}
      optionSelect={optionSelect}
      groupId={props.groupId}
      serviceProviderId={props.serviceProviderId}
    />
  )

  const autoAttendantSummary = digit => {
    const actionValue = autoAttendant.actions.find(action =>
      action.menu === autoAttendant.latestMenu && action.digit === digit.digit
        ? action.action
        : null
    )
    const optionValue = autoAttendant.options.find(option =>
      option.menu === autoAttendant.latestMenu && option.digit === digit.digit
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
                title="Select Announcement & Schedule"
                isOpen={showModalDialog}
                onCancel={handleCardCancel}
                onSave={handleCardSave}
              >
                <Container fluid style={{ marginBottom: '10rem', zIndex: 9 }}>
                  <Title align="center">{autoAttendant.latestMenu}</Title>
                  <Level>
                    <Level.Item>
                      <Dropdown>
                        <Dropdown.Trigger>
                          <Button state={loading ? 'loading' : ''}>
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
                            {autoAttendant &&
                              autoAttendant.announcements &&
                              autoAttendant.announcements.announcements &&
                              autoAttendant.announcements.announcements.map(
                                announcement => (
                                  <Dropdown.Item
                                    key={announcement.name}
                                    value={announcement.name}
                                  >
                                    {announcement.name}
                                  </Dropdown.Item>
                                )
                              )}
                          </Dropdown.Content>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Level.Item>

                    <Level.Item>
                      <Dropdown>
                        <Dropdown.Trigger>
                          <Button state={loading ? 'loading' : ''}>
                            <span>
                              {scheduleDropdownValue || `Select Schedule...`}
                            </span>
                            <Icon size="small">
                              <FontAwesomeIcon icon={faAngleDown} />
                            </Icon>
                          </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Menu onClick={scheduleSelect}>
                          <Dropdown.Content>
                            {autoAttendant &&
                              autoAttendant.schedules &&
                              autoAttendant.schedules.map(schedule => {
                                if (menuTag === 'Holiday Hour') {
                                  return schedule.type === 'Holiday' ? (
                                    <Dropdown.Item
                                      key={schedule.name}
                                      value={schedule.name}
                                    >
                                      {schedule.name}
                                    </Dropdown.Item>
                                  ) : null
                                } else if (menuTag === 'After Office') {
                                  return schedule.type === 'Time' ? (
                                    <Dropdown.Item
                                      key={schedule.name}
                                      value={schedule.name}
                                    >
                                      {schedule.name}
                                    </Dropdown.Item>
                                  ) : null
                                } else {
                                  return null
                                }
                              })}
                          </Dropdown.Content>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Level.Item>
                  </Level>
                </Container>
              </UiCardModal>

              {showConfiguredMenu &&
              autoAttendant &&
              autoAttendant.menu &&
              autoAttendant.menu.length > 1 ? (
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
                      <Box
                        style={{
                          width: '300px',
                          minHeight: '100px',
                          maxHeight: '300px'
                        }}
                      >
                        {autoAttendant.menu.map(menuValue => {
                          if (autoAttendant.latestMenu !== menuValue) {
                            const toolTipString = []
                            autoAttendant.digits.forEach(digit => {
                              if (digit.menu === menuValue) {
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
                                toolTipString.push(
                                  `${digit.digit} : ${actionValue.action}, ${optionValue.option}`
                                )
                              }
                            })
                            return (
                              <Column.Group centered key={menuValue}>
                                <Column size={8}>
                                  <Generic
                                    as="div"
                                    tooltip={toolTipString.toString()}
                                    textColor="primary"
                                    tooltipColor="link"
                                    textAlign="centered"
                                    tooltipPosition="bottom"
                                  >
                                    {menuValue}
                                  </Generic>
                                </Column>
                              </Column.Group>
                            )
                          } else {
                            return null
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
                ? autoAttendant.digits.map(digit =>
                    digit.menu === autoAttendant.latestMenu
                      ? autoAttendantSummary(digit)
                      : null
                  )
                : null}

              <Column size={10}>
                {showDigits
                  ? Array.isArray(autoAttendant.digits)
                    ? autoAttendant.digits.map(digit =>
                        digit.menu === autoAttendant.latestMenu
                          ? autoAttendantActions(digit)
                          : null
                      )
                    : autoAttendantActions(autoAttendant.digits.digit)
                  : null}
              </Column>
            </Column.Group>
          </Column>
        ) : null}
      </Column.Group>

      {showDoneButton ? (
        <Column size={4} offset={8}>
          <Control>
            <Button color="link" onClick={completeMenuFlow}>
              Done
            </Button>
          </Control>
        </Column>
      ) : null}

      {showNextButton ? (
        <Column size={4} offset={8}>
          <Control>
            <Button color="link" onClick={completeNextFlow}>
              Next
            </Button>
          </Control>
        </Column>
      ) : null}
    </UiCard>
  )
}

CreateAutoAttendantMain.propTypes = {
  completeNextFlow: PropTypes.func,
  groupId: PropTypes.string,
  serviceProviderId: PropTypes.string
}
