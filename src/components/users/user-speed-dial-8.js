import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Field, Input, Column, Control } from 'rbx'
import { useAlert, useLoadingModal } from '@/utils'
import { UiCard, UiLoadingCard, UiDataTable, UiButton, UiCardModal } from '@/components/ui'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { USER_SPEED_DIAL_8_QUERY, USER_SPEED_DIAL_8_MUTATION } from '@/graphql'

export const UserSpeedDial8 = ({ match }) => {
  const Alert = useAlert()
  const Loading = useLoadingModal()
  const { userId } = match.params
  const [form, setForm] = useState({})
  const [showConfirm, setShowConfirm] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const { data, error, loading } = useQuery(USER_SPEED_DIAL_8_QUERY, { variables: { userId } })
  const [update] = useMutation(USER_SPEED_DIAL_8_MUTATION)

  if (error) Alert.danger(error)
  if (loading || !data) return <UiLoadingCard />

  const { userSpeedDial8 } = data

  const columns = [
    { key: 'speedCode', label: 'Speed Code' },
    { key: 'phoneNumber', label: 'Phone Number' }
  ]

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
    const newSpeedCodes = userSpeedDial8.speedCodes.map(code =>
      code.speedCode === form.speedCode ? { ...form, phoneNumber: null } : code
    )
    return updateSpeedCodes(newSpeedCodes)
  }

  function save() {
    const newSpeedCodes = userSpeedDial8.speedCodes.map(code =>
      code.speedCode === form.speedCode ? { ...form } : code
    )
    return updateSpeedCodes(newSpeedCodes)
  }
  /*
    Map through and update the one matching the form to the
    new value, otherwise pass the original.
  */
  async function updateSpeedCodes(speedCodes) {
    Loading.show()
    try {
      await update({ variables: { input: { userId, speedCodes } } })
      Alert.success('Speed Dial 8 Code Updated')
      setShowModal(false)
    } catch (error_) {
      Alert.danger(error_)
    } finally {
      Loading.hide()
    }
  }

  return (
    <>
      <UiCard title="Speed Dial 8">
        <UiDataTable
          columns={columns}
          rows={userSpeedDial8.speedCodes}
          rowKey="speedCode"
          hideSearch={true}
          onClick={edit}
        />
      </UiCard>
      <UiCardModal
        title={`Edit Speed Code ${form.speedCode}`}
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
        onDelete={form.speedCode ? () => setShowConfirm(true) : null}
      >
        <form>
          <Column.Group>
            <Column>
              <Field>
                <Control>
                  <UiButton fullwidth static>
                    Speed Code {form.speedCode}
                  </UiButton>
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
                    onChange={e => setForm({ ...form, phoneNumber: e.target.value })}
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
      >
        <blockquote>
          Are you sure you want to remove Speed Code {form.speedCode} ({form.phoneNumber})?
        </blockquote>
      </UiCardModal>
    </>
  )
}
UserSpeedDial8.propTypes = {
  match: PropTypes.object.isRequired
}
