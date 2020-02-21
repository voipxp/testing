import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Input , Breadcrumb } from 'rbx'
import { AppBreadcrumb } from '@/components/app'
import { useAlerts } from '@/store/alerts'
import { useQuery, setQueryData } from 'react-query'
import api from '@/api/group-settings-services/group-series-completion-service'
import {
  UiButton,
  UiCardModal,
  UiCard,
  UiLoadingCard,
  UiSection,
  UiFormField,
  UiDataTable ,
  UiSelectableTable
} from '@/components/ui'
export const GroupSeriesCompletion = ({ match }) => {
  
  const initialForm = {
    isCreate: true,
    "serviceProviderId":'',
    "groupId":'',
    "name":'',
    "users":[]
  }

   
  
  const { serviceProviderId,groupId} = match.params
  //const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState(initialForm)
  const [showModal, setShowModal] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [availableUser, setAvailableUser] = useState([
        
          {userId: "test@parkbenchsolutions.com"},
          {userId: "gggg1111@parkbenchsolutions.com"}
      
  ])
  const [selectedUser, setSelectedUser] = useState([
    {userId: "tesy@parkbenchsolutions.com"},
  {userId: "gggg@parkbenchsolutions.com"}
  ])
  const seriesCompletionNames = [] 

  const { data: result, isLoading, error } =  useQuery(
    'series-completion',
    () => api.show(serviceProviderId,groupId)
  )
  
  const userServiceData = result || {} 
  const seriesCompletion  =  userServiceData.names || []
   /*

  const { data: available, aLoading, aError } =  useQuery(
    'series-completion-available',
    () => api.usersGroup(serviceProviderId,groupId)
  ) */


  //const availableUsers =  available || {}
  //const selectedUser =  availableUsers
  

  //setSelectedUser(selectedUsers) 
  //const seriesCompletionNames = [];
   // eslint-disable-next-line array-callback-return
  seriesCompletion.map(function(el) {
    seriesCompletionNames.push({
      names: el
    })
  }) 


  const columnsData = [
    { key: 'names', label: 'Group Name' }
  ]
    
  const remove = () => {
      setShowConfirm(false)
     // destroy(serviceProviderId, groupId)
    }

  if (error) alertDanger(error)
  if (isLoading) return <UiLoadingCard />

  
  function handleInput(event) { 
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name 
	  setForm({ ...form, [name]: value })
	}
  
  function add() {
    setForm({ ...initialForm })
    setShowModal(true)
  }
  
  function open(selectedRow){
     
  }
/*
*create new user speed dial 100
*/

async function create(data) {   
  const postCreateData  = {
    "serviceProviderId":serviceProviderId,
    "groupId":groupId,
    "name":data.names,
    "users":[]
  }
  showLoadingModal()
  try {
    const getresponseData =   await api.store(postCreateData)
    setQueryData(['series-completion'], getresponseData, {
    shouldRefetch: true,
  })
    alertSuccess('Group Series Competed Created')
    setForm({ ...getresponseData })
    setShowModal(false)
  } catch (error_) {
    alertDanger(error_)
  } finally {
    hideLoadingModal()
  }
} 
  function save() { 
    form.isCreate ? create(form) : update(form)
  }
  
  async function update(data) { 
      
    showLoadingModal()
     
    try {
      const newUserCallForwardingAlways = await api.update(data)
      setQueryData(['series-completion'], newUserCallForwardingAlways, {
        shouldRefetch: true,
      })
      alertSuccess('Alternate Numbers Setting Updated')
      setShowModal(false)
    } catch (error_) {
      alertDanger(error_)
    } finally {
      hideLoadingModal()
    }
  }
 
  return (  
    <>
    <AppBreadcrumb>
      <Breadcrumb.Item>Series Completion</Breadcrumb.Item>
    </AppBreadcrumb>

    <UiCard
      title="Series Completion"
      buttons={
        <UiButton color="link" icon="add" size="small" onClick={add} />
      }
    >
       <UiSelectableTable
         title="Users"
         availableUser={availableUser}
         setAvailableUser={(availableItem) => setAvailableUser(availableItem)}
         selectedUser={selectedUser}
         setSelectedUser={(selectedItem) => setSelectedUser(selectedItem)}
         rowKey='userId'
       />
         {form.isCreate ?
        
       <UiDataTable
       columns={columnsData}
       rows={seriesCompletionNames}
       rowKey="names"
       hideSearch={false}
       onClick={open}
       pageSize={20}
     />
        : ''
      }
      </UiCard>
      <UiCardModal
          title={form.isCreate ? 'Group Name' :(`Edit Group Name : ${form.names}`) }
          isOpen={showModal}
          onCancel={() => setShowModal(false)}
          onSave={save}
          onDelete={form.isCreate ? null : () => setShowConfirm(true)}
        >
        <form>
          <UiSection>
          { (form.isCreate ? (
              <>
                 <UiFormField label="Group Name" horizontal>
                  <Input
                  type="text"
                  name="names"
                  value={form.names}
                  onChange={handleInput}
                  />
                </UiFormField>
                

              </>
            ) : (
                  <>
                    <UiFormField label="Phone Number" horizontal>
                      <Input
                        type="text"
                        name="phoneNumber"
                        value=""
                        onChange={handleInput}
                      />
                    </UiFormField>
                    <UiFormField label="Description" horizontal>
                      <Input
                        type="text"
                        name="description"
                        value=""
                        onChange={handleInput}
                      />
                    </UiFormField>
                  </>
                )
              )
            }
          </UiSection>
        </form>
      </UiCardModal>
      <UiCardModal
            title="Please Confirm"
            isOpen={showConfirm}
            onCancel={() => setShowConfirm(false)}
            onDelete={remove}
          >
            <blockquote>
              Are you sure you want to Remove this Series Completion Id?
            </blockquote>
          </UiCardModal>
    </>
  
  )
 
 

}
GroupSeriesCompletion.propTypes = {
  match: PropTypes.object.isRequired
}
