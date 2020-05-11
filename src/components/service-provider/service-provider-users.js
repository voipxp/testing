import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb } from 'rbx'
import { AppBreadcrumb } from '@/components/app'
import { useQuery } from 'react-query'
import apiUsers from '@/api/service-providers/service-provider-users'
import { 
  UiCard,
  UiCheckbox,
  UiDataTable,
  UiLoading
} from '@/components/ui'
/* eslint-disable react/display-name */
const columns = [
  {
    key: "userId",
    label: 'User Id'
  },
  {
    key: "lastName",
    label: 'Last Name'
  },
  {
    key: "firstName",
    label: 'First Name'
  },
  {
    key: "phoneNumber",
    label: 'Phone Number'
  },
  
  {
    key: "extension",
    label: 'Extension'
  },
  
  {
    key: "department",
    label: 'Department'
  },
  {
    key: "inTrunkGroup",
    label: 'In Trunk Group',
    render: row => <UiCheckbox isChecked={row.inTrunkGroup} />
  },
]


export const ServiceProviderUsers = ({ match , isBreadcrumb = true }) => {
  const { serviceProviderId } = match.params
  const { data: result, isLoading } = useQuery(
    'service-provider-users',
    () => apiUsers.show(serviceProviderId)
  )
  const users = result || {}
  console.log(users)
  return (
    <>
      {(isBreadcrumb && 
          <AppBreadcrumb>
            <Breadcrumb.Item>Users</Breadcrumb.Item>
          </AppBreadcrumb>
      )} 
      {isLoading ? (
        <UiLoading />
      ) : (
        <UiCard
          title="Users"
        >
          <UiDataTable
          columns={columns}
          rows={users}
          rowKey="userId"
          pageSize={25}
          />
        </UiCard>
      )}
    </>
  )
}

ServiceProviderUsers.propTypes = {
  match: PropTypes.object.isRequired,
  isBreadcrumb : PropTypes.bool
}
