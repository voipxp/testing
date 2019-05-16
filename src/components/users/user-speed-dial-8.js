import React, { useState, useEffect } from 'react'
import apiUserService from '@/api/user-speed-dial-8'
import { useUi } from '@/store/ui'
import PropTypes from 'prop-types'
import { Field, Input, Column, Control, Label } from 'rbx'
import { useAlerts } from '@/store/alerts'
import {
  UiCard,
  UiLoadingCard,
  UiDataTable,
  UiButton,
  UiCardModal
} from '@/components/ui'

export const UserSpeedDial8 = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertWarning, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [speedDial8, setSpeedDial8] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({})
  const [showConfirm, setShowConfirm] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const columns = [
    { key: 'speedCode', label: 'Speed Code' },
    { key: 'phoneNumber', label: 'phoneNumber' }
  ]

  /*
    Load the speed dial 8, alert on error
  */
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const data = await apiUserService.show(userId)
        setSpeedDial8(data.speedCodes)
      } catch (error) {
        alertDanger(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [alertDanger, userId])

  function add() {
    setForm({ newSpeedCode: '', phoneNumber: '' })
    console.log('add()', form)
    setShowModal(true)
  }

  function edit(row) {
    setForm({ ...row, newSpeedCode: row.speedCode })
    console.log('edit() form', form)
    console.log('edit() row', row)
    setShowModal(true)
  }

  function remove() {
    setShowConfirm(false)
    // const newSpeedCodes = speedDial8.filter(
    //   code => code.speedCode !== form.speedCode
    // )
    const newSpeedCode = {
      speedCode: form.newSpeedCode,
      phoneNumber: ''
    }
    const newSpeedCodes = form.speedCode
      ? speedDial8.map(code =>
          code.speedCode !== form.speedCode ? code : newSpeedCode
        )
      : [...speedDial8, newSpeedCode]
    console.log('save() newSpeedCodes', newSpeedCodes)

    update(newSpeedCodes)
  }

  function save() {
    // update
    const newSpeedCode = {
      speedCode: form.newSpeedCode,
      phoneNumber: form.phoneNumber
    }
    const newSpeedCodes = form.speedCode
      ? speedDial8.map(code =>
          code.speedCode !== form.speedCode ? code : newSpeedCode
        )
      : [...speedDial8, newSpeedCode]
    console.log('save() newSpeedCodes', newSpeedCodes)
    update(newSpeedCodes)
  }

  async function update(speedCodes) {
    showLoadingModal()
    try {
      const data = await apiUserService.update({
        userId: userId,
        speedCodes: speedCodes
      })
      alertSuccess('User Speed Dial 8')
      setSpeedDial8(data.speedCodes)
      setShowModal(false)
    } catch (error) {
      alertDanger(error)
      setShowModal(true)
    } finally {
      setLoading(false)
      hideLoadingModal()
    }
  }

  return (
    <>
      {loading ? (
        <UiLoadingCard />
      ) : (
        <>
          <UiCard
            title="User Speed Dial 8"
            buttons={
              <UiButton
                color="link"
                icon="add"
                size="small"
                onClick={add}
                disabled={speedDial8.length > 7}
              />
            }
          >
            <UiDataTable
              columns={columns}
              rows={speedDial8}
              rowKey="speedCode"
              hideSearch={true}
              onClick={edit}
            />
          </UiCard>
          <UiCardModal
            title="Speed Dial 8"
            isOpen={showModal}
            onCancel={() => setShowModal(false)}
            onSave={save}
            onDelete={form.speedCode ? () => setShowConfirm(true) : null}
            deleteText="Unset"
          >
            <form style={{ marginBottom: '1rem' }}>
              <Column.Group>
                <Column>
                  <Field>
                    <Label>Speed Code</Label>
                    <Control>
                      <Input
                        type="text"
                        name="speedCode"
                        value={form.speedCode}
                        onChange={e =>
                          setForm({ ...form, newSpeedCode: e.target.value })
                        }
                        placeholder="speedCode"
                        disabled
                      />
                    </Control>
                  </Field>
                </Column>
                <Column>
                  <Field>
                    <Label>Phone Number</Label>
                    <Control>
                      <Input
                        type="text"
                        name="phoneNumber"
                        value={form.phoneNumber}
                        onChange={e =>
                          setForm({ ...form, phoneNumber: e.target.value })
                        }
                        placeholder="phoneNumber"
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
              Are you sure you want to Unset the Speed Dial 8 code?
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
