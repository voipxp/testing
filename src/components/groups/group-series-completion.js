import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Input } from 'rbx'
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
      "users":[
        {
          userId:''
        }
      ]
    }
    

 const { serviceProviderId,groupId} = match.params
  //const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState(initialForm)
  const [showModal, setShowModal] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  
  const [availableUser, setAvailableUser] = useState([])
  const [selectedUser, setSelectedUser] = useState([])

  const { data: result, isLoading, error } =  useQuery(
    'user-speed-dial-100',
    () => api.show(serviceProviderId,groupId)
  )
  
  const userServiceData = result || {} 
  const seriesCompletion  =  userServiceData.names || []
  const seriesCompletionNames = [];
   // eslint-disable-next-line array-callback-return
  seriesCompletion.map(function(el) {
    const  item = {}
    item ["names"] = el;
    item ["sp"] = serviceProviderId;
    item ["groupId"] = groupId;
    seriesCompletionNames.push(item);
  });
  
  console.log(seriesCompletionNames)
  console.log('ddddddddddd')
  const columnsData = [
    { key: 'names', label: 'Group Name' },
    { key: 'sp', label: 'Service Provider' },
    { key: 'groupId', label: 'Group' },
    
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
  
/*
*create new user speed dial 100
*/

async function create(createFormData) { 
  const postCreateData  = {
    "serviceProviderId":createFormData.serviceProviderId,
    "groupId":createFormData.groupId,
     
    "speedCodes":[
      {
        "speedCode":createFormData.speedCode,
        "phoneNumber":createFormData.phoneNumber,
        "description":createFormData.description
      }
    ]
  }
  showLoadingModal()
  try {
    const createData = api.store(postCreateData)
    setForm({
      ...createData,
      serviceProviderId,
      groupId,
      isCreate: false,
        "speedCodes":[
          {
            "speedCode":createData.speedCode,
            "phoneNumber":createData.phoneNumber,
            "description":createData.description
          }
        ]
        
    })
    alertSuccess('Series Completion Created')
    setShowModal(false)
  } catch (error_) {
    alertDanger(error_)
  } finally {
    hideLoadingModal()
  }
}

  function edit(row) { 
    setForm({
      ...row,
      serviceProviderId,
      groupId,
      isCreate: false,
      
        "speedCodes":[
          {
            "speedCode":row.speedCode,
            "phoneNumber":row.phoneNumber,
            "description":row.description
          }
        ]
        
    })
    setShowModal(true)
  }
  
  function save() { 
    form.isCreate ? create(form) : update(form)
  }
  
  async function update(data) {
     const editFormData  = {
      "serviceProviderId":data.serviceProviderId,
      "groupId":data.groupId,
      
      "speedCodes":[
        {
          "speedCode":data.speedCode,
          "phoneNumber":data.phoneNumber,
          "description":data.description
        }
      ]
    } 
    showLoadingModal()
     
    try {
      const newUserCallForwardingAlways = await api.update(editFormData)
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
      <UiCard
        title="Series Completion"
        buttons={
          <UiButton color="link" icon="add" size="small" onClick={add} />
        }
      >
        
         {form.isCreate ?
        <UiDataTable
          columns={columnsData}
          rows={seriesCompletionNames}
          rowKey="names"
          hideSearch={false}
          onClick={edit}
        />
        :(
      <UiSelectableTable
        title="Users"
        availableUser={availableUser}
        setAvailableUser={(availableItem) => setAvailableUser(availableItem)}
        selectedUser={selectedUser}
        setSelectedUser={(selectedItem) => setSelectedUser(selectedItem)}
        rowKey='userId'
      />
      )
}
      </UiCard>
        <UiCardModal
          title={form.isCreate ? 'New SpeedCode' :(`Edit SpeedCode : ${form.speedCode}`) }
          isOpen={showModal}
          onCancel={() => setShowModal(false)}
          onSave={save}
          onDelete={form.isCreate ? null : () => setShowConfirm(true)}
        >
        <form>
          <UiSection>
          { (form.isCreate ? (
              <>
                 <UiFormField label="Phone Number" horizontal>
                  <Input
                  type="text"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleInput}
                  />
                </UiFormField>
                <UiFormField label="Description" horizontal>
                  <Input
                    type="text"
                    name="description"
                    value={form.description}
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
                        value={form.phoneNumber}
                        onChange={handleInput}
                      />
                    </UiFormField>
                    <UiFormField label="Description" horizontal>
                      <Input
                        type="text"
                        name="description"
                        value={form.description}
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
