import React from 'react'
import PropTypes from 'prop-types'
import { UiLoading, UiDataTable, UiCheckbox } from '@/components/ui'
import { Alert } from '@/utils/alerts'
import { useQuery } from '@apollo/react-hooks'
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

  if (error) Alert.danger(error)
  if (loading) return <UiLoading />

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
