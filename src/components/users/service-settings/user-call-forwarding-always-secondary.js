import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Input } from 'rbx'
import { useAlerts } from '@/store/alerts'
import { useQuery, queryCache } from 'react-query'
import api from '@/api/user-services-settings/user-call-forwarding-always-secondary-service'
import { AppHelp } from '@/components/app'
import {
  UiButton,
  UiCard,
  UiCardModal,
  UiCheckbox,
  UiFormField,
  UiInputCheckbox,
  UiListItem,
  UiLoadingCard,
  UiSection
} from '@/components/ui'

export const UserCallForwardingAlwaysSecondary = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)

  const { data: result, isLoading, error } = useQuery(
    'user-call-forwarding-always-secondary',
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
		if((form.isActive === true) && ((form.forwardToPhoneNumber === undefined ) || (form.forwardToPhoneNumber === "" ) )){
       alertDanger('The Call Forwarding Always Secondary Service Required Phone Number')
       return false
		}
	  if( (form.isActive === true) && (( form.forwardToPhoneNumber.length > options.forwardToPhoneNumber.maximum ) || (form.forwardToPhoneNumber.length < options.forwardToPhoneNumber.minimum) )){
			  alertDanger('Number Used For Outgoing Call Digits ' + options.forwardToPhoneNumber.minimum + ' and Maximum Value ' + options.forwardToPhoneNumber.maximum)
			  return false
		  }
    update(form)
  }

  async function update(formData) {
    showLoadingModal()
    try {
      const newCallForwardingAlwaysSecondary = await api.update(formData)
      queryCache.setQueryData(['user-call-forwarding-always-secondary'], newCallForwardingAlwaysSecondary, {
        shouldRefetch: true
      })
      alertSuccess('Call Forwarding Always Secondary Updated')
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
        title="Call Forwarding Always Secondary"
		helpModule={<AppHelp module='Call Forwarding Always Secondary'/>}
        buttons={
          <UiButton color="link" icon="edit" size="small" onClick={edit} />
        }
      >
	      <UiSection>
		      <UiListItem label="Is Active">
            <UiCheckbox isChecked={userServiceData.isActive} />
          </UiListItem>
		      <UiListItem label="Is Ring Splash Active">
		        <UiCheckbox isChecked={userServiceData.isRingSplashActive} />
          </UiListItem>
          <UiListItem label="Forward to Phone Number">
            {userServiceData.forwardToPhoneNumber}
          </UiListItem>
		    </UiSection>
      </UiCard>

      <UiCardModal
        title={`Edit Call Forwarding Always Secondary`}
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

			      <UiInputCheckbox
              name="isRingSplashActive"
              label="Is Ring Splash Active"
              checked={form.isRingSplashActive}
              onChange={handleInput}
            />

			      <UiFormField label="Forward To">
              <Input
                type="text"
                name="forwardToPhoneNumber"
                value={form.forwardToPhoneNumber}
                placeholder="Forward To"
                onChange={handleInput}
              />
            </UiFormField>
			    </UiSection>
			  </form>
      </UiCardModal>
    </>
  )
}
UserCallForwardingAlwaysSecondary.propTypes = {
  match: PropTypes.object.isRequired
}
