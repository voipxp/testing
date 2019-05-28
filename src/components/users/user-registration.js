import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useUserRegistration } from '@/store/user-registration'
import { useAlerts } from '@/store/alerts'
import {
  UiCard,
  UiLoadingCard,
  UiDataTable,
  UiCardModal,
  UiSection,
  UiListItem,
  UiButton
} from '@/components/ui'
import { Field, Column } from 'rbx'

export const UserRegistration = ({ match }) => {
  const { userId } = match.params
  const { userRegistration, loadUserRegistration } = useUserRegistration(userId)
  const { alertDanger } = useAlerts()
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({})

  const columns = [
    { key: 'deviceLevel', label: 'Level' },
    { key: 'deviceName', label: 'Name' },
    { key: 'linePort', label: 'Line Port' },
    { key: 'expiration', label: 'Expiration' },
    { key: 'endpointType', label: 'Type' }
  ]

  useEffect(() => {
    loadUserRegistration(userId).catch(alertDanger)
  }, [alertDanger, loadUserRegistration, userId])

  function show(row) {
    setForm({ ...row })
    setShowModal(true)
  }
  if (!userRegistration) return <UiLoadingCard />

  return (
    <>
      <UiCard title="User Registrations">
        <UiDataTable
          columns={columns}
          rows={userRegistration.registrations}
          rowKey="deviceName"
          hideSearch={true}
          onClick={show}
        />
      </UiCard>
      <UiCardModal
        title="User Registration"
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
      >
        <UiSection>
          <UiListItem label="Order">{form.order}</UiListItem>
          <UiListItem label="Endpoint Type">{form.endpointType}</UiListItem>
          <UiListItem label="Device Level">{form.deviceLevel}</UiListItem>
          <UiListItem label="Device Name">{form.deviceName}</UiListItem>
          <UiListItem label="Line Port">{form.linePort}</UiListItem>
          <UiListItem label="Expiration">{form.expiration}</UiListItem>
          <UiListItem label="URI">{form.uRI}</UiListItem>
          <UiListItem label="User Agent">{form.userAgent}</UiListItem>
          <UiListItem label="Public Net Address">
            {form.publicNetAddress}
          </UiListItem>
          <UiListItem label="Public Port">{form.publicPort}</UiListItem>
          <UiListItem label="Private Net Address">
            {form.privateNetAddress}
          </UiListItem>
          <UiListItem label="Private Port">{form.privatePort}</UiListItem>
          <UiListItem label="Lockout Started">{form.lockoutStarted}</UiListItem>
          <UiListItem label="Lockout Expires">{form.lockoutExpires}</UiListItem>
          <UiListItem label="Lockout Count">{form.lockoutCount}</UiListItem>
          <UiListItem label="Access Info">{form.accessInfo}</UiListItem>
        </UiSection>
      </UiCardModal>
    </>
  )
}
UserRegistration.propTypes = {
  match: PropTypes.object.isRequired
}
