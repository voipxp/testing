import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Input, Select, Column } from 'rbx'
import { useAlert, useLoadingModal } from '@/utils'

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
import { useQuery, useMutation } from '@apollo/react-hooks'
import { USER_INTERCEPT_QUERY, USER_INTERCEPT_UPDATE_MUTATION } from '@/graphql'

const INBOUND_CALL_MODES = ['Intercept All', 'Allow All', 'Allow System Dns']

const OUTBOUND_CALL_MODES = [
  'Block All',
  'Allow Outbound Local Calls',
  'Allow Outbound Enterprise And Group Calls'
]

export const UserIntercept = ({ match }) => {
  const Alert = useAlert()
  const Loading = useLoadingModal()
  const { userId } = match.params
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)

  const { data, loading, error } = useQuery(USER_INTERCEPT_QUERY, { variables: { userId } })
  const [update] = useMutation(USER_INTERCEPT_UPDATE_MUTATION)

  if (error) Alert.danger(error)
  if (loading || !data) return <UiLoadingCard />

  const { userIntercept } = data

  function handleInput(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setForm({ ...form, [name]: value })
  }

  function edit() {
    setForm({ ...userIntercept })
    setShowModal(true)
  }

  async function save() {
    try {
      Loading.show()
      await update({ variables: { input: form } })
      Alert.success('Intercept User Updated')
      setShowModal(false)
    } catch (error_) {
      Alert.danger(error_)
    } finally {
      Loading.hide()
    }
  }

  return (
    <>
      <UiCard
        title="Intercept User"
        buttons={<UiButton color="link" icon="edit" size="small" onClick={edit} />}
      >
        <UiSection>
          <UiListItem label="Active">
            <UiCheckbox isChecked={userIntercept.isActive} />
          </UiListItem>
          <UiListItem label="Announcement Selection">
            {userIntercept.announcementSelection}
          </UiListItem>
        </UiSection>

        <UiSection title="Inbound Call Options">
          <UiListItem label="Inbound Call Mode">{userIntercept.inboundCallMode}</UiListItem>
          <UiListItem label="Alternate Blocking Announcement">
            <UiCheckbox isChecked={userIntercept.alternateBlockingAnnouncement} />
          </UiListItem>
          <UiListItem label="Exempt Inbound Mobility Calls">
            <UiCheckbox isChecked={userIntercept.exemptInboundMobilityCalls} />
          </UiListItem>
          <UiListItem label="Disable Parallel Ringing To Network Locations">
            <UiCheckbox isChecked={userIntercept.disableParallelRingingToNetworkLocations} />
          </UiListItem>
          <UiListItem label="Route To Voice Mail">
            <UiCheckbox isChecked={userIntercept.routeToVoiceMail} />
          </UiListItem>
          <UiListItem label="Play New Phone Number">
            <UiCheckbox isChecked={userIntercept.playNewPhoneNumber} />
          </UiListItem>
          <UiListItem label="New Phone Number">{userIntercept.newPhoneNumber}</UiListItem>
          <UiListItem label="Transfer on 0 Phone Number">
            <UiCheckbox isChecked={userIntercept.transferOnZeroToPhoneNumber} />
          </UiListItem>
          <UiListItem label="Transfer on 0 to Phone Number">
            {userIntercept.transferPhoneNumber}
          </UiListItem>
        </UiSection>

        <UiSection title="Outbound Call Options">
          <UiListItem label="Outbound Call Mode">{userIntercept.outboundCallMode}</UiListItem>
          <UiListItem label="Exempt Outbound Mobility Calls">
            <UiCheckbox isChecked={userIntercept.exemptOutboundMobilityCalls} />
          </UiListItem>
          <UiListItem label="Reroute Outbound Calls">
            <UiCheckbox isChecked={userIntercept.rerouteOutboundCalls} />
          </UiListItem>
          <UiListItem label="Outbound Reroute PhoneNumber">
            {userIntercept.outboundReroutePhoneNumber}
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
                    {INBOUND_CALL_MODES.map(mode => (
                      <Select.Option key={mode} value={mode}>
                        {mode}
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
                    {OUTBOUND_CALL_MODES.map(mode => (
                      <Select.Option key={mode} value={mode}>
                        {mode}
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
