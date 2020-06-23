import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { useAlerts } from '@/store/alerts'
import { useQuery, queryCache} from 'react-query'
import api from '@/api/user-services-settings/user-internal-calling-line-id-delivery-service'
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
import { AppHelp } from '@/components/app'

export const UserInternalCallingLineIdDelivery = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)

  const {data:result , isLoading, error} = useQuery(
    'internal-calling-line-id-delivery',
    ()=>api.show(userId)
  )

  const userServiceData = result || {}

  if(error) alertDanger(error)
  if(isLoading) return <UiLoadingCard/>

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
		  const newInternalCallingLIneIdDelivery = await api.update(formData)
      queryCache.setQueryData(
        'internal-calling-line-id-delivery',
        newInternalCallingLIneIdDelivery,{
          shouldRefetch: true
        }
      )
      alertSuccess('Internal Calling Line ID Delivery Updated')
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
        title="Internal Calling Line ID Delivery"
		helpModule={<AppHelp module='Internal Calling Line ID Delivery'/>}
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
        title={`Edit Internal Calling Line ID Delivery`}
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
      >
        <form>
          <UiSection title="Settings">
            <UiInputCheckbox
              name="isActive"
              label="is Active"
              checked={form.isActive}
              onChange={handleInput}
            />
          </UiSection>
        </form>
      </UiCardModal>
    </>
  )
}
UserInternalCallingLineIdDelivery.propTypes = {
  match: PropTypes.object.isRequired
}
