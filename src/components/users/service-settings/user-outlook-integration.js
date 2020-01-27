import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Select } from 'rbx'
import { useAlerts } from '@/store/alerts'
import apiUserOutlookInterationService from '@/api/user-services-settings/user-outlook-integration-service'
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
  const [loading, setLoading] = useState(true)
  const [userServiceData, setUserServiceData] = useState([])
  
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const data = await apiUserOutlookInterationService.show(userId)
		    setUserServiceData(data)
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
  
  const contactRetrievalSelection = [
    { key: 'Retrieve Default Contact Folder Only', name: 'Retrieve Default Contact Folder Only' },
    { key: 'Retrieve All Contacts', name: 'Retrieve All Contacts' } 
  ]
  
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
		const updatedData = await apiUserOutlookInterationService.update(formData)
    setUserServiceData(updatedData)
      alertSuccess('Outlook Integration Updated')
      setShowModal(false)
    } catch (error) {
      alertDanger(error)
    } finally {
      hideLoadingModal()
    }
  }

  if (loading) return <UiLoadingCard />

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
