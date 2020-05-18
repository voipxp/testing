import React from 'react'
import PropTypes from 'prop-types'
import { UiLoading, UiDataTable } from '@/components/ui'
import { useAsync } from 'react-async-hook'
import GroupDeviceAPI from '@/api/groups/group-device-service'

const columns = [
  {
    key: 'deviceName',
    label: 'Device Name'
  },
  {
    key: 'deviceLevel',
    label: 'Device Level'
  }
]

export const BulkSelectDevices = props => {
  const { serviceProviderId, groupId } = props.initialData

  const { result, loading } = useAsync(
    () => GroupDeviceAPI.index(serviceProviderId, groupId, 'available'),
    []
  )
  const devices = result || []

  if (loading) return <UiLoading />
  return (
    <>
      <UiDataTable
        columns={columns}
        rows={devices || []}
        rowKey="deviceName"
        pageSize={50}
        onClick={props.selectGroupTrunk}
      />
    </>
  )
}

BulkSelectDevices.propTypes = {
  initialData: PropTypes.object,
  setToNext: PropTypes.func,
  selectGroupTrunk: PropTypes.func
}
