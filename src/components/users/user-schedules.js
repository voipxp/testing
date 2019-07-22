import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import apiUserSchedules from '@/api/user-schedules'
import apiUserEvents from '@/api/user-schedules/events'
import apiGroupEvents from '@/api/group-schedules/events'
import apiUserSearch from '@/api/users'
import { useAlerts, alertDanger } from '@/store/alerts'
import { Field, Input, Column, Control, Select } from 'rbx'
import {
  UiCard,
  UiLoadingCard,
  UiDataTable,
  UiButton,
  UiCardModal,
  UiSection,
  UiListItem,
  UiInputCheckbox,
  UiFormField
} from '@/components/ui'
export const UserSchedules = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({})
  const [userSchedules, setUserSchedules] = useState([])
  const [schedule, setSchedule] = useState({})
  const [user, setUser] = useState({})
  const [userEvents, setUserEvents] = useState([])
  const [showEvents, setShowEvents] = useState(false)
  const [showSchedule, setShowSchedule] = useState(false)
  const [scheduleTypeGroup, setScheduleTypeGroup] = useState(false)
  const [scheduleForm, setScheduleForm] = useState({
    name: '',
    level: '',
    type: ''
  })
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'type', label: 'Type' },
    { key: 'level', label: 'level' }
  ]
  const columnsEvents = [
    { key: 'name', label: 'Schedule Name' },
    { key: 'eventName', label: 'Event Name' },
    { key: 'level', label: 'level' }
  ]

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const data = await apiUserSchedules.index(userId)
        setUserSchedules(data)
        const user = await apiUserSearch.show(userId)
        setUser(user)
      } catch (error) {
        alertDanger(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [alertDanger, userId])

  async function onClickEvent(item) {
    console.log('event.item', item)
  }
  async function onClick(item) {
    setScheduleForm({ ...item })
    console.log('onClick.scheduleForm', schedule.form)
    setSchedule(item)
    setShowEvents(true)
    setShowSchedule(true)
    try {
      const events =
        item.level === 'User'
          ? await apiUserEvents.index(userId, item.name, item.type)
          : await apiGroupEvents.index(
              user.serviceProviderId,
              user.groupId,
              item.name,
              item.type
            )
      item.level === 'Group'
        ? setScheduleTypeGroup(true)
        : setScheduleTypeGroup(false)
      setUserEvents(events)
    } catch (error) {
      console.log('error', error)
    } finally {
      setShowEvents(false)
      console.log('finally')
    }
  }
  function editSchedule() {
    setScheduleForm({ ...showSchedule })
    setShowScheduleModal(true)
    console.log('showSchedule', showSchedule)
    console.log('scheduleForm', scheduleForm)
  }
  function addSchedule(item) {}
  function saveSchedule() {}

  function handleInput(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setForm({ ...form, [name]: value })
  }
  // onclick show details of schedule below with edit
  // onclick show events below for holiday
  return (
    <>
      {loading ? (
        <UiLoadingCard />
      ) : (
        <>
          <UiCard
            title="User Schedules"
            buttons={
              <UiButton
                color="link"
                icon="add"
                size="small"
                onClick={addSchedule}
              />
            }
          >
            <UiDataTable
              columns={columns}
              rows={userSchedules}
              rowKey="name"
              hideSearch={true}
              onClick={onClick}
            />
          </UiCard>
        </>
      )}{' '}
      {showSchedule ? (
        <>
          <br />
          <UiCard
            title="Schedule"
            buttons={
              <UiButton
                color="link"
                icon="edit"
                size="small"
                onClick={editSchedule}
                disabled={scheduleTypeGroup}
              />
            }
          >
            <UiSection>
              <UiListItem label="Schedule Name">{schedule.name}</UiListItem>
              <UiListItem label="Schedule Type">{schedule.type}</UiListItem>
              <UiListItem label="Schedule Level">{schedule.level}</UiListItem>
            </UiSection>
          </UiCard>
        </>
      ) : (
        <></>
      )}
      {showEvents ? (
        <>
          <br />
          <UiLoadingCard />
        </>
      ) : (
        <>
          <br />
          <UiCard
            title="Events"
            buttons={
              <UiButton
                color="link"
                icon="add"
                size="small"
                disabled={scheduleTypeGroup}
              />
            }
          >
            <UiDataTable
              columns={columnsEvents}
              rows={userEvents}
              rowKey="eventName"
              hideSearch={true}
              onClick={onClickEvent}
            />
          </UiCard>
        </>
      )}
      <UiCardModal
        title={'Edit Schedule'}
        isOpen={showScheduleModal}
        onCancel={() => setShowScheduleModal(false)}
        onSave={saveSchedule}
      >
        <form>
          <Column.Group>
            <Column>
              <Field>
                <Control>
                  <UiButton fullwidth static>
                    Schedule Name
                  </UiButton>
                </Control>
              </Field>
              <Field>
                <Control>
                  <UiButton fullwidth static>
                    Schedule Type
                  </UiButton>
                </Control>
              </Field>
              <Field>
                <Control>
                  <UiButton fullwidth static>
                    Schedule Level
                  </UiButton>
                </Control>
              </Field>
            </Column>
            <Column>
              <Field>
                <Control>
                  <Input
                    type="text"
                    name="name"
                    value={scheduleForm.name}
                    onChange={e =>
                      setScheduleForm({ ...scheduleForm, name: e.target.value })
                    }
                    placeholder="name"
                  />
                </Control>
              </Field>
              <Field>
                <Control>Schedule Type</Control>
              </Field>
              <Field>
                <Control>Schedule Level</Control>
              </Field>
            </Column>
          </Column.Group>
        </form>
      </UiCardModal>
    </>
  )
}
UserSchedules.propTypes = {
  match: PropTypes.object.isRequired
}
