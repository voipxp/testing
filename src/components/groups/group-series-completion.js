import React, { useState, useEffect } from 'react'
import { Input, Button, Breadcrumb } from 'rbx'
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
  const { serviceProviderId, groupId } = match.params

  const { alertSuccess, alertDanger } = useAlerts()
  const [loading, setLoading] = useState(true)
  const [showLoading, setShowLoading] = useState(false)
  const [groupSeriesCompletion, setGroupSeriesCompletion] = useState([])
  const [showModal, setShowModal] = useState(false)
  const initialForm = {
    isCreate: true,
    serviceProviderId: serviceProviderId,
    groupId: groupId,
    name: '',
    newName: '',
    users: []
  }
  const [form, setForm] = useState({ ...initialForm })
  const [selectedUserForm, setSelectedUserForm] = useState({ ...initialForm })
  const [availableUser, setAvailableUser] = useState([])
  const [selectedUser, setSelectedUser] = useState([])
  const [allAvailableUser, setAllAvailableUser] = useState([])
  const [showConfirm, setShowConfirm] = useState(false)
  const [canSelectedUser, setCanSelectedUser] = useState(true)
  const seriesCompletionNames = []
  const loadSeriesCompletions = React.useCallback(async () => {
    try {
      setShowLoading(true)
      const avaliableUsersList = await apiSeriesCompletion.users(
        serviceProviderId,
        groupId
      )
      setAvailableUser(avaliableUsersList)
      setAllAvailableUser(avaliableUsersList)
      const data = await apiSeriesCompletion.show(serviceProviderId, groupId)
      setGroupSeriesCompletion(data)
      
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
  
  
  const seriesCompletionName = groupSeriesCompletion.names || []
  const sortGroupCompletionName = React.useMemo(() => {
    const sortedValues = orderBy(
      seriesCompletionName,
      shortedValue => shortedValue
    )
    // eslint-disable-next-line array-callback-return
    sortedValues.map(function(el) {
      seriesCompletionNames.push({
        names: el
      })
    })
    return seriesCompletionNames
  }, [seriesCompletionName, seriesCompletionNames])


  async function getGroupDetails(serviceProviderId, groupId, name) {
   // setLoading(true)
    try {
      const dataUser = await apiSeriesCompletion.groupDetail(
        serviceProviderId,
        groupId,
        name
      )
      const dataSelectedUser = dataUser.users || []
      setSelectedUser(dataSelectedUser)
     // const tempForm = { ...form }
     form['name'] = name
     form['newName'] = name
     form['users'] = dataSelectedUser
     form['isCreate'] = false

      setForm(form)
      setSelectedUserForm(form)
    } catch (error) {
      alertDanger(error)
      setShowModal(true)
    } finally {
      setLoading(false)
      setShowLoading(false)
      hideLoadingModal()
    }
  }

  if (canSelectedUser) {
    if (seriesCompletionNames.length > 0) {
      setCanSelectedUser(false)
      form.name ? 
        getGroupDetails(
          serviceProviderId,
          groupId,
            form.name
        ) :
        getGroupDetails(
          serviceProviderId,
          groupId, 
          sortGroupCompletionName[0].names
        )
    }
  }

  const columnsData = [{ key: 'names', label: 'Group Name' }]

  function handleInput(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setForm({ ...form, [name]: value })
  }

  async function onSelect(rows) {
    setLoading(true)
    getGroupDetails(
      serviceProviderId, 
      groupId,
      rows.names
    )
    setAvailableUser(allAvailableUser)
  }

  function add() {
    setForm({ ...initialForm })
    setShowModal(true)
  }
/*
  function onCancel() {
    setLoading(true)
    setForm({ ...selectedUserForm })
    setShowModal(false)
  } */

  function edit() {
    setShowModal(true)
  }

  function editUser() {
    form['users'] = selectedUser
    setForm({ ...form })
    setSelectedUserForm(form)
    update({ ...form })
  }

  async function create() {
    form['name'] = form.names
    try {
      await apiSeriesCompletion.store(form)
      setShowModal(false)
      setCanSelectedUser(true)
      alertSuccess('Series Completion Group Created')
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
    setLoading(false)
    form.isCreate ? create(form) : update(form)
  }

  const handleKeyDown = e => { 
    if ( e.key === "Enter" ) {
      e.preventDefault()
      save()
    }
  }
  
  const remove = () => {
    setLoading(true)
    setShowConfirm(false)
    destroy(form)
  }

  async function destroy(form) {
    try {
      await apiSeriesCompletion.destroy(serviceProviderId, groupId, form.name)
      form['name'] = ''
      form['newName'] = ''
      setForm(form)
      setSelectedUserForm(form)
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
    try {
      await apiSeriesCompletion.update(profile)
      form['name'] = profile.newName
      form['newName'] = profile.newName
      setShowModal(false)
      setForm(form)
      setSelectedUserForm(form)
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

  if (showLoading) return <UiLoadingCard />
  return (
    <>
      <AppBreadcrumb>
        <Breadcrumb.Item>Series Completion</Breadcrumb.Item>
      </AppBreadcrumb>
      <UiCard
        title="Series Completion"
        buttons={
          <UiButton 
          color="link"
          icon="add" 
          size="small"
          onClick={add} />
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
      <br />
      <UiCardModal
        title={
          form.isCreate
            ? 'Add Series Completion Group Name'
            : `Edit Series Completion  Group Name : ${selectedUserForm.name}`
        }
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
      >
        <form>
          {form.isCreate ? (
            <>
              <UiSection>
                <UiFormField label="Group Name" horizontal>
                  <Input
                    type="text"
                    name="names"
                    value={form.names}
                    onKeyPress={handleKeyDown}
                    onChange={handleInput}
                  />
                </UiFormField>
              </UiSection>
            </>
          ) : (
            <>
              <UiSection>
                <UiFormField label="Group Name" horizontal>
                  <Input
                    type="text"
                    name="newName"
                    value={form.newName}
                    onKeyPress={handleKeyDown}
                    onChange={handleInput}
                  />
                </UiFormField>
              </UiSection>
            </>
          )}
        </form>
      </UiCardModal>
  
      {!canSelectedUser ? (
        <>
         
          { loading ? (
            <UiLoadingCard />
          ) : (
             
            <UiCard
                title={`Series Completion Group Name : ${selectedUserForm.newName}`}
                buttons={
                  <UiButton color="link" icon="edit" size="small" onClick={edit} />
                }
            >
          
            <UiSelectableTable
              title="Users"
              availableUser={availableUser}
              setAvailableUser={availableItem =>
                setAvailableUser(availableItem)
              }
              selectedUser={selectedUser}
              setSelectedUser={selectedItem => setSelectedUser(selectedItem)}
              rowKey="userId"
              showMoveBtn={true}
            />
           
            <Button.Group align="right" style={{ margin: '1rem 0rem' }}>
              <Button color="danger" onClick={() => setShowConfirm(true)}>
                Delete
              </Button>
              <Button color="success" onClick={editUser}>
                Save
              </Button>
            </Button.Group>
          </UiCard> 
          )}   
          <UiCardModal
            title="Please Confirm"
            isOpen={showConfirm}
            onCancel={() => setShowModal(false)}
            onDelete={remove}
          >
            <blockquote>
              Are you sure you want to Remove this Series Completion Group{' '}
              {form.name} ?
            </blockquote>
          </UiCardModal>
        </>
       
      ) : (
        ''
      )}
    </>
  )
}
GroupSeriesCompletion.propTypes = {
  match: PropTypes.object.isRequired
}
