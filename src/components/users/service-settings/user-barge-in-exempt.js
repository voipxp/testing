import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { useAlerts } from '@/store/alerts'
import { useQuery, queryCache } from 'react-query'
import api from '@/api/user-services-settings/user-barge-in-exempt-service'
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

export const UserBargeInExempt = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)

 const { data: result, isLoading, error } = useQuery(
    'user-barge-in-exempt',
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
      const newUserBargeInExempt = await api.update(formData)
      queryCache.setQueryData(['user-barge-in-exempt'], newUserBargeInExempt, {
        shouldRefetch: true
      })
      alertSuccess('Barge In Exempt Updated')
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
        title="Barge In Exempt"
		helpModule={<AppHelp module='Barge-in Exempt'/>}
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
        title={`Edit Barge In Exempt`}
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
      >
        <form>
		      <UiSection title="General Settings">
		        <UiInputCheckbox
              name="isActive"
              label="Enable Barge In Exempt"
              checked={form.isActive}
              onChange={handleInput}
            />
			    </UiSection>
			  </form>
      </UiCardModal>
    </>
  )
}
UserBargeInExempt.propTypes = {
  match: PropTypes.object.isRequired
}
