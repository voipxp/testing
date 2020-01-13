import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Input} from 'rbx'
import { useAlerts } from '@/store/alerts'
import apiUserServiceDeliveryBlocking from '@/api/user-services-settings/user-calling-line-id-delivery-blocking-service'
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

export const UserCallingLineIdDeliveryBlocking = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userServiceData, loadUserServiceDeliveryBlocking] = useState([])
  
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const data = await apiUserServiceDeliveryBlocking.show(userId)
		    loadUserServiceDeliveryBlocking(data)
      } catch (error) {
        alertDanger(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [userId, alertDanger])
  
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
		const updatedData = await apiUserServiceDeliveryBlocking.update(formData)
    loadUserServiceDeliveryBlocking(updatedData)
      alertSuccess('Call Forwarding Busy Updated')
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
        title="Calling Line ID Delivery Blocking"
        buttons={
          <UiButton color="link" icon="edit" size="small" onClick={edit} />
        }
      >
	  
        <UiSection>
          <UiListItem label="Enabled">
            <UiCheckbox isChecked={userServiceData.isActive} />
          </UiListItem>
        </UiSection>
      </UiCard>
      <UiCardModal
        title={`Edit Calling Line ID Delivery Blocking`}
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
      >
        <form>
          <UiSection title="Enable">
            <UiInputCheckbox
              name="isActive"
              label="Enable Calling Line ID Delivery Blocking"
              checked={form.isActive}
              onChange={handleInput}
            />
          </UiSection>
        </form>
      </UiCardModal>
    </>
  )
}
UserCallingLineIdDeliveryBlocking.propTypes = {
  match: PropTypes.object.isRequired
}
