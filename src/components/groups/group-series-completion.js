import React, { useState, useEffect } from 'react'
import { Input , Button, Breadcrumb } from 'rbx'
import { AppBreadcrumb } from '@/components/app'
import PropTypes from 'prop-types'
import apiSeriesCompletion from '@/api/group-settings-services/group-series-completion-service'
import { orderBy } from 'natural-orderby'
import { hideLoadingModal } from '@/store/ui' 
import { useAlerts } from '@/store/alerts'
import {
  UiButton,
  UiCard,
  UiCardModal,
  UiDataTable,
  UiFormField,
  UiLoadingCard,
  UiSection,
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
  const { serviceProviderId, groupId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const [loading, setLoading] = useState(true)
  const [groupSeriesCompletion, setGroupSeriesCompletion] = useState([]) 
  const [showModal, setShowModal] = useState(false)
  
  const [form, setForm] = useState({})
  const [selectedUserForm, setSelectedUserForm] = useState({})
  const [availableUser, setAvailableUser] = useState([])
  const [selectedUser, setSelectedUser] = useState([])
  const [allAvailableUser, setAllAvailableUser] = useState([])
  const [showConfirm, setShowConfirm] = useState(false)
  const [canSelectedUser, setCanSelectedUser] = useState(true)
  
  
  const seriesCompletionNames = []

  const loadSeriesCompletions = React.useCallback(async () => {
    try {
      const data = await apiSeriesCompletion.show(serviceProviderId, groupId)
      setGroupSeriesCompletion(data)
      const avaliableUsersList = await apiSeriesCompletion.users(serviceProviderId, groupId)
      setAvailableUser(avaliableUsersList)
      setAllAvailableUser(avaliableUsersList) 
    } catch (error) {
      alertDanger(error)
    } finally {
      setLoading(false)
    }
  }, [serviceProviderId, groupId, alertDanger]) 
  
  useEffect(() => {
    setLoading(true)
    loadSeriesCompletions()  
  }, [alertDanger, loadSeriesCompletions])

  const seriesCompletionName  =  groupSeriesCompletion.names ||  [] 
  const sortGroupCompletionName = React.useMemo(() => {
  const sortedValues =   orderBy( seriesCompletionName, shortedValue => shortedValue )
    // eslint-disable-next-line array-callback-return
    sortedValues.map(function(el) {
        seriesCompletionNames.push({
          names: el
        })
    })
    return seriesCompletionNames
  }, [seriesCompletionName , seriesCompletionNames] )
  
  if( canSelectedUser ){
    if(seriesCompletionNames.length > 0 ){
      setCanSelectedUser(false)
      getGroupDetails(serviceProviderId , groupId , sortGroupCompletionName[0].names)
    }
  }

  async function getGroupDetails(serviceProviderId,groupId , name){ 
     
    try {
      const dataUser = await apiSeriesCompletion.groupDetail(serviceProviderId, groupId , name)
      const dataSelectedUser = dataUser.users || [] 
      setSelectedUser(dataSelectedUser)
      const initialForm = {
        "serviceProviderId":serviceProviderId,
        "groupId":groupId,
        "name":name,
        "newName":name,
        "users":dataSelectedUser,
        "isCreate":false
      }
      setForm({...initialForm })
      setSelectedUserForm({...initialForm})
    } catch (error) {
      alertDanger(error)
      setShowModal(true)
    } finally {
      setLoading(false)
      hideLoadingModal()
    }
  }

  const columnsData = [
    { key: 'names', label: 'Group Name' }
  ]
  
  function handleInput(event) { 
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setForm({ ...form, [name]: value })
  }

  async function onSelect(rows) { 
    const initialForm  = {
      "serviceProviderId":serviceProviderId,
      "groupId":groupId,
      "name":form.name,
      "newName":form.newName,   
      "users":selectedUser ,
      "isCreate":false
    }
    setForm({ ...initialForm })
    setSelectedUserForm({...initialForm})
    getGroupDetails(serviceProviderId , groupId , rows.names)
    setAvailableUser(allAvailableUser)
  } 

  function add() {
    setForm({ ...initialForm })
    setShowModal(true)
  }

  
  function onCancel() {
    setForm({ ...selectedUserForm })
    setShowModal(false)
    
  }

  function edit() { 
    setShowModal(true)
  }
  
  function editUser() { 
    const initialForm  = {
      "serviceProviderId":serviceProviderId,
      "groupId":groupId,
      "name":form.name,
      "newName":form.newName,   
      "users":selectedUser ,
      "isCreate":false
    }
    setForm({ ...initialForm })
    update(initialForm)
  }

  async function create() {   
    const postCreateData  = {
      "serviceProviderId":serviceProviderId,
      "groupId":groupId,
      "name":form.names,  
      "users":[] 
    } 
    setLoading(true)
    setShowModal(false)
    setCanSelectedUser(true)
    try {
      await apiSeriesCompletion.store(postCreateData)
      alertSuccess('Series Completion Updated')
      await loadSeriesCompletions()
      setCanSelectedUser(true)
    } catch (error) {
      alertDanger(error)
      setLoading(false)
      setShowModal(true)
    } finally {
      setLoading(false)
      setShowModal(false)
    }
  }

  function save() { 
    form.isCreate ? create(form) : update(form)
  }

  const remove = () => {
    setShowConfirm(false)
    destroy(form)
  }

  async function destroy(form) { 
    setLoading(true)
    try {
      await apiSeriesCompletion.destroy(serviceProviderId, groupId , form.name)
      await loadSeriesCompletions()
      setCanSelectedUser(true)
      alertSuccess('Series Completion Deleted')
    } catch (error) {
      alertDanger(error)
    } finally {
      setLoading(false)
    }
  }

  async function update(profile) { 
    setShowModal(false)
    setLoading(true)
    try {
      await apiSeriesCompletion.update(profile) 
      await loadSeriesCompletions()
      setCanSelectedUser(true)
      alertSuccess('Series Completion Updated')
    } catch (error) {
      alertDanger(error)
      setShowModal(true)
    } finally {
      setLoading(false)
      hideLoadingModal()
    }
  }
    
  if(loading) return <UiLoadingCard />
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
      <UiDataTable
          columns={columnsData}
          rows={seriesCompletionNames}
          rowKey="names"
          hideSearch={false}
          onClick={onSelect}
          showSelect={true}
          pageSize={5}
        />
      </UiCard>
      <UiCardModal
        title={form.isCreate ? 'Add Series Completion Group Name' :(`Edit Series Completion  Group Name : ${form.name}`) }
        isOpen={showModal}
        onCancel={onCancel}
        onSave={save}
      >
        <form>
          { form.isCreate ? (
            <>
          <UiSection>
            <UiFormField label="Group Name" horizontal>
              <Input
              type="text"
              name="names"
              value={form.names}
              onChange={handleInput}
              />
            </UiFormField>
          </UiSection>
          </>
          ) :( <>
          <UiSection>
            <UiFormField label="Group Name" horizontal>
              <Input
              type="text"
              name="newName"
              value={form.newName}
              onChange={handleInput}
              />
            </UiFormField>
          </UiSection> 
          </>
          )
          }
        </form>
      </UiCardModal>
      {  !canSelectedUser ? (
        <>
          <UiCard title={(`Series Completion Group Name : ${selectedUserForm.newName}`) }
           buttons={
            <UiButton color="link" icon="edit" size="small" onClick={edit} />
          }
          >
            <UiSelectableTable
              title="Users"
              availableUser={availableUser}
              setAvailableUser={(availableItem) => setAvailableUser(availableItem)}
              selectedUser={selectedUser}
              setSelectedUser={(selectedItem) => setSelectedUser(selectedItem)}
              rowKey='userId'
              showMoveBtn={true}
            />
            <Button.Group align="right" style={{ margin: '1rem 0rem' }}  > 
              <Button color='danger' onClick={() => setShowConfirm(true)} >Delete</Button>
              <Button color='success' onClick={editUser}>Save</Button>
            </Button.Group>
          </UiCard>
          <UiCardModal
            title="Please Confirm"
            isOpen={showConfirm}
            onCancel={() => setShowConfirm(false)}
            onDelete={remove}
          >
            <blockquote>
              Are you sure you want to Remove this Series Completion Group {form.name} ?
            </blockquote>
          </UiCardModal>
        </>
        ) :''
      }
    </>
  )
}
GroupSeriesCompletion.propTypes = {
  match: PropTypes.object.isRequired
}
