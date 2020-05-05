import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb } from 'rbx'
import { AppBreadcrumb } from '@/components/app'
import { UiLoading, UiDataTable, UiCheckbox, UiCard } from '@/components/ui'
import { useAlerts } from '@/store/alerts'
import groupNumberApi from '@/api/groups/numbers'
/* eslint-disable react/display-name */
const columns = [
  { key: 'phoneNumbers', label: 'Phone Numbers' },
  { key: 'userId', label: 'User ID' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'firstName', label: 'First Name' },
  { key: 'extension', label: 'Extension' },
  { key: 'department', label: 'Department ' },
  {
    key: 'activated',
    label: 'Activated',
    render: row => <UiCheckbox isChecked={row.activated} />
  }
]

export const GroupNumbers = ({ match , isBreadcrumb = true }) => {
  const { alertDanger } = useAlerts()
  const { serviceProviderId, groupId } = match.params
  const [users, setUsers] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const data = await groupNumberApi.load(serviceProviderId, groupId)
        setUsers(data.dns)
      } catch (error) {
        alertDanger(error)
        setUsers([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [serviceProviderId, groupId, alertDanger])

  return (
    <>
	{ isBreadcrumb && ( <AppBreadcrumb>
        <Breadcrumb.Item>Numbers</Breadcrumb.Item>
</AppBreadcrumb> )}
      {loading ? (
        <UiLoading />
      ) : (
        <UiCard title="Numbers">
          <UiDataTable columns={columns} rows={users} rowKey="phoneNumbers" />
        </UiCard>
      )}
    </>
  )
}

GroupNumbers.propTypes = {
  match: PropTypes.object.isRequired,
  isBreadcrumb : PropTypes.bool 
}
