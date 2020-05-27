import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { useAlerts } from '@/store/alerts'
import { useQuery, queryCache } from 'react-query'
import api from '@/api/user-services-settings/user-call-waiting-service'
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

export const UserCallWaiting = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)

  const { data: result, isLoading, error } = useQuery(
    'user-call-wating',
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
      const newUserCallWating = await api.update(formData)
      queryCache.setQueryData(['user-call-wating'], newUserCallWating, {
        shouldRefetch: true
      })
      alertSuccess('Call Waiting Updated')
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
        title="Call Waiting"
        buttons={
          <UiButton color="link" icon="edit" size="small" onClick={edit} />
        }
      >

        <UiSection>
          <UiListItem label="Is Active">
            <UiCheckbox isChecked={userServiceData.isActive} />
          </UiListItem>
          <UiListItem label="Disable Calling Line Id Delivery">
            <UiCheckbox isChecked={userServiceData.disableCallingLineIdDelivery} />
          </UiListItem>
        </UiSection>
      </UiCard>
      <UiCardModal
        title={`Edit Call Waiting`}
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
              name="disableCallingLineIdDelivery"
              label="Disable Calling Line Id Delivery"
              checked={form.disableCallingLineIdDelivery}
              onChange={handleInput}
            />
          </UiSection>
        </form>
      </UiCardModal>
    </>
  )
}
UserCallWaiting.propTypes = {
  match: PropTypes.object.isRequired
}
