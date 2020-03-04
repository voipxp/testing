import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'rbx'
// import { useAlerts } from '@/store/alerts'
// import { BulkSelectServiceProviderId } from '../bulk-select-service-provider-id'
// import { BulkSelectGroupId } from '../bulk-select-group-id'
import { generatePassword } from '@/utils'
import {
  UiInputCheckbox,
  UiFormField,
  UiSection,
  UiCardModal,
  UiInputPassword
} from '@/components/ui'


export const BulkCreateUser = (props) => {
  const initialForm =
  {
    numberofUsers: '',
    userId: '',
    lastName: '',
    firstName: '',
    callingLineIdLastName: '',
    callingLineIdFirstName: '',
    password: '',
    // phoneNumber: '',
    activatePhoneNumber: 'true',
    extension: '',
    callingLineIdPhoneNumber: '',
    timeZone: '',
    language: '',
    networkClassOfService: '',
    mobilePhoneNumber: '',
    pagerPhoneNumber: '',
    emailAddress: '',
    addressLocation: '',
    department: '',
    address: '',
    domain: '',
    endpointType: 'trunkAddressing',
    trunkAddressing: {
      enterpriseTrunkName: '',
      trunkGroupDeviceEndpoint: {
        name: '',
        linePort: ''
      }
    },
    allowAccessDeviceUpdate: 'false'
  }

  const [form, setForm] = useState({...initialForm})
  const [selectSP, setSelectSP] = React.useState(false)
  const [selectGroupId, setSelectGroupId] = React.useState(false)


  useEffect( () => {
	  props.setTaskData(form)
  }, [props, form])


  const handleInput = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setForm({ ...form, [name]: value })
  }

console.log('SSSSSSSSSSSSSSSSSSSS')
console.log(form)


  return (
    <>
        <UiSection>
          <UiFormField label="Number of Users (max: 1) * " horizontal>
            <Input
              type="text"
              placeholder="New Group Id"
              onChange={handleInput}
              name="numberofUsers"
              value={form.numberofUsers}
            />
          </UiFormField>
          <UiFormField label="User ID *" horizontal >
            <Input
              type="text"
              placeholder="User ID"
              onChange={handleInput}
              name="userId"
              value={form.userId}
            />
          </UiFormField>
          <UiFormField label="First Name *" horizontal >
            <Input
              type="text"
              onChange={handleInput}
              name="firstName"
              value={form.firstName}
            />
          </UiFormField>

          <UiFormField label="Last Name *" horizontal >
            <Input
              type="text"
              onChange={handleInput}
              name="lastName"
              value={form.lastName}
            />
          </UiFormField>

          <UiFormField label="CLID First Name *" horizontal >
            <Input
              type="text"
              onChange={handleInput}
              name="callingLineIdFirstName"
              value={form.callingLineIdFirstName}
            />
          </UiFormField>

          <UiFormField label="CLID Last Name *" horizontal >
            <Input
              type="text"
              onChange={handleInput}
              name="callingLineIdLastName"
              value={form.callingLineIdLastName}
            />
          </UiFormField>

          <UiFormField label="Password" horizontal>
            <UiInputPassword
              name="password"
              value={form.password}
              onChange={handleInput}
              onGeneratePassword={generatePassword}
            />
          </UiFormField>
        </UiSection>

    </>
  )
}

BulkCreateUser.propTypes = {
  setTaskData: PropTypes.func
}
