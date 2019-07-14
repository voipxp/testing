import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import isEmpty from 'lodash/isEmpty'
import { UiLoading, UiDataTable, UiCheckbox } from '@/components/ui'
import { alertDanger } from '@/utils/alerts'
import { useQuery } from '@apollo/react-hooks'

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
      _id
      serviceProviderId
      serviceProviderName
      isEnterprise
    }
  }
`

export const ServiceProviderSelect = ({ onSelect }) => {
  const { loading, data } = useQuery(query, {
    onCompleted: data => console.log(data),
    onError: alertDanger,
    fetchPolicy: 'cache-and-network'
  })

  return loading && isEmpty(data) ? (
    <UiLoading />
  ) : (
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
