import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { useAlerts } from '@/store/alerts'
import { useQuery, queryCache} from 'react-query'
import api from '@/api/user-services-settings/user-directed-call-pickup-with-barge-in-service'
import {
  UiButton,
  UiCard,
  UiCardModal,
  UiCheckbox,
  UiInputCheckbox,
  UiLoadingCard,
  UiListItem,
  UiSection,
} from '@/components/ui'

export const UserDirectedCallPickupWithBargeIn = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)
  
  const {data: result , isLoading, error } = useQuery(
    'user-direct-call-pickup-with-bargeIn',
	() => api.show(userId)		
  )
  const userServiceData  =  result || {}

  if( error ) alertDanger( error )
  if( isLoading ) return <UiLoadingCard/>
 
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
      const newDirectCallPickupWithBargeIn = await api.update(formData)
      queryCache.setQueryData(['user-direct-call-pickup-with-bargeIn'], newDirectCallPickupWithBargeIn, {
        shouldRefetch: true
      })
      alertSuccess('Directed Call Pickup with Barge-in Updated')
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
        title="Directed Call Pickup with Barge-in"
        buttons={
          <UiButton color="link" icon="edit" size="small" onClick={edit} />
        }
      >
	      <UiSection>
        <UiListItem label="Barge In Warning Tone">
            <UiCheckbox isChecked={userServiceData.enableBargeInWarningTone} />
          </UiListItem>
          <UiListItem label="Automatic Target Selection">
            <UiCheckbox isChecked={userServiceData.enableAutomaticTargetSelection} />
          </UiListItem>
           
        </UiSection>
      </UiCard>
      <UiCardModal
        title={`Edit Directed Call Pickup with Barge-in`}
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
        
      >
        <form>
          <UiSection title="Enable">
            <UiInputCheckbox
              name="enableBargeInWarningTone"
              label="Barge In Warning Tone"
              checked={form.enableBargeInWarningTone}
              onChange={handleInput}
            />
            <UiInputCheckbox
              name="enableAutomaticTargetSelection"
              label="Automatic Target Selection"
              checked={form.enableAutomaticTargetSelection}
              onChange={handleInput}
            />
          </UiSection>
        </form>
      </UiCardModal>
    </>
  )
}
UserDirectedCallPickupWithBargeIn.propTypes = {
  match: PropTypes.object.isRequired
}
