import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { useAlerts } from '@/store/alerts'
import { useQuery, queryCache} from 'react-query'
import api from '@/api/user-services-settings/user-integrated-imp-service'
import {
  UiButton,
  UiCard,
  UiCardModal,
  UiCheckbox,
  UiInputCheckbox,
  UiListItem,
  UiLoadingCard,
  UiSection
} from '@/components/ui'

export const UserIntegratedImp = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)
   
  const {data: result , isLoading, error } = useQuery(
    'user-integrated',
	() => api.show(userId)		
  )
  const userServiceData  =  result || {}

  if(error) alertDanger(error)
  if(isLoading) return <UiLoadingCard />
  
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
      const newIntegrated = await api.update(formData)
      queryCache.setQueryData(['user-integrated'], newIntegrated, {
        shouldRefetch: true
      })
      alertSuccess('Integrated IMP Updated')
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
        title="Integrated IMP"
        buttons={
          <UiButton color="link" icon="edit" size="small" onClick={edit} />
        }
      >
	      <UiSection>
          <UiListItem label="Is Enabled">
            <UiCheckbox isChecked={userServiceData.isActive} />
          </UiListItem>
        </UiSection>
      </UiCard>
      <UiCardModal
        title={`Edit Integrated IMP`}
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
      >
        <form>
          <UiSection title="Active">
            <UiInputCheckbox
              name="isActive"
              label="Enable Integrated IMP"
              checked={form.isActive}
              onChange={handleInput}
            />
          </UiSection>
        </form>
      </UiCardModal>
    </>
  )
}
UserIntegratedImp.propTypes = {
  match: PropTypes.object.isRequired
}
