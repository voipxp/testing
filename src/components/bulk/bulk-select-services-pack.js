import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { UiLoading, UiDataTable, UiCheckbox } from '@/components/ui'
import groupServicesApi from '@/api/group-services'
import { useAsync } from 'react-async-hook'


export const BulkSelectServicesPack = ({
  serviceProviderId,
  groupId,
  selecServicePack
}) => {
  const [selectedServicePacks, setSelectedServicePacks] = useState([])
  const {result, error, loading, execute} = useAsync(
    () => groupServicesApi.show(groupId, serviceProviderId)
    .then((result) => {
      return result.servicePackServices.filter(el => {
        return el.authorized === true
      })
    })
    ,[]
  )
  const userServices = result && result || []

  const userServiceSelection = (row) => {
    const services = [...selectedServicePacks]
    if( _.includes(services, row.serviceName) ) _.pull(services, row.serviceName)
    else services.push(row.serviceName)
    setSelectedServicePacks([..._.uniq(services)])
  }

  useEffect( () => {
    selecServicePack(selectedServicePacks)
  }, [selecServicePack, selectedServicePacks])

  const columns = [
    {
      key: 'serviceName',
      label: 'Service Name'
    },
    {
      key: 'assigned',
      label: 'Selected',
    // eslint-disable-next-line react/display-name
      render: row => {
        const assinged = _.includes(selectedServicePacks, row.serviceName)
        return <UiCheckbox isChecked={assinged} />
      }
    }
  ]

  console.log('QQQQQQQQQQQQQQQQQQQQQQQq')
  console.log(selectedServicePacks)

if(loading) return <UiLoading />
  return (
    <>
     <UiDataTable
        columns={columns}
        rows={userServices || []}
        rowKey="serviceName"
        pageSize={50}
        onClick={(row) => {userServiceSelection(row)}}
    />
    </>
	)
}

BulkSelectServicesPack.propTypes = {
  serviceProviderId: PropTypes.string,
  groupId: PropTypes.string,
  selecServicePack: PropTypes.func
}
