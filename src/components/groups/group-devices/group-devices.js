import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { UiCard, UiCardModal, UiButton, UiLoading } from '@/components/ui'
import {
  GroupSelectDevices,
  AddNewDevice
} from '@/components/groups'
import { useAlerts } from '@/store/alerts'
import { AppBreadcrumb } from '@/components/app'
import { Breadcrumb } from 'rbx'

export const GroupDevices = ({ match, history }) => {
const { alertSuccess, alertDanger } = useAlerts()
const { serviceProviderId, groupId } = match.params
const [newDeviceClicked, setNewDeviceClicked] = useState(false)
const [device, setDevice] = useState({})
const [loading, setLoading] = useState(false)

const addDevice = async () => {
  const newDeviceDetail = device.deviceData
  try {
    if(!device.validation(newDeviceDetail)) return false
    setLoading(true)
    await device.action.store(serviceProviderId, groupId, newDeviceDetail)
    setLoading(false)
    alertSuccess('Device Created')
    setNewDeviceClicked(false)
  } catch (error) {
    alertDanger(error)
  }
}

const addNewDeviceModal = (
  <>
    <UiCardModal
      title="New Device"
      isOpen={newDeviceClicked}
      onCancel={() => setNewDeviceClicked(false)}
      onSave={addDevice}
    >
    <AddNewDevice
      serviceProviderId={serviceProviderId}
      groupId={groupId}
      setDevice={setDevice}
    />
    </UiCardModal>
  </>
)

if(loading) {
  return (
    <UiCardModal
      title=""
      isOpen={loading}
      onCancel={() => setLoading(false)}
    >
      <UiLoading />
    </UiCardModal>
  )
}

  return (
    <>
    { newDeviceClicked ? addNewDeviceModal : null}
    <AppBreadcrumb>
        <Breadcrumb.Item>Devices</Breadcrumb.Item>
      </AppBreadcrumb>
    <UiCard
        title="Devices"
        buttons={
          <>
            <UiButton
              color="link"
              icon="add"
              size="small"
              onClick={() => setNewDeviceClicked(true)}
            />
          </>
        }
      >
      <GroupSelectDevices
        serviceProviderId={serviceProviderId}
        groupId={groupId}
        history={history}
      />
      </UiCard>
    </>
  )
}

GroupDevices.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object.isRequired
}
