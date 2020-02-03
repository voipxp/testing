import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Input} from 'rbx'
import { useAlerts } from '@/store/alerts'
import { useQuery, setQueryData } from 'react-query'
import api from '@/api/user-services-settings/user-call-forwarding-busy-service'
import {
  UiButton,
  UiCard,
  UiCardModal,
  UiCheckbox,
  UiFormField,
  UiInputCheckbox,
  UiLoadingCard,
  UiListItem,
  UiSection
} from '@/components/ui'

export const UserCallForwardingBusy = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)
  
  const { data: result, isLoading, error } = useQuery(
    'user-call-forwarding-busy',
	() => api.show(userId)		
  )
  const userServiceData = result || {}
  const options = api.options || {}
  
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
	  if( ( form.forwardToPhoneNumber > options.forwardToPhoneNumber.maximum ) || (form.forwardToPhoneNumber < options.forwardToPhoneNumber.minimum) ){
		  alertDanger('Forward To Phone Number or SIPURI Value Minimum ' + options.forwardToPhoneNumber.minimum + ' and Maximum Value ' + options.forwardToPhoneNumber.maximum)
		  return false
	  }
    update(form)
  }

  async function update(formData) {
    showLoadingModal()
    try {
      const newCallForwardingBusy = await api.update(formData)
      
      setQueryData(['user-call-forwarding-busy'], newCallForwardingBusy, {
        shouldRefetch: true
      })
      alertSuccess('Call Forwarding Busy Updated')
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
        title="Call Forwarding Busy"
        buttons={
          <UiButton color="link" icon="edit" size="small" onClick={edit} />
        }
      >
	  
        <UiSection>
          <UiListItem label="Is Active">
            <UiCheckbox isChecked={userServiceData.isActive} />
          </UiListItem>
          <UiListItem label="Forward to Phone Number">
            {userServiceData.forwardToPhoneNumber}
          </UiListItem>
        </UiSection>
      </UiCard>
      <UiCardModal
        title={`Edit Call Forwarding Busy`}
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
      >
        <form>
          <UiSection title="General Settings">
            <UiInputCheckbox
              name="isActive"
              label="Is Active"
              checked={form.isActive}
              onChange={handleInput}
            />
        
            <UiFormField label="Forward To">  
              <Input
                type="text"
                name="forwardToPhoneNumber"
                value={form.forwardToPhoneNumber}
                placeholder="Forward To"
                onChange={handleInput}
              />
            </UiFormField>
          </UiSection>
        </form>
      </UiCardModal>
    </>
  )
}
UserCallForwardingBusy.propTypes = {
  match: PropTypes.object.isRequired
}
