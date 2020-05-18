import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Input , Select} from 'rbx'
import { useAlerts } from '@/store/alerts'
import { useQuery, setQueryData} from 'react-query'
import api from '@/api/user-services-settings/user-hoteling-guest-service'
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

export const UserHotelingGuest = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)
  /*eslint no-const-assign: "error"*/
  /*eslint-env es6*/
  const avalailableHost =[]
  const {data : getResult , isLoading, error} = useQuery(
    'hotelling-guest',
    ()=>api.show( userId )
  )
   
  const {data : getUsers} = useQuery(
    'hotelling-guest-users',
    ()=>api.users( userId )
  )
  avalailableHost.push({ getUsers }) 
 console.log(avalailableHost)
console.log('end users list')
  
  const userServiceData = getResult || {}
  console.log(userServiceData)
  const options = api.options || {}
  const userAccessLevelType =  options.userAccessLevelType || {}
  avalailableHost.push({ userId: '' })

  if (userServiceData.hostUserId) {
    avalailableHost.push({
      userId: userServiceData.hostUserId,
      firstName: userServiceData.hostFirstName,
      lastName: userServiceData.hostLastName
    })
  }

  function userDescription(user) {
    if (!user.userId) return '--NONE--'
    return user.firstName + ' ' + user.lastName + ' (' + user.userId + ')'
  }

  if (userServiceData.hostUserId) {
    userServiceData.hostDescription = userDescription({
      userId: userServiceData.hostUserId,
      lastName: userServiceData.hostLastName,
      firstName: userServiceData.hostFirstName
    })
  }
 
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
    if( ( form.hostAssociationLimitHours > options.associationLimitHours.maximum ) || ( form.hostAssociationLimitHours < options.associationLimitHours.minimum ) ){
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
        ['hotelling-guest'],updatedData,{
          shouldReFetch:true
        }
      )
      alertSuccess('Hoteling Guest Updated')
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
        title="Hoteling Guest"
        buttons={
          <UiButton color="link" icon="edit" size="small" onClick={edit} />
        }
      >
        <UiSection>
          <UiListItem label="Enable">
            <UiCheckbox isChecked={userServiceData.isActive} />
          </UiListItem>
          <UiListItem label="Enforce Association Limit">
          <UiCheckbox isChecked={userServiceData.enableAssociationLimit} />
          </UiListItem>
          <UiListItem label="Enforce Association Limit Hours">
            {userServiceData.associationLimitHours}
          </UiListItem>
          <UiListItem label="Host">
             {userServiceData.hostDescription}  
          </UiListItem> 
        </UiSection>
      </UiCard>
      
	  <UiCardModal
        title={`Edit Hoteling Guest`}
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
              name="hostEnforcesAssociationLimit"
              label="Enforce Association Limit"
              checked={form.hostEnforcesAssociationLimit}
              onChange={handleInput}
            />
            <UiFormField label="Enforce Association Limit Hours">
              <Input
              type ="number"
              name ="associationLimitHours"
              value={form.hostAssociationLimitHours} 
              onChange={handleInput}
              />
            </UiFormField>
             <UiFormField label="Hosts"> 
              <Select.Container fullwidth>
                <Select
                  value={form.hostUserId}
                  onChange={handleInput}
                  name="hostUserId"
                >
                  {avalailableHost.map(searchType => (
                    <Select.Option
                      key={userServiceData.hostDescription}
                      value={userServiceData.hostDescription}
                    >
                      {userServiceData.hostDescription}
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
UserHotelingGuest.propTypes = {
  match: PropTypes.object.isRequired
}
