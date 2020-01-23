import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Input } from 'rbx'
import { useAlerts } from '@/store/alerts'
import { useQuery, setQueryData } from 'react-query'
import api from '@/api/user-services-settings/user-call-forwarding-always-secondary-service'
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

export const UserCallForwardingAlwaysSecondary = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)
   
  const { data: result, isLoading, error } = useQuery(
    'user-call-forwarding-always-secondary',
	() => api.show(userId)		
  )
  const userServiceData = result || {}
  
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
    update(form)
  }

  async function update(formData) {
    showLoadingModal()
    try {
      const newCallForwardingAlwaysSecondary = await api.update(formData)
      
      setQueryData(['user-call-forwarding-always-secondary'], newCallForwardingAlwaysSecondary, {
        shouldRefetch: true
      })
      alertSuccess('Call Forwarding Always Secondary Updated')
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
        title="Call Forwarding Always Secondary"
        buttons={
          <UiButton color="link" icon="edit" size="small" onClick={edit} />
        }
      >
	      <UiSection>
		      <UiListItem label="Is Active">
            <UiCheckbox isChecked={userServiceData.isActive} />
          </UiListItem>
		      <UiListItem label="Is Ring Splash Active">
		        <UiCheckbox isChecked={userServiceData.isRingSplashActive} />
          </UiListItem>
          <UiListItem label="Forward to Phone Number">
            {userServiceData.forwardToPhoneNumber}
          </UiListItem>
		    </UiSection>
      </UiCard>

      <UiCardModal
        title={`Edit Call Forwarding Always Secondary`}
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
			
			      <UiInputCheckbox
              name="isRingSplashActive"
              label="Is Ring Splash Active"
              checked={form.isRingSplashActive}
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
UserCallForwardingAlwaysSecondary.propTypes = {
  match: PropTypes.object.isRequired
}
