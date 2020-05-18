import React from 'react'
import PropTypes from 'prop-types'
import { UiLoading, UiDataTable } from '@/components/ui'
import { useAsync } from 'react-async-hook'
import trunkSPApi from '@/api/service-providers-services/service-provider-enterprise-trunks-service'
const columns = [
  {
    key: 'routingType',
    label: 'Routing Type'
  },
  {
    key: 'serviceProviderId',
    label: 'Service ProviderId'
  },
  {
    key: 'enterpriseTrunkName',
    label: 'Enterprise Trunk Name'
  }
]

export const BulkSelectServiceProviderTrunk = ({
  serviceProviderId = '',
  selectEntTrunk
}) => {
  // const { serviceProviderId } = props
  // const [isNextBtnDisabled, setDisableNextButton] = React.useState(false)

  const { result, loading } = useAsync(
    () => trunkSPApi.list(serviceProviderId),
    []
  )
  const providers = result || []

  if (loading) return <UiLoading />
  return (
    <>
      <UiDataTable
        columns={columns}
        rows={providers || []}
        rowKey="serviceProviderId"
        pageSize={50}
        onClick={selectEntTrunk}
      />
    </>
  )
}

BulkSelectServiceProviderTrunk.propTypes = {
  serviceProviderId: PropTypes.string.isRequired,
  // initialData: PropTypes.object,
  // handleWizData: PropTypes.func.isRequired,
  // setToNext: PropTypes.func,
  selectEntTrunk: PropTypes.func
}
