import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { useAlerts } from '@/store/alerts'
import { useQuery , setQueryData } from 'react-query'
import api from '@/api/user-services-settings/user-connected-line-identification-restriction-service'
import {
  UiButton,
  UiCard,
  UiCardModal,
  UiCheckbox,
  UiInputCheckbox,
  UiListItem,
  UiLoadingCard,
  UiSection,
} from '@/components/ui'

export const UserConnectedLineIdentificationRestriction = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)

  const { data: result, isLoading, error } = useQuery(
    'user-connectedLIne-Identif-Restrict',
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
      const newConnectedLineIdentificationRestrict = await api.update(formData)
      setQueryData(['user-connectedLIne-Identif-Restrict'], newConnectedLineIdentificationRestrict, {
        shouldRefetch: true
      })
      alertSuccess('Connected Line Identification Restriction Updated')
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
        title="Connected Line Identification Restriction"
        buttons={
          <UiButton color="link" icon="edit" size="small" onClick={edit} />
        }
      >
	      <UiSection>
          <UiListItem label="Enable">
            <UiCheckbox isChecked={userServiceData.isActive} />
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
          <UiSection title="Enable">
            <UiInputCheckbox
              name="isActive"
              label="Is Active"
              checked={form.isActive}
              onChange={handleInput}
            />
          </UiSection>
        </form>
      </UiCardModal>
    </>
  )
}
UserConnectedLineIdentificationRestriction.propTypes = {
  match: PropTypes.object.isRequired
}
