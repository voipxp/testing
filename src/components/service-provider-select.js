import React from 'react'
import PropTypes from 'prop-types'
import { UiLoading, UiDataTable } from '@/components/ui'
import { useServiceProviders } from '@/store/service-providers'

const columns = [
  { key: 'serviceProviderId', label: 'ID' },
  { key: 'serviceProviderName', label: 'Name' },
  { key: 'isEnterprise', label: 'Enterprise' }
]

export const ServiceProviderSelect = ({ onSelect }) => {
  const { serviceProviders, loadServiceProviders } = useServiceProviders()

  React.useEffect(() => {
    loadServiceProviders()
  }, [loadServiceProviders])

  return serviceProviders.length === 0 ? (
    <UiLoading />
  ) : (
    <UiDataTable
      columns={columns}
      rows={serviceProviders}
      rowKey="serviceProviderId"
      onClick={onSelect}
    />
  )
}

ServiceProviderSelect.propTypes = {
  onSelect: PropTypes.func
}
