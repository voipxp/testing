import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Input } from 'rbx'
import { useAlerts } from '@/store/alerts'
import { useQuery, setQueryData } from 'react-query'
import api from '@/api/user-services-settings/user-call-forwarding-no-answer-service'
import {
  UiButton,
  UiCard,
  UiCardModal,
  UiCheckbox,
  UiFormField,
  UiInputCheckbox,
  UiListItem,
  UiLoadingCard,
  UiSection
} from '@/components/ui'

export const UserCallForwardingNoAnswer = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)
  
  const { data: result, isLoading, error } = useQuery(
    'user-call-forwarding-no-ans',
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
    
    if((form.isActive === true) && ((form.forwardToPhoneNumber === undefined ) || (form.forwardToPhoneNumber === "" ) )){
			alertDanger('The Service Required Phone Number')
			return false
		}
		
		if( (form.isActive === true) && (( form.forwardToPhoneNumber.length > options.forwardToPhoneNumber.maximum ) || (form.forwardToPhoneNumber.length < options.forwardToPhoneNumber.minimum) )){
			  alertDanger('Number Used For Outgoing Call Digits ' + options.forwardToPhoneNumber.minimum + ' and Maximum Value ' + options.forwardToPhoneNumber.maximum)
			  return false
		  }
    
    if( form.numberOfRings > options.numberOfRings.maximum || form.numberOfRings < options.numberOfRings.minimum ){
		  alertDanger('Number Of Rings Minimum Value ' + options.numberOfRings.minimum + ' and Maximum Value ' + options.numberOfRings.maximum)
		  return false
    }
    update(form)
  }
  
  async function update(formData) {
    showLoadingModal()
    try {
      const newCallForwardingNoAns = await api.update(formData)
      
      setQueryData(['user-call-forwarding-no-ans'], newCallForwardingNoAns, {
        shouldRefetch: true
      })
      alertSuccess('Call Forwarding No Answer Updated')
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
        title="Call Forwarding No Answer"
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
        
          <UiListItem label="Number of Rings">
            { userServiceData.numberOfRings }
          </UiListItem>
        </UiSection>
      </UiCard>

      <UiCardModal
        title={`Edit Call Forwarding No Answer`}
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
                onChange = {handleInput}
              />
			      </UiFormField>
			 
			      <UiFormField label="Number Of Rings">  
              <Input
                type="number"
                name="numberOfRings"
                value={form.numberOfRings}
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
UserCallForwardingNoAnswer.propTypes = {
  match: PropTypes.object.isRequired
}
