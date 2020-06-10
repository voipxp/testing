import React, { useState } from 'react'
import { Breadcrumb } from 'rbx'
import { AppBreadcrumb } from '@/components/app'
import PropTypes from 'prop-types'
import apiSpDomain from '@/api/service-providers/service-provider-assign-domains-service'
import apiSystemDomain from '@/api/system/system-domain-service'
import { orderBy } from 'natural-orderby'
import { useAlerts } from '@/store/alerts'
import { useAsync } from 'react-async-hook'
import { useUi } from '@/store/ui'
import _ from 'lodash'

import {
  UiButton,
  UiCard,
  UiCardModal,
  UiDataTable,
  UiLoadingCard,
  UiListItem,
  UiSelectableTable
} from '@/components/ui'

export const ServiceProviderAssignDomains = ({ match, isBreadcrumb = true }) => {
  const { serviceProviderId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const [showModal, setShowModal] = useState(false)
  const initialForm = {
    serviceProviderId: serviceProviderId,
    default: '',
    domains: [] 
  }
  const [form, setForm] = useState({ ...initialForm })
  const [availableUser, setAvailableUser] = useState([])
  const [selectedUser, setSelectedUser] = useState([])
  const [canSelectedUser, setCanSelectedUser] = useState(true)
  const { showLoadingModal, hideLoadingModal } = useUi()
  const serviceProviderDomains = []
  const domainNames = []
  const { result, execute } = useAsync(
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
 const { result:sPDomains ,loading:spDomainLoading, execute:domainExecute } = useAsync(
    () => apiSpDomain.load(serviceProviderId),
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
    update(form)
  }

  if(canSelectedUser){  
    if ((serviceProviderDomains.length > 0) && (domainNames.length>0)) {
     _.pullAllWith(domainNames, serviceProviderDomains, _.isEqual)
      setSelectedUser(serviceProviderDomains)
      setAvailableUser(domainNames)
      setCanSelectedUser(false)
      
    }
  }

  const columns = [
    { key: 'domains', label: 'Domain Name' }
  ]
   
  function edit() {
    setForm({ ...initialForm })
    setShowModal(true)
  }
   
  async function update(profile) {  
    showLoadingModal()
    try {
      await apiSpDomain.update(profile)
      await execute()
      await domainExecute()
      alertSuccess('Domains Updated')
    } catch (error) {
      alertDanger(error)
    } finally {
      hideLoadingModal()
      setShowModal(false)
    }
  } 
  if (spDomainLoading) return <UiLoadingCard />
  return (
    <>
	{(isBreadcrumb && 
      <AppBreadcrumb>
        <Breadcrumb.Item>Domains</Breadcrumb.Item>
      </AppBreadcrumb>
	)}
      <UiCard
        title="Assign Domains List"
        buttons={
          <UiButton 
          color="link"
          icon="edit" 
          size="small"
          onClick={edit} />
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
          showSelect={true}
          pageSize={25}
        />
      </UiCard>
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
          showMoveBtn={false}
        />
      </UiCardModal>
    
    </>
  )
}
ServiceProviderAssignDomains.propTypes = {
  match: PropTypes.object.isRequired,
  isBreadcrumb : PropTypes.bool
}
