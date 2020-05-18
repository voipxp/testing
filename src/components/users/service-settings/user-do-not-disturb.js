import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { useAlerts } from '@/store/alerts'
import { useQuery, queryCache } from 'react-query'
import api from '@/api/user-services-settings/user-do-not-disturb-service'
import {
  UiButton,
  UiCard,
  UiCardModal,
  UiCheckbox,
  UiListItem,
  UiInputCheckbox,
  UiLoadingCard,
  UiSection
} from '@/components/ui'

export const UserDoNotDisturb = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)

  const {data: result , isLoading, error } = useQuery(
    'do-not-disturb',
	  () => api.show(userId)
  )

  const userServiceData  =  result || {}

  if( error ) alertDanger( error )
  if( isLoading ) return <UiLoadingCard />
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
      const newDoNotDisturb = await api.update(formData)
      queryCache.setQueryData(['do-not-disturb'], newDoNotDisturb, {
        shouldRefetch: true
      })
      alertSuccess('Do Not Disturb Updated')
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
        title="Do Not Disturb"
        buttons={
          <UiButton color="link" icon="edit" size="small" onClick={edit} />
        }
      >
	      <UiSection>
          <UiListItem label="Is Active">
            <UiCheckbox isChecked={userServiceData.isActive} />
          </UiListItem>
          <UiListItem label="Ring Splash">
            <UiCheckbox isChecked={userServiceData.ringSplash} />
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
            <UiInputCheckbox
              name="ringSplash"
              label="Ring Splash"
              checked={form.ringSplash}
              onChange={handleInput}
            />
          </UiSection>
        </form>
      </UiCardModal>
    </>
  )
}
UserDoNotDisturb.propTypes = {
  match: PropTypes.object.isRequired
}
