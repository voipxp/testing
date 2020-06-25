import React, { useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Input, Navbar } from 'rbx'
import { useAsync } from 'react-async-hook'
import { useAlerts } from '@/store/alerts'
import GroupDeviceTagsAPI from '@/api/groups/group-device-tag-service'
import GroupDeviceAPI from '@/api/groups/group-device-service'
import {
  UiFormField,
  UiSection,
  UiLoading,
  UiCardModal,
  UiLoadingModal,
  UiDataTable,
  UiButton,
  UiCard
} from '@/components/ui'

export const DeviceTags = ({ serviceProviderId, groupId, deviceName }) => {
  const initialForm = {
    tagName: '',
    tagValue: ''
  }
  const { alertSuccess, alertDanger } = useAlerts()
  const [loadingForm, setLoadingForm] = useState(false)
  const [form, setForm] = useState({ ...initialForm })
  const [needToConfirm, setNeedToConfirm] = useState(false)
  const [showAddTags, setShowAddTags] = useState(false)
  const [showEditTag, setShowEditTag] = useState(false)
  const [deviceOperation, setDeviceOperation] = useState('')

  const columns = [
    {
      key: 'tagName',
      label: 'Tag Name'
    },
    {
      key: 'tagValue',
      label: 'Tag Value'
    }
  ]

  const { result, loading, execute } = useAsync(
    () => GroupDeviceTagsAPI.index(serviceProviderId, groupId, deviceName),
    []
  )

  const tags = result || []
  if (loading) return <UiLoading />

  function handleInput(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setForm({ ...form, [name]: value })
  }

  const onTagSelect = tag => {
    setShowEditTag(true)
    setForm({ ...tag })
  }

  const onClickToAdd = () => {
    setShowAddTags(true)
    setForm({ ...initialForm })
  }
  const addTags = async () => {
    try {
      setLoadingForm(true)
      const tag = { ...form, tagName: `%${form.tagName}%` }
      await GroupDeviceTagsAPI.store(
        serviceProviderId,
        groupId,
        deviceName,
        tag
      )
      alertSuccess('Tag Created')
      execute()
      setShowAddTags(false)
    } catch (error) {
      alertDanger(error)
    } finally {
      setLoadingForm(false)
    }
  }

  const editTag = async () => {
    try {
      setLoadingForm(true)
      const tag = { ...form }
      await GroupDeviceTagsAPI.update(
        serviceProviderId,
        groupId,
        deviceName,
        tag
      )
      alertSuccess('Tag Updated')
      execute()
      setShowEditTag(false)
    } catch (error) {
      alertDanger(error)
    } finally {
      setLoadingForm(false)
    }
  }

  const deleteTags = async () => {
    try {
      setLoadingForm(true)
      await GroupDeviceTagsAPI.destroy(
        serviceProviderId,
        groupId,
        deviceName,
        form.tagName
      )
      alertSuccess('Tag Deleted')
      execute()
      setShowEditTag(false)
    } catch (error) {
      alertDanger(error)
    } finally {
      setNeedToConfirm(false)
      setLoadingForm(false)
    }
  }

  /* Start Reset and Rebuild */
  const rebuidDevice = async () => {
    try {
      setLoadingForm(true)
      await GroupDeviceAPI.rebuild(serviceProviderId, groupId, deviceName)
      alertSuccess('Rebuid command sent to device.')
    } catch (error) {
      alertDanger(error)
    } finally {
      setLoadingForm(false)
      setDeviceOperation('')
    }
  }
  const resetDevice = async () => {
    try {
      setLoadingForm(true)
      await GroupDeviceAPI.reset(serviceProviderId, groupId, deviceName)
      alertSuccess('Reset command sent to device.')
    } catch (error) {
      alertDanger(error)
    } finally {
      setLoadingForm(false)
      setDeviceOperation('')
    }
  }
  const rebuidThenReset = async () => {
    try {
      setLoadingForm(true)
      await GroupDeviceAPI.rebuild(serviceProviderId, groupId, deviceName)
      await GroupDeviceAPI.reset(serviceProviderId, groupId, deviceName)
      alertSuccess('Rebuid And Reset command sent to device.')
    } catch (error) {
      alertDanger(error)
    } finally {
      setLoadingForm(false)
      setDeviceOperation('')
    }
  }

  const processDeviceOperation = () => {
    if (deviceOperation === 'Rebuid') rebuidDevice()
    else if (deviceOperation === 'Reset') resetDevice()
    else if (deviceOperation === 'Rebuid And Reset') rebuidThenReset()
  }

  /* Start Reset and Rebuild operations */

  const deviceOperationsConfModal = (
    <>
      {deviceOperation && (
        <UiCardModal
          title="Please Confirm"
          isOpen={deviceOperation}
          onSave={processDeviceOperation}
          saveText="Yes, I'm sure"
          onCancel={() => setDeviceOperation('')}
        >
          <p>{`Are you sure you want to  ${deviceOperation} this device?`}</p>
        </UiCardModal>
      )}
    </>
  )

  const deleteConfModal = (
    <>
      {needToConfirm && (
        <UiCardModal
          title="Please Confirm"
          isOpen={needToConfirm}
          onDelete={deleteTags}
          onCancel={() => setNeedToConfirm(false)}
        >
          <p>Are you sure you want to remove this tag?</p>
        </UiCardModal>
      )}
    </>
  )

  const tagForm = () => {
    return (
      <UiSection>
        <UiFormField label="Tag Name" horizontal>
          <Input
            readOnly={showEditTag}
            disabled={showEditTag}
            onChange={handleInput}
            type="text"
            name="tagName"
            value={form.tagName}
          />
        </UiFormField>
        <UiFormField label="Tag Value" horizontal>
          <Input
            onChange={handleInput}
            type="text"
            name="tagValue"
            value={form.tagValue}
          />
        </UiFormField>
      </UiSection>
    )
  }

  const addTagsForm = (
    <UiCardModal
      title="Add Tag"
      isOpen={showAddTags}
      onSave={addTags}
      onCancel={() => setShowAddTags(false)}
    >
      {tagForm()}
    </UiCardModal>
  )

  const editTagForm = (
    <UiCardModal
      title="Modify Tag"
      isOpen={showEditTag}
      onDelete={() => setNeedToConfirm(true)}
      onSave={editTag}
      onCancel={() => setShowEditTag(false)}
    >
      {tagForm()}
    </UiCardModal>
  )

  /* Reset and Rebuild nav dropdown */
  const resetRebuid = (
    <Navbar.Item style={{ width: '42px' }} dropdown>
      <Navbar.Link arrowless as="span">
        <UiButton color="link" icon="sync" size="small" />
      </Navbar.Link>
      <Navbar.Dropdown align="right" boxed>
        <Navbar.Item onClick={() => setDeviceOperation('Rebuid')}>
          Rebuid Device
        </Navbar.Item>
        <Navbar.Item onClick={() => setDeviceOperation('Reset')}>
          Reset Device
        </Navbar.Item>
        <Navbar.Divider />
        <Navbar.Item onClick={() => setDeviceOperation('Rebuid And Reset')}>
          Rebuid Then Reset Device
        </Navbar.Item>
      </Navbar.Dropdown>
    </Navbar.Item>
  )

  if (loadingForm) {
    return <UiLoadingModal isOpen={loadingForm} />
  }

  return (
    <>
      <UiCard
        title={`Tags (${deviceName})`}
        buttons={
          <>
            {resetRebuid}
            <UiButton
              color="link"
              icon="add"
              size="small"
              onClick={onClickToAdd}
            />
          </>
        }
      >
        <UiDataTable
          columns={columns}
          rows={tags}
          rowKey="tagName"
          onClick={tag => onTagSelect(tag)}
        />
      </UiCard>
      {showAddTags && addTagsForm}
      {showEditTag && editTagForm}
      {needToConfirm && deleteConfModal}
      {deviceOperationsConfModal}
    </>
  )
}

DeviceTags.propTypes = {
  serviceProviderId: PropTypes.string,
  groupId: PropTypes.string,
  deviceName: PropTypes.any
}
