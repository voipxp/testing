import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Input} from 'rbx'
import { useAlerts } from '@/store/alerts'
import apiUserServiceAutomaticHoldRetrieve from '@/api/user-services-settings/user-automatic-hold-retrieve-service'
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

export const UserAutomaticCallHoldRetrieve = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userServiceData, loadUserAutomaticHoldRetrieve] = useState([])
  
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const data = await apiUserServiceAutomaticHoldRetrieve.show(userId)
		    loadUserAutomaticHoldRetrieve(data)
      } catch (error) {
        alertDanger(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [userId, alertDanger])
  
  const recallTimerSeconds =  { minimum: 6, maximum: 600 }
  function handleInput(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    if(name ==='recallTimerSeconds')
    {
      if(value < 6 || value > 600 ) return false
    }
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
	  const updatedData = await apiUserServiceAutomaticHoldRetrieve.update(formData)
      loadUserAutomaticHoldRetrieve(updatedData)
      alertSuccess('Automatic Hold/Retrieve Updated')
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
        title="Automatic Hold/Retrieve"
        buttons={
          <UiButton color="link" icon="edit" size="small" onClick={edit} />
        }
      >
	      <UiSection>
          <UiListItem label="Is Active">
            <UiCheckbox isChecked={userServiceData.isActive} />
          </UiListItem>
          <UiListItem label="Recall Timer (seconds)">
            {userServiceData.recallTimerSeconds}
          </UiListItem>
        </UiSection>
      </UiCard>
      <UiCardModal
        title={`Edit Settings`}
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
            <UiFormField label="Recall Timer (seconds)">  
              <Input
                type="number"
                name="recallTimerSeconds"
                value={form.recallTimerSeconds}
                onChange={handleInput}
				        minLength = {recallTimerSeconds.minimum}
				        maxLength = {recallTimerSeconds.maximum}
              />
              
            </UiFormField>
          </UiSection>
        </form>
      </UiCardModal>
    </>
  )
}
UserAutomaticCallHoldRetrieve.propTypes = {
  match: PropTypes.object.isRequired
}
