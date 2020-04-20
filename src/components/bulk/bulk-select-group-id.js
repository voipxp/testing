import React from 'react'
import PropTypes from 'prop-types'
import { UiLoading, UiDataTable } from '@/components/ui'
import groupApi from '@/api/groups'
import { useAsync } from 'react-async-hook'

const columns = [
  {
    key: 'groupId',
    label: 'Group Id'
  },
  {
    key: 'groupName',
    label: 'Group Name'
  },
  {
    key: 'userLimit',
    label: 'User Limit'
  },
  {
    key: 'serviceProviderId',
    label: 'Service Provider'
  }
]

export const BulkSelectGroupId = ({ serviceProviderId = '', selectGroup }) => {
  const { result, loading } = useAsync(
    () => groupApi.search({ serviceProviderId: serviceProviderId }),
    []
  )
  const groups = result || []

  if (loading) return <UiLoading />
  return (
    <>
      <UiDataTable
        columns={columns}
        rows={groups || []}
        rowKey="groupId"
        pageSize={50}
        onClick={grpRow => {
          selectGroup(grpRow)
        }}
      />
    </>
  )
}

BulkSelectGroupId.propTypes = {
  serviceProviderId: PropTypes.string,
  selectGroup: PropTypes.func
}
