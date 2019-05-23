import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Input, Select } from 'rbx'
import { useAlerts } from '@/store/alerts'
import { useUserIntercept } from '@/store/user-intercept'
import {
  UiCard,
  UiLoadingCard,
  UiButton,
  UiCardModal,
  UiCheckbox,
  UiInputCheckbox,
  UiSection,
  UiListItem,
  UiFormField
} from '@/components/ui'

export const UserIntercept = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)
  const {
    userUserIntercept,
    loadUserIntercept,
    updateUserIntercept
  } = useUserIntercept(userId)

  const inboundCallModeTypes = [
    { key: 'Intercept All', name: 'Intercept All' },
    { key: 'Allow All', name: 'Allow All' },
    { key: 'Allow System Dns', name: 'Allow System Dns' }
  ]

  const outboundCallModeTypes = [
    { key: 'Block All', name: 'Block All' },
    { key: 'Allow Outbound Local Calls', name: 'Allow Outbound Local Calls' },
    {
      key: 'Allow Outbound Enterprise And Group Calls',
      name: 'Allow Outbound Enterprise And Group Calls'
    }
  ]

  function handleInput(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setForm({ ...form, [name]: value })
  }
  useEffect(() => {
    loadUserIntercept(userId).catch(alertDanger)
  }, [alertDanger, loadUserIntercept, userId])

  function edit() {
    setForm({ ...userUserIntercept })
    setShowModal(true)
  }

  function save() {
    update(form)
  }

  async function update(userIntercept) {
    showLoadingModal()
    try {
      await updateUserIntercept(userIntercept)
      alertSuccess('Intercept User Updated')
      setShowModal(false)
    } catch (error) {
      alertDanger(error)
    } finally {
      hideLoadingModal()
    }
  }

  if (!userUserIntercept) return <UiLoadingCard />

  return (
    <>
      <UiCard
        title="Intercept User"
        buttons={
          <UiButton color="link" icon="edit" size="small" onClick={edit} />
        }
      >
        <UiSection>
          <UiListItem label="Active">
            <UiCheckbox isChecked={userUserIntercept.isActive} />
          </UiListItem>
          <UiListItem label="Announcement Selection">
            {userUserIntercept.announcementSelection}
          </UiListItem>
        </UiSection>

        <UiSection title="Inbound Call Options">
          <UiListItem label="Inbound Call Mode">
            {userUserIntercept.inboundCallMode}
          </UiListItem>
          <UiListItem label="Alternate Blocking Announcement">
            <UiCheckbox
              isChecked={userUserIntercept.alternateBlockingAnnouncement}
            />
          </UiListItem>
          <UiListItem label="Exempt Inbound Mobility Calls">
            <UiCheckbox
              isChecked={userUserIntercept.exemptInboundMobilityCalls}
            />
          </UiListItem>
          <UiListItem label="Disable Parallel Ringing To Network Locations">
            <UiCheckbox
              isChecked={
                userUserIntercept.disableParallelRingingToNetworkLocations
              }
            />
          </UiListItem>
          <UiListItem label="Route To Voice Mail">
            <UiCheckbox isChecked={userUserIntercept.routeToVoiceMail} />
          </UiListItem>
          <UiListItem label="Play New Phone Number">
            <UiCheckbox isChecked={userUserIntercept.playNewPhoneNumber} />
          </UiListItem>
          <UiListItem label="New Phone Number">
            {userUserIntercept.newPhoneNumber}
          </UiListItem>
          <UiListItem label="Transfer on 0 Phone Number">
            <UiCheckbox
              isChecked={userUserIntercept.transferOnZeroToPhoneNumber}
            />
          </UiListItem>
          <UiListItem label="Transfer on 0 to Phone Number">
            {userUserIntercept.transferPhoneNumber}
          </UiListItem>
        </UiSection>

        <UiSection title="Outbound Call Options">
          <UiListItem label="Outbound Call Mode">
            {userUserIntercept.outboundCallMode}
          </UiListItem>
          <UiListItem label="Exempt Outbound Mobility Calls">
            <UiCheckbox
              isChecked={userUserIntercept.exemptOutboundMobilityCalls}
            />
          </UiListItem>
          <UiListItem label="Reroute Outbound Calls">
            <UiCheckbox isChecked={userUserIntercept.rerouteOutboundCalls} />
          </UiListItem>
          <UiListItem label="Outbound Reroute PhoneNumber">
            {userUserIntercept.outboundReroutePhoneNumber}
          </UiListItem>
        </UiSection>
      </UiCard>
      <UiCardModal
        title={`Edit User Intercept`}
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
      >
        <form>
          <UiSection title="Settings">
            <UiInputCheckbox
              name="isActive"
              label="Is Active"
              checked={form.isActive}
              onChange={handleInput}
            />
            <UiInputCheckbox
              name="alternateBlockingAnnouncement"
              label="Alternate Blocking Announcement"
              checked={form.alternateBlockingAnnouncement}
              onChange={handleInput}
            />
            <UiInputCheckbox
              name="exemptInboundMobilityCalls"
              checked={form.exemptInboundMobilityCalls}
              onChange={handleInput}
              label="Exempt Inbound Mobility Calls"
            />
            <UiInputCheckbox
              name="disableParallelRingingToNetworkLocations"
              checked={form.disableParallelRingingToNetworkLocations}
              onChange={handleInput}
              label="Disable Parallel Ringing To Network Locations"
            />
            <UiInputCheckbox
              name="routeToVoiceMail"
              checked={form.routeToVoiceMail}
              onChange={handleInput}
              label="Route To Voice Mail"
            />
            <UiInputCheckbox
              name="playNewPhoneNumber"
              checked={form.playNewPhoneNumber}
              onChange={handleInput}
              label="Play New Phone Number"
            />
            <UiInputCheckbox
              name="transferOnZeroToPhoneNumber"
              label="Transfer on 0 Phone Number"
              checked={form.transferOnZeroToPhoneNumber}
              onChange={handleInput}
            />
            <UiInputCheckbox
              name="exemptOutboundMobilityCalls"
              label="Exempt Outbound Mobility Calls"
              checked={form.exemptOutboundMobilityCalls}
              onChange={handleInput}
            />
            <UiInputCheckbox
              name="rerouteOutboundCalls"
              label="Reroute Outbound Calls"
              checked={form.rerouteOutboundCalls}
              onChange={handleInput}
            />
          </UiSection>

          <UiFormField horizontal label="Inbound Call Mode">
            <Select.Container>
              <Select
                value={form.inboundCallMode}
                onChange={handleInput}
                name="inboundCallMode"
              >
                {inboundCallModeTypes.map(searchType => (
                  <Select.Option key={searchType.key} value={searchType.key}>
                    {searchType.name}
                  </Select.Option>
                ))}
              </Select>
            </Select.Container>
          </UiFormField>
          <UiFormField label="New Phone Number" horizontal>
            <Input
              type="text"
              name="newPhoneNumber"
              value={form.newPhoneNumber}
              placeholder="New Phone Number"
              onChange={handleInput}
              disabled={!form.playNewPhoneNumber}
            />
          </UiFormField>
          <UiFormField label="Transfer on 0 Phone Number" horizontal>
            <Input
              type="text"
              name="transferPhoneNumber"
              value={form.transferPhoneNumber}
              placeholder="Transfer on 0 Phone Number"
              onChange={handleInput}
              disabled={!form.transferOnZeroToPhoneNumber}
            />
          </UiFormField>

          <UiFormField label="Outbound Call Mode" horizontal>
            <Select.Container>
              <Select
                value={form.outboundCallMode}
                onChange={handleInput}
                name="outboundCallMode"
              >
                {outboundCallModeTypes.map(searchType => (
                  <Select.Option key={searchType.key} value={searchType.key}>
                    {searchType.name}
                  </Select.Option>
                ))}
              </Select>
            </Select.Container>
          </UiFormField>
          <UiFormField label="Reroute Outbound Calls Phone Number" horizontal>
            <Input
              type="text"
              name="outboundReroutePhoneNumber"
              value={form.outboundReroutePhoneNumber}
              placeholder="Outbound Reroute Phone Number"
              onChange={handleInput}
              disabled={!form.rerouteOutboundCalls}
            />
          </UiFormField>
        </form>
      </UiCardModal>
    </>
  )
}
UserIntercept.propTypes = {
  match: PropTypes.object.isRequired
}
