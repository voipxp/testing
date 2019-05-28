import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'rbx'
import { AppBreadcrumb } from '@/components/app'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Field, Input, Column, Control } from 'rbx'
import { useAlerts } from '@/store/alerts'
import { useUserSpeedDial8Bulk } from '@/store/user-speed-dial-8'
import {
  UiCard,
  UiLoadingCard,
  UiDataTable,
  UiButton,
  UiCardModal
} from '@/components/ui'

export const GroupSpeedDial8 = ({ match }) => {
  const { serviceProviderId, groupId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showConfirm, setShowConfirm] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const { userSpeedDial8Bulk, loadUserSpeedDial8Bulk } = useUserSpeedDial8Bulk(
    serviceProviderId,
    groupId
  )

  const columns = [
    { key: 'userId', label: 'User ID' },
    { key: '2', label: '2' },
    { key: '3', label: '3' },
    { key: '4', label: '4' },
    { key: '5', label: '5' },
    { key: '6', label: '6' },
    { key: '7', label: '7' },
    { key: '8', label: '8' },
    { key: '9', label: '9' }
  ]

  useEffect(() => {
    loadUserSpeedDial8Bulk(serviceProviderId, groupId).catch(alertDanger)
  }, [alertDanger, groupId, loadUserSpeedDial8Bulk, serviceProviderId])

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
    // const newSpeedCodes = userSpeedDial8.speedCodes.map(code =>
    //   code.speedCode === form.speedCode ? { ...form, phoneNumber: '' } : code
    // )
    // update(newSpeedCodes)
  }

  /*
    Map through and update the one matching the form to the
    new value, otherwise pass the original.
  */
  function save() {
    // const newSpeedCodes = userSpeedDial8.speedCodes.map(code =>
    //   code.speedCode === form.speedCode ? { ...form } : code
    // )
    // update(newSpeedCodes)
  }

  async function update(speedCodes) {
    showLoadingModal()
    // try {
    //   await updateUserSpeedDial8({
    //     userId: userId,
    //     speedCodes: speedCodes
    //   })
    //   alertSuccess('Speed Dial 8 Code Updated')
    //   setShowModal(false)
    // } catch (error) {
    //   alertDanger(error)
    // } finally {
    //   hideLoadingModal()
    // }
  }

  /*
    Map the speedCodes into an object with speedcode as key
  */
  const rows = userSpeedDial8Bulk.map(({ userId, speedCodes = [] }) => {
    const row = { userId }
    for (let i = 2; i < 10; i++) {
      const codeStr = String(i)
      const code = speedCodes.find(s => s.speedCode === codeStr)
      row[codeStr] = code && code.phoneNumber
    }
    return row
  })

  return (
    <>
      <AppBreadcrumb>
        <Breadcrumb.Item>Speed Dial 8</Breadcrumb.Item>
      </AppBreadcrumb>
      {rows.length === 0 ? (
        <UiLoadingCard />
      ) : (
        <UiCard title="Bulk Speed Dial 8">
          <UiDataTable
            columns={columns}
            rows={rows}
            rowKey="userId"
            hideSearch={true}
            onClick={edit}
          />
        </UiCard>
      )}
      <UiCardModal
        title={`Edit Speed Code ${form.speedCode}`}
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
GroupSpeedDial8.propTypes = {
  match: PropTypes.object.isRequired
}
