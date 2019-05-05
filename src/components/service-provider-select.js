import React from 'react'
import PropTypes from 'prop-types'
import { useReduxDispatch, useReduxState } from 'reactive-react-redux'
import { UiLoading, UiDataTable } from '@/components/ui'
import { loadServiceProviders } from '@/store/service-providers'

const columns = [
  { key: 'serviceProviderId', label: 'ID' },
  { key: 'serviceProviderName', label: 'Name' },
  { key: 'isEnterprise', label: 'Enterprise' }
]

export const ServiceProviderSelect = ({ onSelect }) => {
  const state = useReduxState()
  const dispatch = useReduxDispatch()

  const { serviceProviders } = state

  React.useEffect(() => {
    dispatch(loadServiceProviders())
  }, [dispatch])

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
