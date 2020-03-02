/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
 
import { Input , Button, Breadcrumb } from 'rbx'
import { AppBreadcrumb } from '@/components/app'
import PropTypes from 'prop-types'
//import apiCommProfile from '@/api/group-communication-barring-profiles'
//import apiComm from '@/api/group-communication-barring'

import apiSeriesCompletion from '@/api/group-settings-services/group-series-completion-service'
import { orderBy } from 'natural-orderby'
import { hideLoadingModal } from '@/store/ui'
import { Select } from 'rbx'
import { useAlerts } from '@/store/alerts'
import {
  UiCard,
  UiLoadingCard,
  UiSection,
  UiButton,
  UiListItem,
  UiCheckbox,
  UiInputCheckbox,
  UiCardModal,
  UiFormField,
  UiDataTable,
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
  const [availableUser, setAvailableUser] = useState([])
  const [selectedUser, setSelectedUser] = useState([])
  const [allAvailableUser, setAllAvailableUser] = useState([])
  const [addConfirm, setAddConfirm] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [canSelectedUser, setCanSelectedUser] = useState(true)
  
  const seriesCompletionNames = []

  const loadSeriesCompletions = React.useCallback(async () => {
    try {
      const data = await apiSeriesCompletion.show(serviceProviderId, groupId)
      setGroupSeriesCompletion(data)
     // setgroupSeriesCompetionNames(data.names)

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
    sortedValues.map(function(el) {
        seriesCompletionNames.push({
          names: el
        })
    })
    return seriesCompletionNames
  }, [seriesCompletionName , seriesCompletionNames] )
  
  if( canSelectedUser === true ){
    if(seriesCompletionNames.length > 0 ){
      setCanSelectedUser(false)
      getGroupDetails(serviceProviderId , groupId , sortGroupCompletionName[0].names)
    }
  }

 async function getGroupDetails(serviceProviderId,groupId , name){ 
  setForm({
    "serviceProviderId":serviceProviderId,
    "groupId":groupId,
    "name":name,
    "users":selectedUser
  })
  try {
    const data1 = await apiSeriesCompletion.groupDetails(serviceProviderId, groupId , name)
    const dataSelected = data1.users || [] 
    setSelectedUser(dataSelected)
  } catch (error) {
    alertDanger(error)
    setShowModal(true)
  } finally {
    setLoading(false)
    hideLoadingModal()
  }
}

console.log(availableUser)
 
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
    setForm({
      ...rows,
      "serviceProviderId":serviceProviderId,
      "groupId":groupId,
      "name":rows.names,
      "users":selectedUser
    })
    
    getGroupDetails(serviceProviderId , groupId , rows.names)
    setAvailableUser(allAvailableUser)
  } 

  function add() {
    setAddConfirm(true)
    setForm({ ...initialForm })
    setShowModal(true)
  }

  function edit() { 
    setAddConfirm(false)
    const editFormDetails  = {
      "serviceProviderId":serviceProviderId,
      "groupId":groupId,
      "name":form.name,  
      "users":selectedUser 
    }
    setForm({ ...editFormDetails })
    update(editFormDetails)
  }

  async function create(form) {    
    const postCreateData  = {
      "serviceProviderId":serviceProviderId,
      "groupId":groupId,
      "name":form.names,  
      "users":[] 
    } 
    setShowModal(true)
    setCanSelectedUser(true)
    try {
      await apiSeriesCompletion.store(postCreateData)
      await loadSeriesCompletions()
      setCanSelectedUser(true)
      alertSuccess('Series Completion Updated')
    } catch (error) {
      alertDanger(error)
      setShowModal(true)
    } finally {
      setLoading(false)
      setShowModal(false)
    }
     
  }

  function save() { 
    create()
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
      alertSuccess('series-completion Deleted')
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
        <Breadcrumb.Item>series Completion</Breadcrumb.Item>
      </AppBreadcrumb>
      <UiCard
        title="series Completion"
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
        title= 'Group Name'
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
        onDelete={addConfirm ? null : () => setShowConfirm(true)}
      >
        <form>
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
        </form>
      </UiCardModal>
      <UiCard title={(`Series Completion Group Name : ${form.name}`) } >
        <UiSelectableTable
          title="Users"
          availableUser={availableUser}
          setAvailableUser={(availableItem) => setAvailableUser(availableItem)}
          selectedUser={selectedUser}
          setSelectedUser={(selectedItem) => setSelectedUser(selectedItem)}
          rowKey='userId'
        />
        <Button.Group align="right" style={{ margin: '1rem 0rem' }}  > 
          <Button color='danger' onClick={() => setShowConfirm(true)} >Delete</Button>
          <Button color='success' onClick={edit}>Edit</Button>
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
  )
}
GroupSeriesCompletion.propTypes = {
  match: PropTypes.object.isRequired
}
