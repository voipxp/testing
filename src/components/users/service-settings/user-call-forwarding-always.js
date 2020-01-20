import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Input } from 'rbx'
import { useAlerts } from '@/store/alerts'
import apiUserServiceCallForwardingAlways from '@/api/user-services-settings/user-call-forwarding-always-service'
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

export const UserCallForwardingAlways = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userServiceData, setUserServiceData] = useState([])
  
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const data = await apiUserServiceCallForwardingAlways.show(userId)
		    setUserServiceData(data)
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
		  const updatedData = await apiUserServiceCallForwardingAlways.update(formData)
      setUserServiceData(updatedData)
      alertSuccess('Call Forwarding Always Updated')
      setShowModal(false)
    } catch (error) {
      alertDanger(error)
    } finally {
      hideLoadingModal()
    }
  }

  if (loading) return <UiLoadingCard />

  return (
    <>
      <UiCard
        title="Call Forwarding Always"
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
        title={`Edit Call Forwarding Always`}
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
UserCallForwardingAlways.propTypes = {
  match: PropTypes.object.isRequired
}
