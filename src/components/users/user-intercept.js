import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Input, Select, Column } from 'rbx'
import { useAlerts } from '@/store/alerts'
import { useQuery, queryCache } from 'react-query'
import api from '@/api/user-intercept'

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
import { AppHelp } from '@/components/app'

export const UserIntercept = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)
  const { data: result, loading, error } = useQuery('user-intercept', () =>
    api.show(userId)
  )

  const userUserIntercept = result || {}

  if (error) alertDanger(error)
  if (loading) return <UiLoadingCard />

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
      const newUserIntercept = await api.update(userIntercept)
        queryCache.setQueryData(['user-intercept'], newUserIntercept, {
        shouldRefetch: true
      })
      alertSuccess('Intercept User Updated')
      setShowModal(false)
    } catch (error_) {
      alertDanger(error_)
    } finally {
      hideLoadingModal()
    }
  }

  return (
    <>
      <UiCard
        title="Intercept User"
		    helpModule={<AppHelp module='Intercept User'/>}
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

          <Column.Group>
            <Column>
              <UiFormField label="Inbound Call Mode">
                <Select.Container fullwidth>
                  <Select
                    value={form.inboundCallMode}
                    onChange={handleInput}
                    name="inboundCallMode"
                  >
                    {inboundCallModeTypes.map(searchType => (
                      <Select.Option
                        key={searchType.key}
                        value={searchType.key}
                      >
                        {searchType.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Select.Container>
              </UiFormField>
            </Column>
            <Column />
          </Column.Group>
          <Column.Group>
            <Column>
              <UiFormField label="New Phone Number">
                <Input
                  type="text"
                  name="newPhoneNumber"
                  value={form.newPhoneNumber}
                  placeholder="New Phone Number"
                  onChange={handleInput}
                  disabled={!form.playNewPhoneNumber}
                />
              </UiFormField>
            </Column>
            <Column>
              <UiFormField label="Transfer on 0 Phone Number">
                <Input
                  type="text"
                  name="transferPhoneNumber"
                  value={form.transferPhoneNumber}
                  placeholder="Transfer on 0 Phone Number"
                  onChange={handleInput}
                  disabled={!form.transferOnZeroToPhoneNumber}
                />
              </UiFormField>
            </Column>
          </Column.Group>

          <Column.Group>
            <Column>
              <UiFormField label="Outbound Call Mode">
                <Select.Container fullwidth>
                  <Select
                    value={form.outboundCallMode}
                    onChange={handleInput}
                    name="outboundCallMode"
                  >
                    {outboundCallModeTypes.map(searchType => (
                      <Select.Option
                        key={searchType.key}
                        value={searchType.key}
                      >
                        {searchType.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Select.Container>
              </UiFormField>
            </Column>
            <Column>
              <UiFormField label="Reroute Outbound Calls Phone Number">
                <Input
                  type="text"
                  name="outboundReroutePhoneNumber"
                  value={form.outboundReroutePhoneNumber}
                  placeholder="Outbound Reroute Phone Number"
                  onChange={handleInput}
                  disabled={!form.rerouteOutboundCalls}
                />
              </UiFormField>
            </Column>
          </Column.Group>
        </form>
      </UiCardModal>
    </>
  )
}
UserIntercept.propTypes = {
  match: PropTypes.object.isRequired
}
