import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { UiCard, UiLoading, UiDataTable } from '@/components/ui'
import serviceProviderApi from '@/api/service-providers'
import { useAsync } from 'react-async-hook'
import { Button } from 'rbx'

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

export const BulkSelectServiceProviderId = (props) => {

  const {result, error, loading, execute} = useAsync(
    () => serviceProviderApi.list(),[]
  )
  const providers = result || []

  if(loading) return <UiLoading />
  return (
    <>
      <UiDataTable
          columns={columns}
          rows={providers || []}
          rowKey="serviceProviderId"
          pageSize={50}
          onClick={(spRow) => {props.selectSP(spRow)}}
      />
    </>
	)
}

BulkSelectServiceProviderId.propTypes = {
  selectSP: PropTypes.func
}
