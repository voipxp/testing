import React, { useState, useEffect } from 'react'
import { Input, Button, Breadcrumb } from 'rbx'
import { AppBreadcrumb } from '@/components/app'
import PropTypes from 'prop-types'
import apiSpDomain from '@/api/service-providers/service-provider-add-domains-service'

import apiSystemDomain from '@/api/system/domains'
import { orderBy } from 'natural-orderby'
import { hideLoadingModal } from '@/store/ui'
import { useAlerts } from '@/store/alerts'
import { useAsync } from 'react-async-hook'

import _ from 'lodash'

import {
  UiButton,
  UiCard,
  UiCardModal,
  UiDataTable,
  UiFormField,
  UiLoadingCard,
  UiSection,
  UiListItem,
  UiSelectableTable
} from '@/components/ui'

export const ServiceProviderAddDomains = ({ match }) => {
  const { serviceProviderId } = match.params

  const { alertSuccess, alertDanger } = useAlerts()
  const [loading, setLoading] = useState(true)
  const [showLoading, setShowLoading] = useState(false)
  const [sPDomains, setSPDomains] = useState([])
  const [showModal, setShowModal] = useState(false)
  const initialForm = {
    serviceProviderId: serviceProviderId,
    default: '',
    domains: [] 
  }
  const [form, setForm] = useState({ ...initialForm })
  const [selectedUserForm, setSelectedUserForm] = useState({ ...initialForm })
  const [availableUser, setAvailableUser] = useState([])
  const [selectedUser, setSelectedUser] = useState([])
  const [allAvailableUser, setAllAvailableUser] = useState([])
  
  const [makeDefaultDoaminName, setMakeDefaultDoaminName] = useState('')

  const [showConfirm, setShowConfirm] = useState(false)
  const [canSelectedUser, setCanSelectedUser] = useState(true)
  const serviceProviderDomains = []

  const domainNames = []
  const { result, loading:loadingDomains , execute } = useAsync(
    () => apiSystemDomain.load(),
    []
  )
   
  const domainsResult = (result && result.domains) || []
  if(domainsResult.length > 0){
  const sortedValuesSystemDomain = orderBy(
    domainsResult,
    shortedValue => shortedValue
  )
  // eslint-disable-next-line array-callback-return
  sortedValuesSystemDomain.map(function(el) {
    domainNames.push({
      "domains": el
    })
  })

}
   
useAsync(
  () =>
  apiSpDomain.load(serviceProviderId).then(domains => {
    setSPDomains(domains)
      
    }),
  []
) 
  
  const sPDomain = sPDomains && sPDomains.domains || []
  const defaultDomain = ( sPDomains && sPDomains.default )
  form['default'] = defaultDomain
  const sortedValues = orderBy(
    sPDomain,
    shortedValue => shortedValue
  )
  // eslint-disable-next-line array-callback-return
  sortedValues.map(function(el) {
    serviceProviderDomains.push({
      domains: el
    })
  })
  
  function editUser() {
    const domainStringVal = [];
    _.forEach(selectedUser, function(value) {
      domainStringVal.push(value.domains)
    });
    form['domains'] = domainStringVal
    setForm({ ...initialForm })
    setSelectedUserForm(form)
    update(form)
  }

  if(canSelectedUser){  
    if ((serviceProviderDomains.length > 0) && (domainNames.length>0)) {
      _.pullAllWith(domainNames, serviceProviderDomains, _.isEqual)
      setAvailableUser(domainNames)
      setCanSelectedUser(false)
      
    }
  }

  const columns = [
    { key: 'domains', label: 'Domain Name' }
  ]
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


  async function onSelect(rows) {
    setMakeDefaultDoaminName(rows.domains)
    setLoading(false)

  }

  function edit() {
    setShowModal(true)
  } 
 
  
  const remove = () => {
    setLoading(true)
    setShowConfirm(false)
   // destroy(form)
  }

  async function update(profile) {  
    try {
      await apiSpDomain.create(profile)
      form['name'] = profile.newName
      form['newName'] = profile.newName
      setShowModal(false)
      setForm(form)
     // setSelectedUserForm(form)
    //  await loadSeriesCompletions()
      setCanSelectedUser(true)
      
      alertSuccess('Domains Updated')
    } catch (error) {
      alertDanger(error)
      setShowModal(true)
    } finally {
      setLoading(false)
      hideLoadingModal()
    }
  } 
  if (loadingDomains) return <UiLoadingCard />
  return (
    <>
      <AppBreadcrumb>
        <Breadcrumb.Item>Domains</Breadcrumb.Item>
      </AppBreadcrumb>
      <UiCard
        title="Assign Domains"
        buttons={
          <UiButton 
          color="link"
          icon="edit" 
          size="small"
          onClick={add} />
        }
      > 
       <UiListItem label="Default Domain">
          {defaultDomain}
        </UiListItem>
         <UiDataTable
          columns={columns}
          rows={serviceProviderDomains}
          rowKey="domains"
          hideSearch={false}
          onClick={onSelect}
          showSelect={true}
          pageSize={5}
        />  
      <br />
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
        title='Domains'
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={editUser}
      >
       <UiSelectableTable
              title="Available Domains"
              availableUser={availableUser}
              setAvailableUser={availableItem =>
                setAvailableUser(availableItem)
              }
              selectedUser={selectedUser}
              setSelectedUser={selectedItem => setSelectedUser(selectedItem)}
              rowKey="domains"
              showMoveBtn={true}
            />
      </UiCardModal>
    
    </>
  )
}
ServiceProviderAddDomains.propTypes = {
  match: PropTypes.object.isRequired
}
