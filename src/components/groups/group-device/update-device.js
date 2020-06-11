import React, { useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Input, Radio, Select} from 'rbx'
import { generatePassword } from '@/utils'
import { useAsync } from 'react-async-hook'
import { useAlerts } from '@/store/alerts'
import GroupPasswordService from '@/api/groups/group-password-service'
import GroupDeviceAPI from '@/api/groups/group-device-service'
import {
  UiFormField,
  UiSection,
  UiInputPassword,
  UiLoading,
  UiCardModal
} from '@/components/ui'

export const UpdateDevice = ({
  serviceProviderId,
  groupId,
  deviceName,
  updateDevice,
  setUpdateDevice,
  reloadData
}) => {
  const { alertSuccess, alertDanger } = useAlerts()
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({})
  const [passwordRule, setPasswordRule] = useState({})
  const [needToConfirm, setNeedToConfirm] = useState(false)
  const canSetUpdateDevice = _.isFunction(setUpdateDevice)
  const canReloadData = _.isFunction(reloadData)

  useAsync(
    () => GroupDeviceAPI.show(serviceProviderId, groupId, deviceName)
    .then((data) => {
      setLoading(false)
      setForm(data)
    })
    ,[]
  )

  useAsync(
    () => GroupPasswordService.show(serviceProviderId, groupId)
    .then((data) => {
      setPasswordRule(data)
    })
    ,[]
  )

  function handleInput(event) {

    const target = event.target
    let value = target.type === 'checkbox' ? target.checked : target.value
    if(value === 'true') value = true
    else if(value === 'false') value = false
    const name = target.name
    const tempForm = {...form}

    if(name === 'userName') tempForm['accessDeviceCredentials']['userName'] = value
    if(name === 'password') tempForm['accessDeviceCredentials']['password'] = value
    //if(name === 'port') tempForm['numberOfPorts']['quantity'] = value
    else tempForm[name] = value
    setForm({...tempForm})
  }

  const editDevice = async () => {
    try {
      setLoading(true)
      const device = form
      await GroupDeviceAPI.update(serviceProviderId, groupId, device)
      alertSuccess('Device Updated')
      if(canReloadData) reloadData()
      setUpdateDevice(false)
      setLoading(false)
    } catch (error) {
      alertDanger(error)
      setLoading(false)
    }
  }

  const deleteDevice = async () => {
    try {
      setLoading(true)
      await GroupDeviceAPI.destroy(serviceProviderId, groupId, deviceName)
      alertSuccess('Device Deleted')
      setUpdateDevice(false)
      setLoading(false)
      if(canReloadData) reloadData()
    } catch (error) {
      alertDanger(error)
      setLoading(false)
    }
  }

  const deleteConfModal = (
    <>
    {
      needToConfirm
      ?
      <UiCardModal
        title="Please Confirm"
        isOpen={needToConfirm}
        onDelete={deleteDevice}
        onCancel={() => setNeedToConfirm(false)}
      >
        <p>Are you sure you want to Delete this device?</p>
      </UiCardModal>
      :
      null
    }
    </>
  )

  const deviceUpdateUIForm = (
    <UiSection>
          {
          <>
          <UiFormField label="Device Type" horizontal >
            <Input
                disabled
                readOnly
                type="text"
                name="deviceType"
                value={form.deviceType}
              />
            </UiFormField>
            <UiFormField label="Device Name" horizontal >
              <Input
                disabled
                readOnly
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
                  value={form.accessDeviceCredentials.userName}
                  onChange={handleInput}
                />
              </UiFormField>
              <UiFormField label="Password" horizontal>
                <UiInputPassword
                  name="password"
                  value={form.accessDeviceCredentials.password}
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
  )

  const updateDeviceModal = (
    <>
    {
      updateDevice
      ?
      <UiCardModal
        title={"Edit Device : " + deviceName}
        isOpen={updateDevice}
        onDelete={() => setNeedToConfirm(true)}
        onCancel={() => canSetUpdateDevice && setUpdateDevice(false)}
        onSave={editDevice}
      >
        { loading ? <UiLoading />:  deviceUpdateUIForm }
      </UiCardModal>
      :
      null
    }
    </>
  )

  if(loading) {
    return (
      <UiCardModal
        isOpen={loading}
        onCancel={() => setUpdateDevice(false)}
      >
        <UiLoading />
      </UiCardModal>
    )
  }

  return (
    <>
    { updateDeviceModal }
    { deleteConfModal }
    </>
  )
}

UpdateDevice.propTypes = {
  serviceProviderId: PropTypes.string,
  groupId: PropTypes.string,
  deviceName: PropTypes.string,
  updateDevice: PropTypes.bool,
  setUpdateDevice: PropTypes.func,
  reloadData: PropTypes.func
}
