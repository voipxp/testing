import React from 'react'
import PropTypes from 'prop-types'
import { UiLoading, UiDataTable } from '@/components/ui'
import trunkGroupApi from '@/api/group-services/group-trunk-group-service'
import { useAsync } from 'react-async-hook'

const columns = [
  {
    key: 'name',
    label: 'Name'
  },
  {
    key: 'deviceName',
    label: 'Device Name'
  },
  {
    key: 'deviceLevel',
    label: 'Device Level'
  }
]

export const BulkSelectGroupTrunk = props => {
  const { serviceProviderId, groupId } = props.initialData
  const { result, loading } = useAsync(
    () => trunkGroupApi.list(serviceProviderId, groupId),
    []
  )
  const groupTrunks = result || []

  if (loading) return <UiLoading />
  return (
    <>
      <UiDataTable
        columns={columns}
        rows={groupTrunks || []}
        rowKey="name"
        pageSize={25}
        onClick={props.selectGroupTrunk}
      />
    </>
  )
}

BulkSelectGroupTrunk.propTypes = {
  initialData: PropTypes.object,
  setToNext: PropTypes.func,
  selectGroupTrunk: PropTypes.func
}
