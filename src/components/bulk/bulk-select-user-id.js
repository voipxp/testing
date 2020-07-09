import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { UiSelectableTable, UiLoading } from '@/components/ui'
import { useAlerts } from '@/store/alerts'
import userApi from '@/api/users'

export const BulkSelectUserId = props => {
  const { serviceProviderId, groupId, settUsers } = props
  const [availableUser, setAvailableUser] = useState([])
  const [selectedUser, setSelectedUser] = useState([])
  const { alertDanger } = useAlerts()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await userApi.search({ serviceProviderId, groupId })
        setAvailableUser(users)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [alertDanger, serviceProviderId, groupId])

  useEffect(() => {
    settUsers(selectedUser)
  }, [settUsers, selectedUser])

  if (loading) return <UiLoading />

  return (
    <>
      <UiSelectableTable
        title="Users"
        availableUser={availableUser}
        setAvailableUser={availableItem => setAvailableUser(availableItem)}
        selectedUser={selectedUser}
        setSelectedUser={selectedItem => setSelectedUser(selectedItem)}
        rowKey="userId"
      />
    </>
  )
}

BulkSelectUserId.propTypes = {
  serviceProviderId: PropTypes.string,
  groupId: PropTypes.string,
  setToNext: PropTypes.func,
  settUsers: PropTypes.func
}
