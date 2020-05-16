import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { useAlerts } from '@/store/alerts'
import { useQuery, queryCache } from 'react-query'
import api from '@/api/user-services-settings/user-calling-name-delivery-service'
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

export const UserCallingNameDelivery = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)
  
  const { data: result, isLoading, error } = useQuery(
    'user-calling-delivery',
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
      const newUserCallingNameDelivery = await api.update(formData)
      queryCache.setQueryData(['user-calling-delivery'], newUserCallingNameDelivery, {
        shouldRefetch: true
      })
      alertSuccess('Calling Name Retrieval Updated')
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
        title="Calling Name Delivery"
        buttons={
          <UiButton color="link" icon="edit" size="small" onClick={edit} />
        }
      >
	  
        <UiSection>
          <UiListItem label="External Calling Name Delivery">
            <UiCheckbox isChecked={userServiceData.isActiveForExternalCalls} />
          </UiListItem>
          <UiListItem label="Internal Calling Name Delivery">
            <UiCheckbox isChecked={userServiceData.isActiveForInternalCalls} />
          </UiListItem>
        </UiSection>
      </UiCard>
      <UiCardModal
        title={`Edit Calling Name Delivery`}
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
      >
        <form>
          <UiSection title="Settings">
            <UiInputCheckbox
              name="isActiveForExternalCalls"
              label="External Calling Name Delivery"
              checked={form.isActiveForExternalCalls}
              onChange={handleInput}
            />
            <UiInputCheckbox
              name="isActiveForInternalCalls"
              label="Internal Calling Name Delivery"
              checked={form.isActiveForInternalCalls}
              onChange={handleInput}
            />
          </UiSection>
        </form>
      </UiCardModal>
    </>
  )
}
UserCallingNameDelivery.propTypes = {
  match: PropTypes.object.isRequired
}
