import React from 'react'
import PropTypes from 'prop-types'
import { UiLoading, UiDataTable } from '@/components/ui'
import serviceProviderApi from '@/api/service-providers'
import { useAsync } from 'react-async-hook'

const columns = [
  {
    key: 'serviceProviderId',
    label: 'serviceProviderId'
  },
  {
    key: 'serviceProviderName',
    label: 'serviceProviderName'
  },
  {
    key: 'resellerId',
    label: 'resellerId'
  }
]

export const BulkSelectServiceProviderId = props => {
  const { result, loading } = useAsync(() => serviceProviderApi.list(), [])
  const providers = result || []

  if (loading) return <UiLoading />
  return (
    <>
      <UiDataTable
        columns={columns}
        rows={providers || []}
        rowKey="serviceProviderId"
        pageSize={25}
        onClick={spRow => {
          props.selectSP(spRow)
        }}
      />
    </>
  )
}

BulkSelectServiceProviderId.propTypes = {
  selectSP: PropTypes.func
}
