import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { UiCard, UiCardModal, UiInputCheckbox, UiListItem, UiLoading, UiDataTable } from '@/components/ui'
import { Button, Select, Input } from 'rbx'
import groupDomainAPI from '@/api/groups/domains'
import { useAlerts } from '@/store/alerts'
import _ from 'lodash'


import { BulkSelectServiceProviderId } from '../bulk-select-service-provider-id'
// import { NewServiceProviderId } from './bulk-new-service-provider-id'
// import { NewServiceProviderName } from './bulk-new-service-provider-name'
import { BulkCloneOptions } from './bulk-clone-options'


export const BulkEnterpriseCloneAllControls = (props) => {
  // const { serviceProviderId, groupId } = props.initialData
  const [taskData, setTaskData] = React.useState({})
  const [selectSP, setSelectSP] = React.useState(false)
  const [cloneOptions, setCloneOptions] = React.useState([])
  const [cloneServiceProviderId, setCloneServiceProviderId] = React.useState('')
  const [newServiceProviderId, setServiceProviderId] = React.useState('')
  const [newServiceProviderName, setServiceProviderName] = React.useState('')
  const { alertDanger } = useAlerts()

  useEffect( () => {
	  setTaskData(
      {
        cloneServiceProviderId: cloneServiceProviderId,
        newServiceProviderId: newServiceProviderId,
        newServiceProviderName: newServiceProviderName,
        cloneOptions: cloneOptions
      }
	  )

	  props.setTaskData(taskData)
  }, [cloneServiceProviderId, newServiceProviderId, newServiceProviderName, cloneOptions])

  const selectServiceProvider = (spRow) => {
	  setCloneServiceProviderId(spRow.serviceProviderId)
	  setSelectSP(false)
  }

    const handleOptions = (cloneOptions) => {
	    setCloneOptions(cloneOptions)
    }

  const cloneEnterpriseModal = (
    <>
      <UiCardModal
        title="Select Service Provider"
        isOpen={selectSP}
        onCancel={() => setSelectSP(false)}
		    onSave={ () => setSelectSP(false)}
      >
       <BulkSelectServiceProviderId
         selectSP={selectServiceProvider}
         {...props}
       />
      </UiCardModal>
    </>
  )

  return (
    <>
		{cloneEnterpriseModal}
		<div style={{marginBottom: '15px'}}>
			Clone Service Provider Id
			<Input readOnly value={cloneServiceProviderId} type="text" placeholder="Clone Service Provider Id" onClick={()=> setSelectSP(true)}/>
        </div>
		<div style={{marginBottom: '15px'}}>
			New Service Provider Id
			<Input value={newServiceProviderId} type="text" placeholder="New Service Provider Id" onChange={(e) => setServiceProviderId(e.target.value)} />
        </div>

		<div style={{marginBottom: '15px'}}>
			New Service Provider Name
			<Input value={newServiceProviderName} type="text" placeholder="New Service Provider Name" onChange={(e) => setServiceProviderName(e.target.value)} />
        </div>

		<BulkCloneOptions handleOptions={handleOptions} {...props}/>

    </>
	)
}

BulkEnterpriseCloneAllControls.propTypes = {
  // initialData: PropTypes.object,
  // handleWizData: PropTypes.func.isRequired,
  // setToNext: PropTypes.func,
  // complete: PropTypes.func,
  setTaskData: PropTypes.func
}
