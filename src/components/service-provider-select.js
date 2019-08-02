import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import isEmpty from 'lodash/isEmpty'
import { UiLoading, UiDataTable, UiCheckbox } from '@/components/ui'
import { alertDanger } from '@/utils/alerts'
import { useQuery } from '@apollo/react-hooks'
import { SERVICE_PROVIDER_LIST_FRAGMENT } from '@/graphql'

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

const query = gql`
  query serviceProviders {
    serviceProviders {
      ...ServiceProviderListFragment
    }
    ${SERVICE_PROVIDER_LIST_FRAGMENT}
  }
`

export const ServiceProviderSelect = ({ onSelect }) => {
  const { loading, data, error } = useQuery(query, {
    fetchPolicy: 'cache-and-network'
  })

  if (error) alertDanger(error)
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
