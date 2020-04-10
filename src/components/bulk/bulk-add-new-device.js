import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Input, Radio, Select} from 'rbx'
import { generatePassword } from '@/utils'
import SystemDeviceTypeAPI from '@/api/system/system-device-type-service'
import { useAsync } from 'react-async-hook'
import GroupPasswordService from '@/api/groups/group-password-service'

import {
  UiFormField,
  UiSection,
  UiInputPassword
} from '@/components/ui'

export const BulkAddNewDevice = (props) => {
const { serviceProviderId, groupId} = {...props}
  const initialForm = {
    "deviceType": '',
    "deviceName": '',
    "deviceLevel": 'group',
    "credentials": '',
    "password": '',
    "userName": '',
    "protocol": '',
    "netAddress": '',
    "port": '',
    "outboundProxyServerNetAddress": '',
    "stunServerNetAddress": '',
    "macAddress": '',
    "serialNumber": '',
    "description": '',
    "physicalLocation": '',
    "transportProtocol": ''
  }
  const [form, setForm] = useState({...initialForm})
  const [passwordRule, setPasswordRule] = useState({})
  const [deviceTypes, setDeviceTypes] = useState([])

    useAsync(
      () => GroupPasswordService.show(serviceProviderId, groupId)
      .then((data) => {
        setPasswordRule(data)
      })
      ,[]
    )

    useAsync(
      () => SystemDeviceTypeAPI.index()
      .then((data) => {
        setDeviceTypes(data)
      })
      ,[]
    )

  useEffect( () => {
	  props.setTaskData(form)
  }, [props, form])

  function handleInput(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    const tempForm = {...form}
    tempForm[name] = value
    setForm({...tempForm})
  }

  return (
    <>
        <UiSection>
          {
          <>
          <UiFormField label="Device Type" horizontal >
            <Select.Container fullwidth>
                <Select
                  value={form.deviceType}
                  onChange={handleInput}
                  name="deviceType"
                >
                <Select.Option
                    value=""
                  >
                    Select Device Type
                  </Select.Option>

                  {
                    deviceTypes && deviceTypes.map( (el) => {
                      return (
                          <Select.Option
                            key={el.deviceType}
                            value={el.deviceType}
                          >
                            {el.deviceType}
                          </Select.Option>
                      )
                    })
                  }
                </Select>
              </Select.Container>
            </UiFormField>
            <UiFormField label="Device Name" horizontal >
              <Input
                type="text"
                onChange={handleInput}
                name="deviceName"
                value={form.deviceName}
              />
            </UiFormField>
          </>
          }

          <UiFormField label="Credentials" horizontal>
          <Radio
            type="radio"
            value=''
            name ="credentials"
            checked={form.credentials === ''}
            onChange={handleInput}
          />Use Identity/Device Profile Type Credentials<br/>

          <Radio
            type="radio"
            value="custom"
            name ="credentials"
            checked={form.credentials === "custom"}
            onChange={handleInput}
          />Use Custom Credentials
        </UiFormField>

          {/* show if authentication is not set or value true */}
          { (form.credentials && form.credentials === 'custom') ? (
            <>
              <UiFormField label="User Name" horizontal>
                <Input
                  type="text"
                  name="userName"
                  value={form.userName}
                  onChange={handleInput}
                />
              </UiFormField>
              <UiFormField label="Password" horizontal>
                <UiInputPassword
                  name="password"
                  value={form.password}
                  onChange={handleInput}
                  onGeneratePassword={() => generatePassword(passwordRule) }
                />
              </UiFormField>
            </> ):  null
        }

        <UiFormField label="Optional">
        <br></br>
            <UiFormField label="Protocol" horizontal>
              <Input
                type="text"
                name="protocol"
                value={form.protocol}
                onChange={handleInput}
              />
            </UiFormField>
            <UiFormField label="Host Name/IP Address" horizontal>
            <Input
              type="text"
              name="netAddress"
              value={form.netAddress}
              onChange={handleInput}
            />
          </UiFormField>
          <UiFormField label="Port" horizontal>
            <Input
              type="text"
              name="port"
              value={form.port}
              onChange={handleInput}
            />
          </UiFormField>

          <UiFormField label="Transport" horizontal>
            <Select.Container fullwidth>
              <Select
                value={form.transportProtocol}
                onChange={handleInput}
                name="transportProtocol"
              >
                <Select.Option
                  key= "UDP"
                  value= "UDP"
                >
                  UDP
                </Select.Option>
                <Select.Option
                  key= "TCP"
                  value= "TCP"
                >
                  TCP
                </Select.Option>
                <Select.Option
                  key= "Unspecified"
                  value= "Unspecified"
                >
                  Unspecified
                </Select.Option>
              </Select>
            </Select.Container>
          </UiFormField>

          <UiFormField label="MAC Address" horizontal>
            <Input
              type="text"
              name="macAddress"
              value={form.macAddress}
              onChange={handleInput}
            />
          </UiFormField>
          <UiFormField label="Serial Number" horizontal>
            <Input
              type="text"
              name="serialNumber"
              value={form.serialNumber}
              onChange={handleInput}
            />
          </UiFormField>
          <UiFormField label="Description" horizontal>
            <Input
              type="text"
              name="description"
              value={form.description}
              onChange={handleInput}
            />
          </UiFormField>
          <UiFormField label="Outbound Proxy Server" horizontal>
            <Input
              type="text"
              name="outboundProxyServerNetAddress"
              value={form.outboundProxyServerNetAddress}
              onChange={handleInput}
            />
          </UiFormField>
          <UiFormField label="STUN Server" horizontal>
            <Input
              type="text"
              name="stunServerNetAddress"
              value={form.stunServerNetAddress}
              onChange={handleInput}
            />
          </UiFormField>
          <UiFormField label="Physical Location" horizontal>
            <Input
              type="text"
              name="physicalLocation"
              value={form.physicalLocation}
              onChange={handleInput}
            />
          </UiFormField>
         </UiFormField>

        </UiSection>

    </>
  )
}

BulkAddNewDevice.propTypes = {
  setTaskData: PropTypes.func
}
