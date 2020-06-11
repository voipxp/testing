import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Input, Radio, Select} from 'rbx'
import { generatePassword } from '@/utils'
import { useAsync } from 'react-async-hook'
import GroupPasswordService from '@/api/groups/group-password-service'
import GroupDeviceAPI from '@/api/groups/group-device-service'
import { GroupSelectDeviceTypes } from '@/components/groups'
import { useAlerts } from '@/store/alerts'
import {
  UiFormField,
  UiSection,
  UiInputPassword,
  UiCardModal
} from '@/components/ui'

export const AddNewDevice = ({
  serviceProviderId,
  groupId,
  setDevice
}) => {
  const initialForm = {
    "deviceType": '',
    "deviceName": '',
    "deviceLevel": 'Group',
    "useCustomUserNamePassword": false,
    "password": '',
    "accessDeviceCredentials": {
      "userName": '',
      "protocol": ''
    },
    "netAddress": '',
    "port": '',
    "outboundProxyServerNetAddress": '',
    "stunServerNetAddress": '',
    "macAddress": '',
    "serialNumber": '',
    "description": '',
    "physicalLocation": '',
    "transportProtocol": 'UDP'
  }

  const [form, setForm] = useState({...initialForm})
  const [passwordRule, setPasswordRule] = useState({})
  const [action, setAction] = useState()
  const [clickedDeviceType, setClickedDeviceType] = useState(false)
  const canSetDevice = _.isFunction(setDevice)
  const { alertDanger } = useAlerts()

  useAsync(
    () => GroupPasswordService.show(serviceProviderId, groupId)
    .then((data) => {
      setPasswordRule(data)
    })
    ,[]
  )

  useEffect(() => {
    if(groupId) {
      setAction(GroupDeviceAPI)
      setForm({...form, groupId: groupId, serviceProviderId: serviceProviderId})
    }
    else if(serviceProviderId) {
      setAction()
      setForm({...form, serviceProviderId: serviceProviderId})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(canSetDevice) setDevice({deviceData: form, action: action, validation: validation})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, action])

  const validation = (deviceData) => {
    if(!deviceData.deviceType) {
      alertDanger('Device Type is required field')
      return false
    }
    else if(!deviceData.deviceName) {
      alertDanger('Device Name is required field')
      return false
    }
    else if(deviceData.useCustomUserNamePassword && !deviceData.accessDeviceCredentials.userName) {
      alertDanger('Device Profile Username is required field')
      return false
    }
    return true
  }

  function handleInput(event) {
    const target = event.target
    let value = target.type === 'checkbox' ? target.checked : target.value
    if(value === 'true') value = true
    else if(value === 'false') value = false
    const name = target.name
    const tempForm = {...form}

    if(name === 'userName') tempForm['accessDeviceCredentials']['userName'] = value
    if(name === 'password') tempForm['accessDeviceCredentials']['password'] = value
    else tempForm[name] = value
    setForm({...tempForm})
  }

  const selectDevice = (device) => {
    if (device.protocolChoice) {
      device.protocol = device.protocolChoice[0]
    }
    const tempDevice = {...form, ...device}
    setForm({...tempDevice})
    setClickedDeviceType(false)
  }

  const selectDeviceTypeModal = (
    <>
    {
      clickedDeviceType
      ?
      <UiCardModal
        title="New Device"
        isOpen={clickedDeviceType}
        onCancel={() => setClickedDeviceType(false)}
      >
        <GroupSelectDeviceTypes
          selectDevice={selectDevice}
        />
      </UiCardModal>
      :
      null
    }
    </>
  )

  return (
    <>
        { selectDeviceTypeModal }
        <UiSection>
          {
          <>
          <UiFormField label="Device Type" horizontal >
            <Input
                readOnly
                type="text"
                onClick={() => setClickedDeviceType(true)}
                name="deviceType"
                value={form.deviceType}
              />
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
            value={false}
            name ="useCustomUserNamePassword"
            checked={form.useCustomUserNamePassword === false}
            onChange={handleInput}
          />Use Identity/Device Profile Type Credentials<br/>

          <Radio
            type="radio"
            value={true}
            name ="useCustomUserNamePassword"
            checked={form.useCustomUserNamePassword === true}
            onChange={handleInput}
          />Use Custom Credentials
        </UiFormField>

          {/* show if authentication is not set or value true */}
          { form.useCustomUserNamePassword ? (
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

AddNewDevice.propTypes = {
  serviceProviderId: PropTypes.string,
  groupId: PropTypes.string,
  setDevice: PropTypes.func
}
