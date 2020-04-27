import React, { useState, useEffect } from 'react'
import { Input, Button, Breadcrumb } from 'rbx'
import { AppBreadcrumb } from '@/components/app'
import PropTypes from 'prop-types'
import apiSpDomain from '@/api/service-providers/service-provider-add-domains-service'
import { orderBy } from 'natural-orderby'
import { hideLoadingModal } from '@/store/ui'
import { useAlerts } from '@/store/alerts'
import { useAsync } from 'react-async-hook'
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

export const ServiceProviderAddDomains = ({ match }) => {
  const { serviceProviderId } = match.params

  const { alertSuccess, alertDanger } = useAlerts()
  const [loading, setLoading] = useState(true)
  const [showLoading, setShowLoading] = useState(false)
  const [groupSeriesCompletion, setGroupSeriesCompletion] = useState([])
  const [showModal, setShowModal] = useState(false)
  const initialForm = {
    isCreate: true,
    serviceProviderId: serviceProviderId,
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


  useAsync(
    () =>
    apiSpDomain.load(serviceProviderId).then(domains => {
      setGroupSeriesCompletion(domains)
       
      }),
    []
  ) 
 
  const seriesCompletionName = groupSeriesCompletion && groupSeriesCompletion.domains || []
 
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

  if(canSelectedUser){ 
    //setLoading(true)
    if (seriesCompletionNames.length > 0) {
      setCanSelectedUser(false)
     // setLoading(false)
      setAvailableUser(seriesCompletionNames)
     // setSelectedUser(seriesCompletionNames)
      
    }
  }


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
  }
 

  function save() {
    setLoading(false)
  //  form.isCreate ? create(form) : update(form)
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
   // destroy(form)
  }

   
  if (showLoading) return <UiLoadingCard />
  return (
    <>
      <AppBreadcrumb>
        <Breadcrumb.Item>Domains</Breadcrumb.Item>
      </AppBreadcrumb>
      <UiCard
        title="Domains"
        buttons={
          <UiButton 
          color="link"
          icon="add" 
          size="small"
          onClick={add} />
        }
      >

            <UiSelectableTable
              title="Domains List"
              availableUser={availableUser}
              setAvailableUser={availableItem =>
                setAvailableUser(availableItem)
              }
              selectedUser={selectedUser}
              setSelectedUser={selectedItem => setSelectedUser(selectedItem)}
              rowKey="names"
              showMoveBtn={true}
            />

            <Button.Group align="right" style={{ margin: '1rem 0rem' }}>
              <Button color="success" onClick={editUser}>
                Save
              </Button>
            </Button.Group>
         
      </UiCard>
      <UiCardModal
            title="Please Confirm"
            isOpen={showConfirm}
            onCancel={() => setShowConfirm(false)}
            onDelete={remove}
          >
            <blockquote>
              Are you sure you want to Remove Domains{' '}
              {form.name} ?
            </blockquote>
          </UiCardModal>
      <br />
      <UiCardModal
        title={
          form.isCreate
            ? 'Add Domains'
            : `Edit Domains : ${selectedUserForm.name}`
        }
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
      >
        <form>
          {form.isCreate ? (
            <>
              <UiSection>
                <UiFormField label="Domain Name" horizontal>
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
    
    </>
  )
}
ServiceProviderAddDomains.propTypes = {
  match: PropTypes.object.isRequired
}
