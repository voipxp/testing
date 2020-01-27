import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { useAlerts } from '@/store/alerts'
import { Input } from 'rbx'
import apiUserAuthenticationService from '@/api/user-services-settings/user-authentication-service'
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
  const [loading, setLoading] = useState(true)
  const [showConfirm, setShowConfirm] = useState(false)
  const [userServiceData, setUserServiceData] = useState([])

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const data = await apiUserAuthenticationService.show(userId)
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
		const updatedData = await apiUserAuthenticationService.update(formData)
    setUserServiceData(updatedData)
      alertSuccess('Authentication Updated')
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
