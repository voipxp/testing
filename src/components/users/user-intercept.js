import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Input, Checkbox, Select, Column } from 'rbx'
import { useAlerts } from '@/store/alerts'
import { useUserIntercept } from '@/store/user-intercept'
import {
  UiCard,
  UiLoadingCard,
  UiButton,
  UiCardModal,
  UiCheckbox,
  UiList,
  UiListItem
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
        <UiList>
          <UiListItem label="Active">
            <UiCheckbox isChecked={userUserIntercept.isActive} />
          </UiListItem>
          <UiListItem label="Announcement Selection">
            {userUserIntercept.announcementSelection}
          </UiListItem>
        </UiList>

        <UiList title="Inbound Call Options">
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
        </UiList>

        <UiList title="Outbound Call Options">
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
        </UiList>
      </UiCard>
      <UiCardModal
        title={`Edit User Intercept`}
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
      >
        <form>
          <Column.Group vcentered multiline gapsize="1">
            <Column size="half" narrow>
              <UiButton fullwidth static>
                Active
              </UiButton>
            </Column>
            <Column size="half" narrow>
              <Checkbox
                name="isActive"
                value={form.isActive}
                checked={form.isActive}
                onChange={handleInput}
              />{' '}
              Is Active
            </Column>
            <Column size="half" narrow>
              <UiButton fullwidth static>
                Announcement Selection
              </UiButton>
            </Column>
            <Column size="half" narrow>
              {userUserIntercept.announcementSelection}
            </Column>
            <Column size="half" narrow>
              <UiButton fullwidth static>
                Inbound Call Mode
              </UiButton>
            </Column>
            <Column size="half" narrow>
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
            </Column>
            <Column size="half" narrow>
              <UiButton fullwidth static>
                Alternate Blocking Announcement
              </UiButton>
            </Column>
            <Column size="half" narrow>
              <Checkbox
                name="alternateBlockingAnnouncement"
                value={form.alternateBlockingAnnouncement}
                checked={form.alternateBlockingAnnouncement}
                onChange={handleInput}
              />{' '}
              Alternate Blocking Announcement
            </Column>
            <Column size="half" narrow>
              <UiButton fullwidth static>
                Exempt Inbound Mobility Calls
              </UiButton>
            </Column>
            <Column size="half" narrow>
              <Checkbox
                name="exemptInboundMobilityCalls"
                value={form.exemptInboundMobilityCalls}
                checked={form.exemptInboundMobilityCalls}
                onChange={handleInput}
              />{' '}
              Exempt Inbound Mobility Calls
            </Column>
            <Column size="half" narrow>
              <UiButton fullwidth static>
                Disable Parallel Ringing To Network Locations
              </UiButton>
            </Column>
            <Column size="half" narrow>
              <Checkbox
                name="disableParallelRingingToNetworkLocations"
                value={form.disableParallelRingingToNetworkLocations}
                checked={form.disableParallelRingingToNetworkLocations}
                onChange={handleInput}
              />{' '}
              Disable Parallel Ringing To Network Locations
            </Column>
            <Column size="half" narrow>
              <UiButton fullwidth static>
                Route To Voice Mail
              </UiButton>
            </Column>
            <Column size="half" narrow>
              <Checkbox
                name="routeToVoiceMail"
                value={form.routeToVoiceMail}
                checked={form.routeToVoiceMail}
                onChange={handleInput}
              />{' '}
              Route To Voice Mail
            </Column>
            <Column size="half" narrow>
              <UiButton fullwidth static>
                Play New Phone Number
              </UiButton>
            </Column>
            <Column size="half" narrow>
              <Checkbox
                name="playNewPhoneNumber"
                value={form.playNewPhoneNumber}
                checked={form.playNewPhoneNumber}
                onChange={handleInput}
              />{' '}
              Play New Phone Number
            </Column>
            <Column size="half" narrow>
              <UiButton fullwidth static>
                New Phone Number
              </UiButton>
            </Column>
            <Column size="half" narrow>
              <Input
                type="text"
                name="newPhoneNumber"
                value={form.newPhoneNumber}
                placeholder="New Phone Number"
                onChange={handleInput}
                disabled={!form.playNewPhoneNumber}
              />
            </Column>
            <Column size="half" narrow>
              <UiButton fullwidth static>
                Transfer on 0 Phone Number
              </UiButton>
            </Column>
            <Column size="half" narrow>
              <Checkbox
                name="transferOnZeroToPhoneNumber"
                value={form.transferOnZeroToPhoneNumber}
                checked={form.transferOnZeroToPhoneNumber}
                onChange={handleInput}
              />
              {'  '}
              Transfer on 0 Phone Number
            </Column>
            <Column size="half" narrow>
              <UiButton fullwidth static>
                Transfer on 0 To Phone Number
              </UiButton>
            </Column>
            <Column size="half" narrow>
              <Input
                type="text"
                name="transferPhoneNumber"
                value={form.transferPhoneNumber}
                placeholder="Transfer on 0 Phone Number"
                onChange={handleInput}
                disabled={!form.transferOnZeroToPhoneNumber}
              />
            </Column>
            <Column size="half" narrow>
              <UiButton fullwidth static>
                Outbound Call Mode
              </UiButton>
            </Column>
            <Column size="half" narrow>
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
            </Column>
            <Column size="half" narrow>
              <UiButton fullwidth static>
                Exempt Outbound Mobility Calls
              </UiButton>
            </Column>
            <Column size="half" narrow>
              <Checkbox
                name="exemptOutboundMobilityCalls"
                value={form.exemptOutboundMobilityCalls}
                checked={form.exemptOutboundMobilityCalls}
                onChange={handleInput}
              />{' '}
              Exempt Outbound Mobility Calls
            </Column>
            <Column size="half" narrow>
              <UiButton fullwidth static>
                Reroute Outbound Calls
              </UiButton>
            </Column>
            <Column size="half" narrow>
              <Checkbox
                name="rerouteOutboundCalls"
                value={form.rerouteOutboundCalls}
                checked={form.rerouteOutboundCalls}
                onChange={handleInput}
              />{' '}
              Reroute Outbound Calls
            </Column>
            <Column size="half" narrow>
              <UiButton fullwidth static>
                Reroute Outbound Calls Phone Number
              </UiButton>
            </Column>
            <Column size="half" narrow>
              <Input
                type="text"
                name="outboundReroutePhoneNumber"
                value={form.outboundReroutePhoneNumber}
                placeholder="Outbound Reroute Phone Number"
                onChange={handleInput}
                disabled={!form.rerouteOutboundCalls}
              />
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
