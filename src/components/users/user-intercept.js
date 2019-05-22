import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Field, Input, Column, Control, Table } from 'rbx'
import { useAlerts } from '@/store/alerts'
import { useUserIntercept } from '@/store/user-intercept'
import {
  UiCard,
  UiLoadingCard,
  UiButton,
  UiCardModal,
  UiCheckbox
} from '@/components/ui'
import userIntercept from '@/api/user-intercept'

export const UserIntercept = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showConfirm, setShowConfirm] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const {
    userUserIntercept,
    loadUserIntercept,
    updateUserIntercept
  } = useUserIntercept(userId)

  /*
    Load the speed dial 8, alert on error
  */
  useEffect(() => {
    loadUserIntercept(userId).catch(alertDanger)
  }, [alertDanger, loadUserIntercept, userId])

  /*
    Make a copy of the row for the form
    Make sure phoneNumber is at least an empty string
  */
  function edit(row) {
    setForm({ phoneNumber: '', ...row })
    setShowModal(true)
  }

  /*
    Map through and update the one matching the form to
    have a blank phoneNumber, otherwise pass the original
  */
  function remove() {
    setShowConfirm(false)
    const newSpeedCodes = userIntercept.speedCodes.map(code =>
      code.speedCode === form.speedCode ? { ...form, phoneNumber: '' } : code
    )
    update(newSpeedCodes)
  }

  /*
    Map through and update the one matching the form to the
    new value, otherwise pass the original.
  */
  function save() {
    const newSpeedCodes = userIntercept.speedCodes.map(code =>
      code.speedCode === form.speedCode ? { ...form } : code
    )
    update(newSpeedCodes)
  }

  async function update(speedCodes) {
    showLoadingModal()
    try {
      await updateUserIntercept({
        userId: userId,
        speedCodes: speedCodes
      })
      alertSuccess('Speed Dial 8 Code Updated')
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
      <UiCard title="Intercept User">
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
              <Table.Cell>Inbound Call Mode</Table.Cell>
              <Table.Cell>{userUserIntercept.inboundCallMode}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>alternateBlockingAnnouncement</Table.Cell>
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
          </Table.Body>
        </Table>
      </UiCard>
      <UiCardModal
        title={`Edit User Intercept`}
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
        onDelete={form.speedCode ? () => setShowConfirm(true) : null}
        deleteText="Unset"
      >
        <form>
          <Column.Group>
            <Column>
              <Field>
                <Control>
                  <Input
                    type="text"
                    name="userId"
                    value={form.newUserId}
                    onChange={e =>
                      setForm({ ...form, newUserId: e.target.value })
                    }
                    placeholder="userId"
                  />
                </Control>
              </Field>
            </Column>
            <Column>
              <Field>
                <Control>
                  <Input
                    type="text"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={e =>
                      setForm({ ...form, phoneNumber: e.target.value })
                    }
                    placeholder="Phone Number"
                  />
                </Control>
              </Field>
            </Column>
          </Column.Group>
        </form>
      </UiCardModal>
      <UiCardModal
        title="Please Confirm"
        isOpen={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onDelete={remove}
        deleteText="Unset"
      >
        <blockquote>
          Are you sure you want to unset Speed Code {form.speedCode}{' '}
          {form.phoneNumber}?
        </blockquote>
      </UiCardModal>
    </>
  )
}
UserIntercept.propTypes = {
  match: PropTypes.object.isRequired
}
