import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Input, Select} from 'rbx'
import { useAlerts } from '@/store/alerts'
import { useQuery, setQueryData } from 'react-query'
import api from '@/api/user-services-settings/user-call-transfer-service'
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

export const UserCallTransfer = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)
  const { data: result, isLoading, error, refetch } = useQuery(
    'user-call-tranfer',
    () => api.show(userId)
  )
  const userServiceData = result || {}

  if (error) alertDanger(error)
  if (isLoading) return <UiLoadingCard /> 
  
  const recallNumberOfRings = {
    minimum: 2,
    maximum: 20
  }
  const busyCampOnSeconds = {
    minimum: 30,
    maximum: 600
  }
  
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
	  if( form.recallNumberOfRings > 20 || form.recallNumberOfRings < 2 ){
		  alertDanger('Number Of Rings Minimum Value 2 and Maximum Value 20')
		  return false
	  }
	  if( form.busyCampOnSeconds > 600 || form.busyCampOnSeconds < 30 ){
		  alertDanger(' Enable Busy On Camp Seconds Minimum Value 30 and Maximum Value 600')
		  return false
	  }
		  update(form)	
	}

  
  async function update(formData) {
    showLoadingModal()
    try {
      const newUserCallTransfer = await api.update(formData)
      setQueryData(['user-call-tranfer'], newUserCallTransfer, {
        shouldRefetch: true
      })
      alertSuccess('Call Transfer Updated')
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
        title="Call Transfer"
        buttons={
          <UiButton color="link" icon="edit" size="small" onClick={edit} />
        }
      >
	  
        <UiSection>
          <UiListItem label="Call Transfer Recall">
            <UiCheckbox isChecked={userServiceData.isRecallActive} />
          </UiListItem>
          <UiListItem label="Number of rings before recall">
            {userServiceData.recallNumberOfRings}
          </UiListItem>
          <UiListItem label="Enable Busy On Camp">
            <UiCheckbox isChecked={userServiceData.enableBusyCampOn} />
          </UiListItem>
          <UiListItem label="Enable Busy On Camp Seconds">
            {userServiceData.busyCampOnSeconds}
          </UiListItem>
          <UiListItem label="Use Diversion Inhibitor for Blind Transfer">
            <UiCheckbox isChecked={userServiceData.useDiversionInhibitorForBlindTransfer} />
          </UiListItem>
          <UiListItem label="Use Diversion Inhibitor for Consultative Calls">
            <UiCheckbox isChecked={userServiceData.useDiversionInhibitorForConsultativeCalls} />
          </UiListItem>
        </UiSection>
      </UiCard>
      <UiCardModal
        title={`Edit Call Transfer`}
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
      >
        <form>
          <UiSection title="General Settings">
            <UiInputCheckbox
              name="isRecallActive"
              label="Is Active"
              checked={form.isRecallActive}
              onChange={handleInput}
            />
            <UiInputCheckbox
              name="useDiversionInhibitorForBlindTransfer"
              label="Blind Transfer"
              checked={form.useDiversionInhibitorForBlindTransfer}
              onChange={handleInput}
            />
            <UiInputCheckbox
              name="useDiversionInhibitorForConsultativeCalls"
              label="Consultative Calls"
              checked={form.useDiversionInhibitorForConsultativeCalls}
              onChange={handleInput}
            />
            <UiInputCheckbox
              name="enableBusyCampOn"
              label="Enable Busy On Camp"
              checked={form.enableBusyCampOn}
              onChange={handleInput}
            />

            <UiFormField label="Number Of Rings">  
              <Input
                type="number"
                name="recallNumberOfRings"
                value={form.recallNumberOfRings}
                placeholder="Number Of Rings"
                onChange={handleInput}
                minLength = {recallNumberOfRings.minimum}
                maxLength = {recallNumberOfRings.maximum}
              />
            </UiFormField>
            <UiFormField label="Enable Busy On Camp Seconds">  
              <Input
                type="number"
                name="busyCampOnSeconds"
                value={form.busyCampOnSeconds}
                placeholder="Enable Busy On Camp Seconds"
                onChange={handleInput}
                minLength = {busyCampOnSeconds.minimum}
                maxLength = {busyCampOnSeconds.maximum}
              />
            </UiFormField>
            
          </UiSection>
        </form>
      </UiCardModal>
    </>
  )
}
UserCallTransfer.propTypes = {
  match: PropTypes.object.isRequired
}
