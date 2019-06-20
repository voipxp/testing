import React from 'react'
import { useReduxState } from 'reactive-react-redux'
import {
  Container,
  Column,
  Title,
  Field,
  Control,
  Icon,
  Box,
  Button,
  Level,
  Tag
} from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UiLoadingCard, UiRightArrow, UiDownArrow } from '@/components/ui'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { AppBreadcrumb } from '@/components/app'
import { CreateAutoAttendantProfile } from './create-auto-attendant-profile'
import { CreateAutoAttendantMain } from './create-auto-attendant-main'
import { CreateAutoAttendantLast } from './create-auto-attendant-last'

export const CreateAutoAttendant = () => {
  const state = useReduxState()

  const [loading, setLoading] = React.useState(true)
  const [profileSlide, setProfileSlide] = React.useState(true)
  const [hoursSlide, setHoursSlide] = React.useState(false)
  const [lastSlide, setLastSlide] = React.useState(false)

  const next = () => {
    setProfileSlide(false)
    setHoursSlide(true)
  }

  const completeNextFlow = () => {
    setProfileSlide(false)
    setHoursSlide(false)
    setLastSlide(true)
  }

  const completeSave = () => {
    console.log('final state :', state.autoAttendant)
  }

  const autoAttendantLast = menuValue => (
    <Field key={`${menuValue}`}>
      <CreateAutoAttendantLast menu={menuValue} />
    </Field>
  )

  React.useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <>
      {!lastSlide ? <AppBreadcrumb /> : null}
      {loading ? (
        <UiLoadingCard />
      ) : profileSlide ? (
        <CreateAutoAttendantProfile onSubmit={next} />
      ) : hoursSlide ? (
        <CreateAutoAttendantMain completeNextFlow={completeNextFlow} />
      ) : lastSlide ? (
        <Container fluid>
          <Title>Auto Attendant</Title>
          <Field horizontal>
            <Field.Body>
              <Column.Group centered offset={6}>
                <Level>
                  <Column size="half">
                    <Level.Item>
                      <Control>
                        <Icon size="large">
                          <FontAwesomeIcon icon={faPhone} size="2x" />
                        </Icon>
                      </Control>
                    </Level.Item>
                  </Column>

                  <Column size="half">
                    <Level.Item>
                      <Control>
                        <UiRightArrow />
                      </Control>
                    </Level.Item>
                  </Column>

                  <Column size="half">
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
              </Column.Group>
            </Field.Body>
          </Field>

          <Column.Group>
            <Column>
              <Column.Group>
                <Column narrow />
                <Column size="half" offset={4}>
                  <UiDownArrow />
                </Column>
              </Column.Group>

              {state.autoAttendant.menu.map(menuValue =>
                autoAttendantLast(menuValue)
              )}
              <Control>
                <Button
                  state={loading ? 'loading' : ''}
                  color="link"
                  onClick={completeSave}
                >
                  Save
                </Button>
              </Control>
            </Column>
          </Column.Group>
        </Container>
      ) : null}
    </>
  )
}
