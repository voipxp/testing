import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Input, Table, Checkbox, Select, Column, Field } from 'rbx'
import { useAlerts } from '@/store/alerts'
import { useUserIntercept } from '@/store/user-intercept'
import {
  UiCard,
  UiLoadingCard,
  UiButton,
  UiCardModal,
  UiCheckbox
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
        <Table striped fullwidth>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Active</Table.Cell>
              <Table.Cell>
                <UiCheckbox isChecked={userUserIntercept.isActive} />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Announcement Selection</Table.Cell>
              <Table.Cell>{userUserIntercept.announcementSelection}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell colSpan="2" style={{ textAlign: 'center' }}>
                <b>Inbound Call Options</b>
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>Inbound Call Mode</Table.Cell>
              <Table.Cell>{userUserIntercept.inboundCallMode}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Alternate Blocking Announcement</Table.Cell>
              <Table.Cell>
                <UiCheckbox
                  isChecked={userUserIntercept.alternateBlockingAnnouncement}
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Exempt Inbound Mobility Calls</Table.Cell>
              <Table.Cell>
                <UiCheckbox
                  isChecked={userUserIntercept.exemptInboundMobilityCalls}
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Disable Parallel Ringing To Network Locations
              </Table.Cell>
              <Table.Cell>
                <UiCheckbox
                  isChecked={
                    userUserIntercept.disableParallelRingingToNetworkLocations
                  }
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Route To Voice Mail</Table.Cell>
              <Table.Cell>
                <UiCheckbox isChecked={userUserIntercept.routeToVoiceMail} />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Play New Phone Number</Table.Cell>
              <Table.Cell>
                <UiCheckbox isChecked={userUserIntercept.playNewPhoneNumber} />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>New Phone Number</Table.Cell>
              <Table.Cell>{userUserIntercept.newPhoneNumber}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>Transfer on 0 Phone Number</Table.Cell>
              <Table.Cell>
                <UiCheckbox
                  isChecked={userUserIntercept.transferOnZeroToPhoneNumber}
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Transfer on 0 to Phone Number</Table.Cell>
              <Table.Cell>{userUserIntercept.transferPhoneNumber}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell colSpan="2" style={{ textAlign: 'center' }}>
                <b>Outbound Call Options</b>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Outbound Call Mode</Table.Cell>
              <Table.Cell>{userUserIntercept.outboundCallMode}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Exempt Outbound Mobility Calls</Table.Cell>
              <Table.Cell>
                <UiCheckbox
                  isChecked={userUserIntercept.exemptOutboundMobilityCalls}
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Reroute Outbound Calls</Table.Cell>
              <Table.Cell>
                <UiCheckbox
                  isChecked={userUserIntercept.rerouteOutboundCalls}
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Outbound Reroute PhoneNumber</Table.Cell>
              <Table.Cell>
                {userUserIntercept.outboundReroutePhoneNumber}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
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
              />
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
              />
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
              />
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
              />
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
              />
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
              />
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
                placeholder="New Phone Number"
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
              />
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
              />
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
                placeholder="Outbound Reroute PhoneNumber"
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
