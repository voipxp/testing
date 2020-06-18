import React from 'react'
import PropTypes from 'prop-types'
import { UiLoading, UiDataTable } from '@/components/ui'
import { useAsync } from 'react-async-hook'
import UserPersonalPhoneListAPI from '@/api/users/user-personal-phone-list'

export const UserPersonalPhoneListSelect = (
{
  userId,
  setSelectedPhone
}
) => {
  const columns = [
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'phoneNumber',
      label: 'Phone Number'
    }
  ]

const { result, loading } = useAsync(
    () => UserPersonalPhoneListAPI.show(userId)
	.then((result) => {
		return result.entries
	}),
    []
  )

  const phoneList = result || []

  if (loading) return <UiLoading />

  return (
    <>
      <UiDataTable
        columns={columns}
        rows={phoneList || []}
        rowKey="name"
        pageSize={25}
        onClick={(phone) => setSelectedPhone(phone)}
      />
    </>
  )
}

UserPersonalPhoneListSelect.propTypes = {
  userId: PropTypes.string.isRequired,
  setSelectedPhone: PropTypes.func
}
