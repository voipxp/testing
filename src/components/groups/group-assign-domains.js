import React, { useState } from 'react'
import { Breadcrumb } from 'rbx'
import { AppBreadcrumb } from '@/components/app'
import PropTypes from 'prop-types'
import apiGrpDomain from '@/api/groups/domains'
import apiSpDomain from '@/api/service-providers/service-provider-assign-domains-service'
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
import { useAcl } from '@/utils'
export const GroupAssignDomains = ({ match, isBreadcrumb = true }) => {
  const { groupId, serviceProviderId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const [showModal, setShowModal] = useState(false)
  const { showLoadingModal, hideLoadingModal } = useUi()
  const initialForm = {
    serviceProviderId: serviceProviderId,
    groupId: groupId,
    default: '',
    domains: [] 
  }

  const acl = useAcl()

   
const isService = acl.is('Service Provider') || acl.is('System') ||  acl.is('hasProvisioning')

  const [form, setForm] = useState({ ...initialForm })
  const [availableUser, setAvailableUser] = useState([])
  const [selectedUser, setSelectedUser] = useState([])
  const [canSelectedUser, setCanSelectedUser] = useState(true)
  const serviceProviderDomains = []
  const domainNames = []
  const { result, execute } = useAsync(
    () => apiSpDomain.load(serviceProviderId),
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
    () => apiGrpDomain.domains(groupId,serviceProviderId),
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
      await apiGrpDomain.update(profile)
      await execute()
      await domainExecute()
      alertSuccess('Domains Updated')
      setCanSelectedUser(true)
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
        title="Assign Domains"
        buttons={
          isService  && (
          <UiButton 
            color="link"
            icon="edit" 
            size="small"
            onClick={edit} />
          )
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
GroupAssignDomains.propTypes = {
  match: PropTypes.object.isRequired,
  isBreadcrumb : PropTypes.bool
}
