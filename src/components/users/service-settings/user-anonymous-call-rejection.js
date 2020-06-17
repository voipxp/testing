import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { useAlerts } from '@/store/alerts'
import { useQuery, queryCache } from 'react-query'
import api from '@/api/user-services-settings/user-anonymous-call-rejection-service'
import { AppHelp } from '@/components/app'
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

export const UserAnonymousCallRejection = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)

  const { data: result, isLoading, error } = useQuery(
    'anonymous-call-rejection',
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
    setForm({ ...userServiceData })
    setShowModal(true)
  }

  function save() {
    update(form)
  }

  async function update(formData) {
	  showLoadingModal()
    try {
		  const newUserAnonymousCallRejection = await api.update(formData)
      queryCache.setQueryData(['anonymous-call-rejection'], newUserAnonymousCallRejection, {
        shouldRefetch: true
      })
	    alertSuccess('Anonymous Call Rejection Updated')
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
        title="Anonymous Call Rejection"
		helpModule={<AppHelp module='Anonymous Call Rejection'/>}
        buttons={
          <UiButton color="link" icon="edit" size="small" onClick={edit} />
        }
      >
        <UiSection>
          <UiListItem label="Enabled">
            <UiCheckbox isChecked={userServiceData.isActive} />
          </UiListItem>
        </UiSection>
      </UiCard>

      <UiCardModal
        title={`Edit Anonymous Call Rejection`}
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
      >
        <form>
          <UiSection title="Enabled">
            <UiInputCheckbox
              name="isActive"
              label="Anonymous Call Rejection"
              checked={form.isActive}
              onChange={handleInput}
            />
          </UiSection>
        </form>
      </UiCardModal>
    </>
  )
}
UserAnonymousCallRejection.propTypes = {
  match: PropTypes.object.isRequired
}
