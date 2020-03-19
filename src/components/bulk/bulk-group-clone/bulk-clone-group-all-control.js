import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'rbx'
// import { useAlerts } from '@/store/alerts'
import { BulkSelectServiceProviderId } from '../bulk-select-service-provider-id'
import { BulkSelectGroupId } from '../bulk-select-group-id'

import {
  UiInputCheckbox,
  UiFormField,
  UiSection,
  UiCardModal
} from '@/components/ui'

const cloneGroupOptions = [
  {
    name: 'featureAccessCode',
    label: 'Feature Access Code',
  },
  {
    name: 'callProcessingPolicy',
    label: 'Call Processing Policy',
  },
  {
    name: 'networkClassOfService',
    label: 'Network Class Of Service',
  },
  {
    name: 'extensionLength',
    label: 'Extension Length',
  },
  {
    name: 'services',
    label: 'Services',
  },
  {
    name: 'policy',
    label: 'Group Policy',
  },
  {
    name: 'schedule',
    label: 'Schedule',
  },
  {
    name: 'outgoingCallingPlan',
    label: 'Outgoing Calling Plan',
  },
  {
    name: 'routingProfile',
    label: 'Routing Profile',
  }
]

export const BulkCloneGroupAllControl = ({
  setTaskData
}) => {
  const initialForm =
  {
    "sourceServiceProviderId": "",
    "sourceGroupId": "",
    "destinationServiceProviderId": "",
    "destinationGroupId": "",
    "destinationGroupName": "",

    "cloneOptions": {
      "featureAccessCode": true,
      "callProcessingPolicy": true,
      "networkClassOfService": false,
      "extensionLength": true,
      "services": true,
      "policy": true,
      "schedule": true,
      "outgoingCallingPlan": true,
      "routingProfile": false
    }
}

  const [form, setForm] = useState({...initialForm})
  const [selectSP, setSelectSP] = React.useState(false)
  const [selectGroupId, setSelectGroupId] = React.useState(false)

  // const [cloneServiceProviderId, setCloneServiceProviderId] = React.useState('')
  // const [cloneServiceGroupId, setCloneGroupId] = React.useState('')
  /* set intialForm api response */
    // const { userId } = match.params



  // clone group options

  const selectServiceProvider = (spRow) => {
    const spId = spRow.serviceProviderId
    setForm({ ...form, 'sourceServiceProviderId': spId })
	  // setCloneServiceProviderId(spRow.serviceProviderId)
	  setSelectSP(false)
  }

  useEffect( () => {
	  setTaskData(form)
  }, [setTaskData, form])

  const selectGroupHandler = (grpRow) => {
    const grpId = grpRow.groupId
    setForm({ ...form, 'sourceGroupId': grpId })
	  setSelectGroupId(false)
  }

  const cloneEnterpriseModal = (
    <>
      <UiCardModal
        title="Select Service Provider"
        isOpen={selectSP}
        onCancel={() => setSelectSP(false)}
      >
       <BulkSelectServiceProviderId
         selectSP={selectServiceProvider}
       />
      </UiCardModal>
    </>
  )

  const cloneGroupModal = (
    <>
      <UiCardModal
        title="Select Group"
        isOpen={selectGroupId}
        onCancel={() => setSelectGroupId(false)}
      >
       <BulkSelectGroupId
         selectGroup={selectGroupHandler}
         serviceProviderId={form.sourceServiceProviderId}
       />
      </UiCardModal>
    </>
  )

  const handleInput = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setForm({ ...form, [name]: value })
  }

  const handleCheckBox = (event) => {
    const target = event.target
    const value = target.checked
    const name = target.name
    // const newform = {...form}
    // const newCloneOptions = form.cloneOptions
    form.cloneOptions = { ...form.cloneOptions, [name]: value }
    setForm({ ...form })
  }

  return (
    <>
      { cloneEnterpriseModal }
      { (form.sourceServiceProviderId) ? cloneGroupModal : null }
        <UiSection>
        <UiFormField label="Clone Service Provider *" horizontal >
            <Input
              type="text"
              readOnly
              placeholder="Clone Service Provider "
              onClick={()=> setSelectSP(true)}
              name="sourceServiceProviderId"
              value={form.sourceServiceProviderId}
            />
          </UiFormField>

          <UiFormField label="Clone Group *" horizontal >
            <Input
              type="text"
              readOnly
              placeholder="Clone Group "
              onClick={()=> setSelectGroupId(true)}
              name="sourceGroupId"
              value={form.sourceGroupId}
            />
          </UiFormField>

          <UiFormField label="New Group Id * " horizontal>
            <Input
              type="text"
              placeholder="New Group Id"
              onChange={handleInput}
              name="destinationGroupId"
              value={form.destinationGroupId}
            />
          </UiFormField>
          <UiFormField label="New Group Name *" horizontal >
            <Input
              type="text"
              placeholder="New Group Name"
              onChange={handleInput}
              name="destinationGroupName"
              value={form.destinationGroupName}
            />
          </UiFormField>

          <UiFormField label="Clone Options">
            {
              cloneGroupOptions.map(el => {
                return (
                  <UiInputCheckbox
                    key={el.name}
                    name={el.name}
                    label={el.label}
                    checked={form["cloneOptions"][el.name]}
                    onChange={handleCheckBox}
                  />
                )
              })
            }
          </UiFormField>

        </UiSection>

    </>
  )
}

BulkCloneGroupAllControl.propTypes = {
  setTaskData: PropTypes.func
}
