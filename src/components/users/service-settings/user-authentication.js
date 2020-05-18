import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { useAlerts } from '@/store/alerts'
import { Input } from 'rbx'
import { useQuery, setQueryData } from 'react-query'
import api from '@/api/user-services-settings/user-authentication-service'
import { generatePassword } from '@/utils'
import {
  UiCard,
  UiLoadingCard,
  UiButton,
  UiCardModal,
  UiSection,
  UiListItem,
  UiFormField,
  UiInputPassword
} from '@/components/ui'
export const UserAuthentication = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const initialForm = {
    password: ''
  }
  const [form, setForm] = useState(initialForm)
  const [showModal, setShowModal] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const { data: result, isLoading, error } = useQuery(
    'user-call-recording',
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
	  setForm({
      ...userServiceData,
      password: '' 
       
    })
     
    setShowModal(true)
  }
  
  function save() {
    update(form)
  }

  async function update(formData) {
    showLoadingModal()
    try {
      const newCallRecording = await api.update(formData)
      setQueryData(['user-call-recording'], newCallRecording, {
        shouldRefetch: true
      })
      alertSuccess('Authentication Updated')
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
        title="Authentication"
        buttons={
          <UiButton color="link" icon="edit" size="small" onClick={edit} />
        }
      >
	      <UiSection>
          <UiListItem label="Username">
            {userServiceData.userName}  
          </UiListItem>
        </UiSection>
      </UiCard>
      <UiCardModal
        title={`Edit Authentication`}
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
      >
        <form>
          <UiSection title="Username">
            <UiFormField label="Username">
              <Input
                type="text"
                name="userName"
                value={form.userName}
                onChange={handleInput}
              />
			      </UiFormField>
            <UiFormField label="Password" horizontal>
              <UiInputPassword
                name="password"
                value={form.password}
                onChange={handleInput}
                onGeneratePassword={generatePassword}
              />
             </UiFormField>
          </UiSection>
        </form>
      </UiCardModal>
      <UiCardModal
        title="Please Confirm"
        isOpen={showConfirm}
        onCancel={() => setShowConfirm(false)}
      ></UiCardModal>
    </>
  )
}
UserAuthentication.propTypes = {
  match: PropTypes.object.isRequired
}
