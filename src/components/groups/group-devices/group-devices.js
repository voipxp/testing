import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { UiCard, UiCardModal, UiButton, UiLoadingModal } from '@/components/ui'
import {
  GroupSelectDevices,
  AddNewDevice
} from '@/components/groups'
import { useAlerts } from '@/store/alerts'

export const GroupDevices = ({ match, history }) => {
const { alertSuccess, alertDanger } = useAlerts()
const { serviceProviderId, groupId } = match.params
const [newDeviceClicked, setNewDeviceClicked] = useState(false)
const [device, setDevice] = useState({})
const [loading, setLoading] = useState(false)
const [downloadCsvRef, setDownloadCsvRef] = useState(React.useRef())

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
    setLoading(false)
  }
}

const setDeviceInfo = useCallback(deviceInfo => {
  setDevice(deviceInfo)
}, [])

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
      setDevice={setDeviceInfo}
    />
    </UiCardModal>
  </>
)

if(loading) {
  return <UiLoadingModal isOpen={loading} />
}

  return (
    <>
    { newDeviceClicked ? addNewDeviceModal : null}
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
            <UiButton
              color="link"
              icon="download"
              size="small"
              onClick={() => downloadCsvRef.current.link.click()}
            />
          </>
        }
      >
      <GroupSelectDevices
        serviceProviderId={serviceProviderId}
        groupId={groupId}
        history={history}
        setDownloadCsvRef={setDownloadCsvRef}
      />
      </UiCard>
    </>
  )
}

GroupDevices.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object.isRequired
}
