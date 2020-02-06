import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Input } from 'rbx'
import { useAlerts } from '@/store/alerts'
import {useQuery , setQueryData} from 'react-query'
import api from '@/api/user-services-settings/user-remote-office-service'
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
  
  const {data : getResult , isLoading, error} = useQuery(
     'remote-office',
     ()=>api.show( userId )
  )

  const userServiceData = getResult || {}
  if (error) alertDanger(error)
  if( isLoading ) return <UiLoadingCard />
  
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
      const newCallRecording = await api.update(formData)
      setQueryData(['remote-office'], newCallRecording, {
        shouldRefetch: true
      })
      alertSuccess('Remote Office Updated')
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
