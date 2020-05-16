import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { useAlerts } from '@/store/alerts'
import { useQuery, queryCache } from 'react-query'
import api from '@/api/user-services-settings/user-calling-number-delivery-service'
import {
  UiButton,
  UiCard,
  UiCardModal,
  UiCheckbox,
  UiInputCheckbox,
  UiListItem,
  UiLoadingCard,
  UiSection
} from '@/components/ui'

export const UserCallingNumberDelivery = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)
  
   const { data: result, isLoading, error } = useQuery(
    'user-calling-number-delivery',
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
		  const newUserCallingNumberDelivery = await api.update(formData)
      queryCache.setQueryData(['user-calling-number-delivery'], newUserCallingNumberDelivery, {
        shouldRefetch: true
		 })
      alertSuccess('Calling Number Delivery Updated')
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
        title="Calling Number Delivery"
        buttons={
          <UiButton color="link" icon="edit" size="small" onClick={edit} />
        }
      >
	      <UiSection>
          <UiListItem label="External Calling Number Delivery">
            <UiCheckbox isChecked={userServiceData.isActiveForExternalCalls} />
          </UiListItem>
          <UiListItem label="Internal Calling Number Delivery">
            <UiCheckbox isChecked={userServiceData.isActiveForInternalCalls} />
          </UiListItem>
        </UiSection>
      </UiCard>
      <UiCardModal
        title={`Edit Settings`}
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
      >
        <form>
          <UiSection title="Enable">
            <UiInputCheckbox
              name="isActiveForExternalCalls"
              label="External Calling Number Delivery"
              checked={form.isActiveForExternalCalls}
              onChange={handleInput}
            />
            <UiInputCheckbox
              name="isActiveForInternalCalls"
              label="Internal Calling Number Delivery"
              checked={form.isActiveForInternalCalls}
              onChange={handleInput}
            />
          </UiSection>
        </form>
      </UiCardModal>
    </>
  )
}
UserCallingNumberDelivery.propTypes = {
  match: PropTypes.object.isRequired
}
