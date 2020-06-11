import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { UiLoading, UiDataTable, UiButton } from '@/components/ui'
import { useAsync } from 'react-async-hook'
import GroupDeviceAPI from '@/api/groups/group-device-service'
import { generatePath } from "react-router";
import { UpdateDevice } from '@/components/groups'
import _ from 'lodash'

export const GroupSelectDevices = (
{
  serviceProviderId,
  groupId,
  history,
  refresh
}
) => {
  const [needEdit, setNeedEdit] = useState(false)
  const [updateDevice, setUpdateDevice] = useState(false)
  const [deviceUpdatedDetails, setDeviceUpdatedDetails] = useState({})

  const editDeviceInfo = (deviceInfo) => {
    setUpdateDevice(true)
    setDeviceUpdatedDetails({...deviceInfo})
  }

  const editButton = (row) => {
    return <UiButton
            icon='edit'
            color='link'
            size='small'
            onClick={() => editDeviceInfo(row)}
            onMouseEnter={() => setNeedEdit(true)}
            onMouseLeave={() => setNeedEdit(false)}
            >
              Edit
            </UiButton>
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
    () => GroupDeviceAPI.index(serviceProviderId, groupId)
    .then( device => {
      const newDevice = device.map(el => {
        return {...el, edit: true}
      })
      return newDevice
    }),
    []
  )

  const devices = result || []

  const redirectToDevice = (device) => {
    if(needEdit) return false
    const path = generatePath("/groups/:serviceProviderId/:groupId/devices/:deviceName", {
      serviceProviderId: serviceProviderId,
      groupId: groupId,
      deviceName: device.deviceName
    });
    history.push(path)
  }

  if (loading) return <UiLoading />

  const updateDeviceModal = (
    <>
    {
      updateDevice
      ?
      <UpdateDevice
        serviceProviderId={serviceProviderId}
        groupId={groupId}
        updateDevice={updateDevice}
        setUpdateDevice={setUpdateDevice}
        deviceName={deviceUpdatedDetails.deviceName}
        reloadData={execute}
      />
      :
      null
    }

    </>
  )

  return (
    <>
      { updateDeviceModal }
      <UiDataTable
        columns={columns}
        rows={devices || []}
        rowKey="deviceName"
        pageSize={25}
        onClick={(device) => redirectToDevice(device)}
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
