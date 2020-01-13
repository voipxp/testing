import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Input, Select, Column } from 'rbx'
import { useAlerts } from '@/store/alerts'
import apiUserServiceNoAnswer from '@/api/user-services-settings/user-call-forwarding-no-answer-service'
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

export const UserCallForwardingNoAnswer = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userDataNoAnswer, loadUserNotServiceNoAnswer] = useState([])
  
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const data = await apiUserServiceNoAnswer.show(userId)
		loadUserNotServiceNoAnswer(data)
      } catch (error) {
        alertDanger(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [userId, alertDanger])
  
  
 const userCallForwordingLength = {
    outgoingDNorSIPURI: { minimum: 1, maximum: 161 },
	numberOfRings: { minimum: 0, maximum: 20 }
  } 
 
 function handleInput(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
	
	if(name ==='numberOfRings') {
		 
		if(target.value > 20 || target.value < 0) {
		 return false 
		}
	}
	
	setForm({ ...form, [name]: value })
 }
  
  function edit() {
    setForm({ ...userDataNoAnswer })
    setShowModal(true)
  }
  
  function save() {
    update(form)
  }

  async function update(formData) {
	showLoadingModal()
    try {
		const updatedData = await apiUserServiceNoAnswer.update(formData)
       loadUserNotServiceNoAnswer(updatedData)

      alertSuccess('Call Forwarding Not Reachable Updated')
      setShowModal(false)
    } catch (error) {
      alertDanger(error)
    } finally {
      hideLoadingModal()
    }
  }

  if (!userDataNoAnswer) return <UiLoadingCard />

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
            <UiCheckbox isChecked={userDataNoAnswer.isActive} />
          </UiListItem>
		  <UiListItem label="Forward to Phone Number">
            {userDataNoAnswer.forwardToPhoneNumber}
          </UiListItem>
		  
		  <UiListItem label="Number of Rings">
		   { userDataNoAnswer.numberOfRings }
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
				  minLength = {userCallForwordingLength.outgoingDNorSIPURI.minimum} 
                  maxLength = {userCallForwordingLength.outgoingDNorSIPURI.maximum}
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
