import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Input} from 'rbx'
import { useAlerts } from '@/store/alerts'
import { useQuery, setQueryData } from 'react-query'
import api from '@/api/user-services-settings/user-automatic-hold-retrieve-service'
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
   const { data: result, isLoading, error } = useQuery(
    'user-automatic-hold-retrieve',
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
    if( form.recallTimerSeconds > options.recallTimerSeconds.maximum || form.recallTimerSeconds < options.recallTimerSeconds.minimum ){
		  alertDanger('Automatic Hold/Retrieve Value ' + options.recallTimerSeconds.minimum + ' and Maximum Value ' + options.recallTimerSeconds.maximum)
		  return false
	  }else{
		  update(form)
	  }
  }

  async function update(formData) {
    showLoadingModal()
    try {
      const newAutomaticHoldRetrive = await api.update(formData)
      setQueryData(['user-automatic-hold-retrieve'], newAutomaticHoldRetrive, {
        shouldRefetch: true
      })
      alertSuccess('Automatic Hold/Retrieve Updated')
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
