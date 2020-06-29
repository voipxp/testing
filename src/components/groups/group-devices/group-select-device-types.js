import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { UiLoading, UiDataTable } from '@/components/ui'
import { useAsync } from 'react-async-hook'
import SystemDeviceTypeAPI from '@/api/system/system-device-type-service'

const columns = [
  {
    key: 'deviceType',
    label: 'Device Type'
  }
]

export const GroupSelectDeviceTypes = props => {
  const [loading, setLoading] = useState(true)
  const [deviceTypes, setDeviceTypes] = useState([])

  useAsync(
    () => SystemDeviceTypeAPI.index()
    .then((data) => {
      setDeviceTypes(data)
      setLoading(false)
    })
    ,[]
  )

  if (loading) return <UiLoading />
  return (
    <>
      <UiDataTable
        columns={columns}
        rows={deviceTypes || []}
        rowKey="deviceType"
        pageSize={50}
        onClick={props.selectDevice}
      />
    </>
  )
}

GroupSelectDeviceTypes.propTypes = {
  selectDevice: PropTypes.func
}
