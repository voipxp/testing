import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Input } from 'rbx'
import { useAlerts } from '@/store/alerts'
import { useQuery, setQueryData } from 'react-query'
import api from '@/api/user-services-settings/user-call-forwarding-not-reachable-service'
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

export const UserCallForwardingNotReachable = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)
   
  const { data: result, isLoading, error, refetch } = useQuery(
    'user-call-forwarding-not-reachable',
    () => api.show(userId)
  )

  const UserNotRechableView = result || {}

  if (error) alertDanger(error)
  if (isLoading) return <UiLoadingCard />

  const userCallForwordingLength = {
    outgoingDNorSIPURI: { minimum: 1, maximum: 161 }
  } 
 
  function handleInput(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setForm({ ...form, [name]: value })
  }
  
  function edit() {
    setForm({ ...UserNotRechableView })
    setShowModal(true)
  }
  
  function save() {
    update(form)
  }

  async function update(formData) {
	  showLoadingModal()
    try {
		const newUserCFNR = await api.update(formData)
      setQueryData(['user-call-forwarding-not-reachable'], newUserCFNR, {
        shouldRefetch: true
      })
	  alertSuccess('Call Forwarding Not Reachable Updated')
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
        title="Call Forwarding Not Reachable"
        buttons={
          <UiButton color="link" icon="edit" size="small" onClick={edit} />
        }
      >
	      <UiSection>
		      <UiListItem label="Is Active">
            <UiCheckbox isChecked={UserNotRechableView.isActive} />
          </UiListItem>
		      <UiListItem label="Forward to Phone Number">
            {UserNotRechableView.forwardToPhoneNumber}
          </UiListItem>
		    </UiSection>
      </UiCard>

      <UiCardModal
        title={`Edit Call Forwarding Not Reachable`}
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
                type = "text"
                name = "forwardToPhoneNumber"
                value = {form.forwardToPhoneNumber}
                placeholder = "Forward To"
                onChange = {handleInput}
                minLength = {userCallForwordingLength.outgoingDNorSIPURI.minimum} 
                maxLength = {userCallForwordingLength.outgoingDNorSIPURI.maximum}
              />
				    </UiFormField>
			    </UiSection>
		    </form>
      </UiCardModal>
    </>
  )
}
UserCallForwardingNotReachable.propTypes = {
  match: PropTypes.object.isRequired
}
