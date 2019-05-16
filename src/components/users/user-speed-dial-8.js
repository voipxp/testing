import React, { useState, useEffect } from 'react'
import apiUserService from '@/api/user-speed-dial-8'
import { useUi } from '@/store/ui'
import PropTypes from 'prop-types'
import { Field, Input, Column, Control } from 'rbx'
import { useAlerts } from '@/store/alerts'
import { useUserSpeedDial8 } from '@/store/user-speed-dial-8'
import {
  UiCard,
  UiLoadingCard,
  UiDataTable,
  UiButton,
  UiCardModal
} from '@/components/ui'

export const UserSpeedDial8 = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [speedDial8, setSpeedDial8] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({})
  const [showConfirm, setShowConfirm] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const {
    userSpeedDial8,
    loadUserSpeedDial8,
    updateUserSpeedDial8
  } = useUserSpeedDial8(userId)

  const columns = [
    { key: 'speedCode', label: 'Speed Code' },
    { key: 'phoneNumber', label: 'Phone Number' }
  ]

  /*
    Load the speed dial 8, alert on error
  */
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        if (!userSpeedDial8) await loadUserSpeedDial8(userId)
      } catch (error) {
        alertDanger(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [alertDanger, loadUserSpeedDial8, userId, userSpeedDial8])

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
      code.speedCode === form.speedCode ? { ...form, phoneNumber: '' } : code
    )
    update(newSpeedCodes)
  }

  /*
    Map through and update the one matching the form to the
    new value, otherwise pass the original.
  */
  function save() {
    const newSpeedCodes = userSpeedDial8.speedCodes.map(code =>
      code.speedCode === form.speedCode ? { ...form } : code
    )
    update(newSpeedCodes)
  }

  function update(speedCodes) {
    showLoadingModal()
    try {
      updateUserSpeedDial8({
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

  return (
    <>
      {loading ? (
        <UiLoadingCard />
      ) : (
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
            title={`Edit Speed Code ${form.speedCode}  ${form.phoneNumber}`}
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
      )}
    </>
  )
}
UserSpeedDial8.propTypes = {
  match: PropTypes.object.isRequired
}
