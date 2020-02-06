import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Input , Select} from 'rbx'
import { useAlerts } from '@/store/alerts'
import { useQuery, setQueryData} from 'react-query'
import api from '@/api/user-services-settings/user-hoteling-host-service'
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

export const UserHotelingHost = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)
  
  const {data : getResult , isLoading, error} = useQuery(
    'hotelling-host',
    ()=>api.show( userId )
  ) 

  const userServiceData = getResult || {}
  const options = api.options || {}
  const userAccessLevelType =  options.userAccessLevelType || {}
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
    if( ( form.associationLimitHours > options.associationLimitHours.maximum ) || ( form.associationLimitHours < options.associationLimitHours.minimum ) ){
      alertDanger('Enforce Association Limit Hours Minimum Value ' + options.associationLimitHours.minimum + ' and Maximum Value ' + options.associationLimitHours.maximum)
      return false
    }else{
      update(form)
    }
    
  }

  async function update(formData) {
	  showLoadingModal()
    try {
		  const updatedData = await api.update(formData)
      setQueryData(
        ['hotelling-host'],updatedData,{
          shouldReFetch:true
        }
      )
      alertSuccess('Hoteling Host Updated')
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
        title="Hoteling Host"
        buttons={
          <UiButton color="link" icon="edit" size="small" onClick={edit} />
        }
      >
        <UiSection>
          <UiListItem label="Active">
            <UiCheckbox isChecked={userServiceData.isActive} />
          </UiListItem>
          <UiListItem label="Enforce Association Limit">
          <UiCheckbox isChecked={userServiceData.enforceAssociationLimit} />
          </UiListItem>
          <UiListItem label="Enforce Association Limit Hours">
            {userServiceData.associationLimitHours}
          </UiListItem>
          <UiListItem label="Access Level">
             {userServiceData.accessLevel}  
          </UiListItem> 
        </UiSection>
      </UiCard>
    
      <UiCard
        title="Associated Guest"
      >
        <UiSection>
          <UiListItem label="Last Name">
            {userServiceData.guestLastName}
          </UiListItem>
          <UiListItem label="First Name">
            {userServiceData.guestFirstName}
          </UiListItem>
          <UiListItem label="Phone Number">
            {userServiceData.guestPhoneNumber}
          </UiListItem>
          <UiListItem label="Extension">
            {userServiceData.guestExtension}
          </UiListItem> 
        </UiSection>
      </UiCard>

      <UiCardModal
        title={`Edit Hoteling Host`}
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
      >
        <form>
          <UiSection title="General Settings">
            <UiInputCheckbox
              name="isActive"
              label="Active"
              checked={form.isActive}
              onChange={handleInput}
            />
            <UiInputCheckbox
              name="enforceAssociationLimit"
              label="Enforce Association Limit"
              checked={form.enforceAssociationLimit}
              onChange={handleInput}
            />
            <UiInputCheckbox
              name="removeGuestAssociation"
              label="Remove Guest Association"
              checked={form.removeGuestAssociation}
              onChange={handleInput}
            />
            <UiFormField label="Enforce Association Limit Hours">
              <Input
              type ="number"
              name ="associationLimitHours"
              value={form.associationLimitHours} 
              onChange={handleInput}
              />
            </UiFormField>
            <UiFormField label="Access Level"> 
              <Select.Container fullwidth>
                <Select
                  value={form.accessLevel}
                  onChange={handleInput}
                  name="accessLevel"
                >
                  {userAccessLevelType.map(searchType => (
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
UserHotelingHost.propTypes = {
  match: PropTypes.object.isRequired
}
