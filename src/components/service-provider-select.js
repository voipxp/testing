import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useReduxDispatch, useReduxState } from 'reactive-react-redux'
import { UiSpinner, UiDataTable } from '@/components/ui'
import { loadServiceProviders } from '@/store/service-providers'

const columns = [
  { key: 'serviceProviderId', label: 'ID' },
  { key: 'serviceProviderName', label: 'Name' },
  { key: 'isEnterprise', label: 'Enterprise' }
]

const ServiceProviderSelect = ({ onSelect }) => {
  const state = useReduxState()
  const dispatch = useReduxDispatch()

  const { serviceProviders } = state

  useEffect(() => {
    const fetchData = async () => dispatch(loadServiceProviders())
    fetchData()
  }, [dispatch])

  return serviceProviders.length === 0 ? (
    <UiSpinner />
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
export default ServiceProviderSelect
