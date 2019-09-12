import React from 'react'
import PropTypes from 'prop-types'
import { UiLoading, UiDataTable, UiCheckbox } from '@/components/ui'
import { useAlert, useQuery } from '@apollo/react-hooks'
import { SERVICE_PROVIDER_LIST_QUERY } from '@/graphql'

const columns = [
  { key: 'serviceProviderId', label: 'ID' },
  { key: 'serviceProviderName', label: 'Name' },
  {
    key: 'isEnterprise',
    label: 'Enterprise',
    // eslint-disable-next-line react/display-name
    render: row => <UiCheckbox isChecked={row.isEnterprise} />
  }
]

export const ServiceProviderSelect = ({ onSelect }) => {
  const { loading, data, error } = useQuery(SERVICE_PROVIDER_LIST_QUERY)
  const Alert = useAlert()
  if (error) Alert.danger(error)
  if (loading && !data) return <UiLoading />

  return (
    <UiDataTable
      columns={columns}
      rows={data.serviceProviders}
      rowKey="serviceProviderId"
      onClick={onSelect}
    />
  )
}

ServiceProviderSelect.propTypes = {
  onSelect: PropTypes.func
}
