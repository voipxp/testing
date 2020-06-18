import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Input, Select} from 'rbx'
import { useAlerts } from '@/store/alerts'
import { useQuery, queryCache } from 'react-query'
import api from '@/api/user-services-settings/user-call-recording-service'
import {
  UiButton,
  UiCard,
  UiCardModal,
  UiCheckbox,
  UiInputCheckbox,
  UiFormField,
  UiListItem,
  UiLoadingCard,
  UiSection
} from '@/components/ui'
import { AppHelp } from '@/components/app'

export const UserCallRecording = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)

  const { data: result, isLoading, error } = useQuery(
    'user-call-recording',
	() => api.show(userId)
  )
  const userServiceData = result || {}
  const options = api.options || {}
  const recordingCallOptions =    options.recordingCallOptions || {}
  const pauseResumeNotification = options.pauseResumeNotification || {}

  if (error) alertDanger(error)
  if (isLoading) return <UiLoadingCard />

  function handleInput(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setForm({ ...form, [name]: value })
  }

  function edit() {
    setForm({ ...userServiceData })
    setShowModal(true)
  }

  function save() {
    if( form.recordCallRepeatWarningToneTimerSeconds > options.recordCallRepeatWarningToneTimerSeconds.maximum || form.recordCallRepeatWarningToneTimerSeconds < options.recordCallRepeatWarningToneTimerSeconds.minimum ){
		  alertDanger('Repeat Warning Tone Timer Seconds Minimum Value ' + options.recordCallRepeatWarningToneTimerSeconds.minimum + ' and Maximum Value ' + options.recordCallRepeatWarningToneTimerSeconds.maximum)
		  return false
    }
    update(form)
  }

  async function update(formData) {
    showLoadingModal()
    try {
      const newCallRecording = await api.update(formData)
      queryCache.setQueryData(['user-call-recording'], newCallRecording, {
        shouldRefetch: true
      })
      alertSuccess('Call Recording Updated')
      setShowModal(false)
    } catch (error_) {
      alertDanger(error_)
    } finally {
      hideLoadingModal()
    }
  }

  return (
    <>
      <UiCard
        title="Call Recording"
		helpModule={<AppHelp module='Call Recording'/>}
        buttons={
          <UiButton color="link" icon="edit" size="small" onClick={edit} />
        }
      >

        <UiSection>
          <UiListItem label="Record Call">
            {userServiceData.recordingOption}
          </UiListItem>
          <UiListItem label="Pause Resume Notification">
            {userServiceData.pauseResumeNotification}
          </UiListItem>
          <UiListItem label="Enable Call Recording Announcement">
            <UiCheckbox isChecked={userServiceData.enableCallRecordingAnnouncement} />
          </UiListItem>

          <UiListItem label="Enable Record Call Repeat Warning Tone">
            <UiCheckbox isChecked={userServiceData.enableRecordCallRepeatWarningTone} />
          </UiListItem>
          <UiListItem label="Record Call Repeat Warning Tone Timer Seconds">
            {userServiceData.recordCallRepeatWarningToneTimerSeconds}
          </UiListItem>

          <UiListItem label="Enable Voice Mail Recording">
            <UiCheckbox isChecked={userServiceData.enableVoiceMailRecording} />
          </UiListItem>
        </UiSection>
      </UiCard>
      <UiCardModal
        title={`Edit User Call Recording`}
		isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
      >
        <form>
          <UiSection title="Setting">
            <UiFormField label="Record Call">
              <Select.Container fullwidth>
                <Select
                  value={form.recordingOption}
                  onChange={handleInput}
                  name="recordingOption"
                >
                  {recordingCallOptions.map(searchType => (
                    <Select.Option
                      key={searchType.key}
                      value={searchType.key}
                    >
                      {searchType.name}
                    </Select.Option>
                  ))}
                </Select>
              </Select.Container>
            </UiFormField>

            <UiFormField label="Pause Resume Notification">
              <Select.Container fullwidth>
                <Select
                  value={form.pauseResumeNotification}
                  onChange={handleInput}
                  name="pauseResumeNotification"
                >
                  {pauseResumeNotification.map(searchType => (
                    <Select.Option
                      key={searchType.key}
                      value={searchType.key}
                    >
                      {searchType.name}
                    </Select.Option>
                  ))}
                </Select>
              </Select.Container>
            </UiFormField>

            <UiInputCheckbox
              name="enableCallRecordingAnnouncement"
              label="Enable Call Recording Announcement"
              checked={form.enableCallRecordingAnnouncement}
              onChange={handleInput}
            />
            <UiInputCheckbox
              name="enableRecordCallRepeatWarningTone"
              label="Enable Record Call Repeat Warning Tone"
              checked={form.enableRecordCallRepeatWarningTone}
              onChange={handleInput}
            />
            <UiFormField label="Repeat Warning Tone Timer Seconds">
              <Input
                type="number"
                name="recordCallRepeatWarningToneTimerSeconds"
                value={form.recordCallRepeatWarningToneTimerSeconds}
                placeholder="Repeat Warning Tone Timer Seconds"
                onChange={handleInput}
              />
            </UiFormField>
            <UiInputCheckbox
              name="enableVoiceMailRecording"
              label="Enable Voice Mail Recording"
              checked={form.enableVoiceMailRecording}
              onChange={handleInput}
            />
          </UiSection>
        </form>
      </UiCardModal>
    </>
  )
}
UserCallRecording.propTypes = {
  match: PropTypes.object.isRequired
}
