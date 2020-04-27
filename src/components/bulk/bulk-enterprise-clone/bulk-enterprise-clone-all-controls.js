import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { UiCardModal } from '@/components/ui'
import { Input } from 'rbx'
import { BulkSelectServiceProviderId } from '../bulk-select-service-provider-id'
import { BulkCloneOptions } from './bulk-clone-options'

export const BulkEnterpriseCloneAllControls = props => {
  const [selectSP, setSelectSP] = useState(false)
  const [cloneOptions, setCloneOptions] = useState([])
  const [cloneServiceProviderId, setCloneServiceProviderId] = useState('')
  const [newServiceProviderId, setServiceProviderId] = useState('')
  const [newServiceProviderName, setServiceProviderName] = useState('')

  useEffect(() => {
    const tempTask = {
      cloneServiceProviderId: cloneServiceProviderId,
      newServiceProviderId: newServiceProviderId,
      newServiceProviderName: newServiceProviderName,
      cloneOptions: cloneOptions
    }

    props.setTaskData(tempTask)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    cloneServiceProviderId,
    newServiceProviderId,
    newServiceProviderName,
    cloneOptions
  ])

  const selectServiceProvider = spRow => {
    setCloneServiceProviderId(spRow.serviceProviderId)
    setSelectSP(false)
  }

  const handleOptions = cloneOptions => {
    setCloneOptions(cloneOptions)
  }

  const cloneEnterpriseModal = (
    <>
      <UiCardModal
        title="Select Service Provider"
        isOpen={selectSP}
        onCancel={() => setSelectSP(false)}
        onSave={() => setSelectSP(false)}
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
      <div style={{ marginBottom: '15px' }}>
        Clone Service Provider Id
        <Input
          readOnly
          value={cloneServiceProviderId}
          type="text"
          placeholder="Clone Service Provider Id"
          onClick={() => setSelectSP(true)}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        New Service Provider Id
        <Input
          value={newServiceProviderId}
          type="text"
          placeholder="New Service Provider Id"
          onChange={e => setServiceProviderId(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        New Service Provider Name
        <Input
          value={newServiceProviderName}
          type="text"
          placeholder="New Service Provider Name"
          onChange={e => setServiceProviderName(e.target.value)}
        />
      </div>
      <BulkCloneOptions handleOptions={handleOptions} {...props} />
    </>
  )
}

BulkEnterpriseCloneAllControls.propTypes = {
  setTaskData: PropTypes.func
}
