import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Input } from 'rbx'
import { useAlerts } from '@/store/alerts'
import apiUserRemoteOfficeService from '@/api/user-services-settings/user-remote-office-service'
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

export const UserRemoteOffice = ({ match }) => {
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
        const data = await apiUserRemoteOfficeService.show(userId)
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
	  if(form.remoteOfficePhoneNumber.length > 30){
		  alertDanger('A phone number used for outgoing calls needs to be 2 to 30 digits.')
		  return false
	  }else{update(form)}
    
  }

  async function update(formData) {
	showLoadingModal()
    try {
		const updatedData = await apiUserRemoteOfficeService.update(formData)
    setUserServiceData(updatedData)
      alertSuccess('Remote Office Updated')
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
        title="Remote Office"
        buttons={
          <UiButton color="link" icon="edit" size="small" onClick={edit} />
        }
      >
	      <UiSection>
          <UiListItem label="Active">
            <UiCheckbox isChecked={userServiceData.isActive} />
          </UiListItem>
		  <UiListItem label="Remote Office Number">
             {userServiceData.remoteOfficePhoneNumber} 
          </UiListItem>
        </UiSection>
      </UiCard>
      <UiCardModal
        title={`Edit Remote Office`}
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
			
			<UiFormField label="Remote Office Number">  
                <Input
                  type="number"
                  name="remoteOfficePhoneNumber"
                  value={form.remoteOfficePhoneNumber}
                  placeholder="Remote Office Number"
                  onChange={handleInput}
				 
                />
             </UiFormField>
          </UiSection>
        </form>
      </UiCardModal>
    </>
  )
}
UserRemoteOffice.propTypes = {
  match: PropTypes.object.isRequired
}
