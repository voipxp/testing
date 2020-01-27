import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Input , Select} from 'rbx'
import { useAlerts } from '@/store/alerts'
import apiUserHotelingHostService from '@/api/user-services-settings/user-hoteling-host-service'
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
  const [loading, setLoading] = useState(true)
  const [userServiceData, setUserServiceData] = useState([])
  
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const data = await apiUserHotelingHostService.show(userId)
        console.log(data)
		    setUserServiceData(data)
      } catch (error) {
        alertDanger(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [userId, alertDanger])

  const userAccessLevelType = [
    { key:'Group', name: 'Group'},
    { key:'Enterprise', name : 'Enterprise'}
  ]
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
    if( (form.associationLimitHours > 999) || ( form.associationLimitHours < 1 ) ){
      alertDanger('Enforce Association Limit Hours Minimum 1 and Maximum 999')
      return false
    }else{
      update(form)
    }
    
  }

  async function update(formData) {
	  showLoadingModal()
    try {
		  const updatedData = await apiUserHotelingHostService.update(formData)
      setUserServiceData(updatedData)
      alertSuccess('Hoteling Host Updated')
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
            <UiCheckbox isChecked={userServiceData.firstName} />
          </UiListItem>
          <UiListItem label="First Name">
            {userServiceData.firstName}
          </UiListItem>
          <UiListItem label="Phone Number">
            {userServiceData.mobilePhoneNumber}
          </UiListItem>
          <UiListItem label="Extension">
            <UiCheckbox isChecked={userServiceData.extension} />
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
