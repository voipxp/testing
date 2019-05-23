import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useUserRegistration } from '@/store/user-registration'
import { useAlerts } from '@/store/alerts'
import { UiCard, UiLoadingCard, UiDataTable } from '@/components/ui'

export const UserRegistration = ({ match }) => {
  const { userId } = match.params
  const { userRegistration, loadUserRegistration } = useUserRegistration(userId)
  const { alertDanger } = useAlerts()

  const columns = [
    { key: 'deviceLevel', label: 'Level' },
    { key: 'deviceName', label: 'Name' },
    { key: 'line/Port', label: 'Line Port' },
    { key: 'expiration', label: 'Expiration' },
    { key: 'endpointType', label: 'Type' },
    { key: 'userAgent', label: 'User Agent' }
  ]

  useEffect(() => {
    loadUserRegistration(userId).catch(alertDanger)
  }, [alertDanger, loadUserRegistration, userId])

  if (!userRegistration) return <UiLoadingCard />

  return (
    <>
      <UiCard title="User Registrations">
        <UiDataTable
          columns={columns}
          rows={userRegistration.registrations}
          rowKey="deviceName"
          hideSearch={true}
        />
      </UiCard>
    </>
  )
}
UserRegistration.propTypes = {
  match: PropTypes.object.isRequired
}
