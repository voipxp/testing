import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Input} from 'rbx'
import { useAlerts } from '@/store/alerts'
import apiUserCallingNameRetrieval from '@/api/user-services-settings/user-calling-name-retrieval-service'
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

export const UserCallingNameRetrieval = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userServiceData, loadUserCallingNameRetrieval] = useState([])
  
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const data = await apiUserCallingNameRetrieval.show(userId)
		    loadUserCallingNameRetrieval(data)
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
    setForm({ ...userServiceData })
    setShowModal(true)
  }
  
  function save() {
    update(form)
  }

  async function update(formData) {
	showLoadingModal()
    try {
	  const updatedData = await apiUserCallingNameRetrieval.update(formData)
      loadUserCallingNameRetrieval(updatedData)
      alertSuccess('Calling Name Retrieval Updated')
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
        title="Calling Name Retrieval"
        buttons={
          <UiButton color="link" icon="edit" size="small" onClick={edit} />
        }
      >
	  
        <UiSection>
          <UiListItem label="Is Active">
            <UiCheckbox isChecked={userServiceData.isActive} />
          </UiListItem>
        </UiSection>
      </UiCard>
      <UiCardModal
        title={`Edit Calling Name Retrieval`}
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
      >
        <form>
          <UiSection title="Setting">
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
UserCallingNameRetrieval.propTypes = {
  match: PropTypes.object.isRequired
}
