import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Select } from 'rbx'
import { useAlerts } from '@/store/alerts'
import { useQuery , setQueryData} from 'react-query'
import api from '@/api/user-services-settings/user-outlook-integration-service'
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

export const UserOutlookInteration = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)
  const {data : result, isLoading, error } = useQuery(
    'user-outlook-integration',
    () => api.show( userId )
  )

  const userServiceData =  result || {}
  const contactRetrievalSelection =  api.options.contactRetrievalSelection || {}
  
  if(error) alertDanger(isLoading)
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
		const updatedData = await api.update(formData)
    setQueryData(
      ['user-outlook-integration'], updatedData,{
        shouldRefetch:true
      }
    )
      alertSuccess('Outlook Integration Updated')
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
        title="Outlook Integration"
        buttons={
          <UiButton color="link" icon="edit" size="small" onClick={edit} />
        }
      >
	      <UiSection>
          <UiListItem label="Active">
            <UiCheckbox isChecked={userServiceData.isActive} />
          </UiListItem>
		  <UiListItem label="Contact Retrieval Selection">
             {userServiceData.contactRetrievalSelection} 
          </UiListItem>
        </UiSection>
      </UiCard>
      <UiCardModal
        title={`Edit Outlook Integration`}
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
			
			  <UiFormField label="Contact Retrieval Selection"> 
              <Select.Container fullwidth>
                <Select
                  value={form.contactRetrievalSelection}
                  onChange={handleInput}
                  name="contactRetrievalSelection"
                >
                  {contactRetrievalSelection.map(searchType => (
                    <Select.Option
                      key={searchType.key}
                      value={searchType.key}
                    >
                      {searchType.name}
                    </Select.Option>
                  ))}
                </Select>
              </Select.Container>
            </UiFormField>
          </UiSection>
        </form>
      </UiCardModal>
    </>
  )
}
UserOutlookInteration.propTypes = {
  match: PropTypes.object.isRequired
}
