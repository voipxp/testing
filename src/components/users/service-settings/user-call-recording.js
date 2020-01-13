import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Input, Select} from 'rbx'
import { useAlerts } from '@/store/alerts'
import apiUserCallRecordingService from '@/api/user-services-settings/user-call-recording-service'
import {
  UiCard,
  UiLoadingCard,
  UiButton,
  UiCardModal,
  UiCheckbox,
  UiInputCheckbox,
  UiSection,
  UiListItem,
  UiFormField
} from '@/components/ui'

export const UserCallRecording = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userServiceData, loadUserCallRecordingService] = useState([])
  
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const data = await apiUserCallRecordingService.show(userId)
        console.log(data)
		    loadUserCallRecordingService(data)
      } catch (error) {
        alertDanger(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [userId, alertDanger])
  
  const recordingCallOptions = [
    { key: 'Always', name: 'Always' },
    { key: 'Never', name: 'Never' },
    { key: 'On Demand', name: 'On Demand' },
    { key: 'Always with Pause/Resume', name: 'Always with Pause/Resume' },
    { key: 'On Demand with User Initiated Start', name: 'On Demand with User Initiated Start' }
  ]

  const pauseResumeNotification = [
    { key: 'None', name: 'None' },
    { key: 'Beep', name: 'Beep' },
    { key: 'Play Announcement', name: 'Play Announcement' }
  ]

  const recordCallRepeatWarningToneTimerSeconds = {
    minimum: 10,
    maximum: 1800
  }

  function handleInput(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    if( name ==='recordCallRepeatWarningToneTimerSeconds'){
        if(value > 1800){
          return false
        }
        if(value < 10){
          return false
        }
    }
	  setForm({ ...form, [name]: value })
  }
  
  function edit() {
    setForm({ ...userServiceData })
    setShowModal(true)
  }
  
  function save() {
    update(form)
  }

  async function update(formData) {
	showLoadingModal()
    try {
	  const updatedData = await apiUserCallRecordingService.update(formData)
      loadUserCallRecordingService(updatedData)
      alertSuccess('User Call Recording Updated')
      setShowModal(false)
    } catch (error) {
      alertDanger(error)
    } finally {
      hideLoadingModal()
    }
  }

  if (!userServiceData) return <UiLoadingCard />

  return (
    <>
      <UiCard
        title="User Call Recording Setting"
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
                min ={recordCallRepeatWarningToneTimerSeconds.minimum}
                max = {recordCallRepeatWarningToneTimerSeconds.maximum}
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
