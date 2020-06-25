import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { UiLoading, UiDataTable, UiCardModal } from '@/components/ui'
import { useAsync } from 'react-async-hook'
import GroupDeviceAPI from '@/api/groups/group-device-service'
import { generatePath } from 'react-router'
import { UpdateDevice } from '@/components/groups'
import { DeviceTags } from '@/components/groups/group-device'
import { Navbar } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

export const GroupSelectDevices = ({
  serviceProviderId,
  groupId,
  history,
  refresh
}) => {
  const [needEdit, setNeedEdit] = useState(false)
  const [updateDevice, setUpdateDevice] = useState(false)
  const [deviceUpdatedDetails, setDeviceUpdatedDetails] = useState({})

  const [showTags, setShowTags] = useState(false)

  const editDeviceInfo = deviceInfo => {
    setDeviceUpdatedDetails({ ...deviceInfo })
  }

  const editButton = row => {
    return (
      <Navbar.Item
        style={{width: '30px'}}
        dropdown
        onMouseEnter={() => setNeedEdit(true)}
        onMouseLeave={() => setNeedEdit(false)}
      >
        <Navbar.Link arrowless onClick={() => editDeviceInfo(row)}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </Navbar.Link>
        <Navbar.Dropdown boxed>
          <Navbar.Item onClick={() => setUpdateDevice(true)}>
            Details
          </Navbar.Item>
          <Navbar.Item onClick={() => setShowTags(true)}>Tags</Navbar.Item>
        </Navbar.Dropdown>
      </Navbar.Item>
    )
  }

  const columns = [
    {
      key: 'edit',
      label: 'Action',
      // eslint-disable-next-line react/display-name
      render: row => editButton(row)
    },
    {
      key: 'deviceName',
      label: 'Device Name'
    },
    {
      key: 'deviceType',
      label: 'Type'
    },
    {
      key: 'macAddress',
      label: 'MAC'
    },
    {
      key: 'netAddress',
      label: 'IP Address'
    },
    {
      key: 'status',
      label: 'Status'
    }
  ]

  const { result, loading, execute } = useAsync(
    () =>
      GroupDeviceAPI.index(serviceProviderId, groupId).then(device => {
        const newDevice = device.map(el => {
          return { ...el, edit: true }
        })
        return newDevice
      }),
    [serviceProviderId, groupId]
  )

  const devices = result || []

  const redirectToDevice = device => {
    if (needEdit) return false
    const path = generatePath(
      '/groups/:serviceProviderId/:groupId/groupDevices/:deviceName',
      {
        serviceProviderId: serviceProviderId,
        groupId: groupId,
        deviceName: device.deviceName
      }
    )
    history.push(path)
  }

  if (loading) return <UiLoading />

  const updateDeviceModal = (
    <>
      {updateDevice ? (
        <UpdateDevice
          serviceProviderId={serviceProviderId}
          groupId={groupId}
          updateDevice={updateDevice}
          setUpdateDevice={setUpdateDevice}
          deviceName={deviceUpdatedDetails.deviceName}
          reloadData={execute}
        />
      ) : null}
    </>
  )

  const tagsModal = (
    <UiCardModal
      title="Device Tags"
      isOpen={showTags}
      onCancel={() => setShowTags(false)}
    >
      <DeviceTags
        serviceProviderId={serviceProviderId}
        groupId={groupId}
        deviceName={deviceUpdatedDetails.deviceName}
      />
    </UiCardModal>
  )

  return (
    <>
      {updateDeviceModal}
      {showTags && tagsModal}
      <UiDataTable
        columns={columns}
        rows={devices || []}
        rowKey="deviceName"
        pageSize={25}
        onClick={device => redirectToDevice(device)}
      />
    </>
  )
}

GroupSelectDevices.propTypes = {
  serviceProviderId: PropTypes.string.isRequired,
  groupId: PropTypes.string.isRequired,
  history: PropTypes.object,
  refresh: PropTypes.func
}
