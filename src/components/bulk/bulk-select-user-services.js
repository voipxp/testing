import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { UiLoading, UiDataTable, UiCheckbox } from '@/components/ui'
import groupServicesApi from '@/api/group-services'
import { useAsync } from 'react-async-hook'
import _ from 'lodash'

export const BulkSelectUserServices = ({
  serviceProviderId,
  groupId,
  selectUserService
}) => {
  const [selectedUserServices, setSelectedUserServices] = useState([])
  const { result, loading } = useAsync(
    () =>
      groupServicesApi.show(groupId, serviceProviderId).then(result => {
        return result.userServices.filter(el => {
          return el.authorized === true
        })
      }),
    []
  )
  const userServices = (result && result) || []

  const userServiceSelection = row => {
    const services = [...selectedUserServices]
    if (_.includes(services, row.serviceName)) _.pull(services, row.serviceName)
    else services.push(row.serviceName)
    setSelectedUserServices([..._.uniq(services)])
  }

  useEffect(() => {
    selectUserService(selectedUserServices)
  }, [selectUserService, selectedUserServices])

  const columns = [
    {
      key: 'alias',
      label: 'Service Name'
    },
    {
      key: 'assigned',
      label: 'Selected',
      // eslint-disable-next-line react/display-name
      render: row => {
        const assinged = _.includes(selectedUserServices, row.serviceName)
        return <UiCheckbox isChecked={assinged} />
      }
    }
  ]

  if (loading) return <UiLoading />
  return (
    <>
      <UiDataTable
        columns={columns}
        rows={userServices || []}
        rowKey="alias"
        pageSize={50}
        onClick={row => {
          userServiceSelection(row)
        }}
      />
    </>
  )
}

BulkSelectUserServices.propTypes = {
  serviceProviderId: PropTypes.string,
  groupId: PropTypes.string,
  selectUserService: PropTypes.func
}
