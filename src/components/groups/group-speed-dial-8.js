import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'rbx'
import { AppBreadcrumb , AppHelp } from '@/components/app'
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

export const GroupSpeedDial8 = ({ match , isBreadcrumb = true}) => {
  const { serviceProviderId, groupId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [users, setUsers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showSelect, setShowSelect] = useState(false)
  const [hasRun, setHasRun] = useState(false)

  const {
    userSpeedDial8Bulk,
    loadUserSpeedDial8Bulk,
    updateUserSpeedDial8Bulk
  } = useUserSpeedDial8Bulk(serviceProviderId, groupId)

  const columns = [
    { key: 'userId', label: 'User ID' },
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
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
    let isOpen = true
    loadUserSpeedDial8Bulk(serviceProviderId, groupId)
      .then(() => isOpen && setHasRun(true))
      .catch(alertDanger)
    return () => (isOpen = false)
  }, [alertDanger, groupId, loadUserSpeedDial8Bulk, serviceProviderId])

  function edit(row) {
    setForm({
      phoneNumber2: row[2] ? row[2] : '',
      phoneNumber3: row[3] ? row[3] : '',
      phoneNumber4: row[4] ? row[4] : '',
      phoneNumber5: row[5] ? row[5] : '',
      phoneNumber6: row[6] ? row[6] : '',
      phoneNumber7: row[7] ? row[7] : '',
      phoneNumber8: row[8] ? row[8] : '',
      phoneNumber9: row[9] ? row[9] : ''
    })
    setUsers([{ userId: row.userId }])
    setShowModal(true)
  }

  function save() {
    const bulk = {
      serviceProviderId: serviceProviderId,
      groupId: groupId,
      data: {
        speedCodes: [
          { speedCode: '2', phoneNumber: form.phoneNumber2 },
          { speedCode: '3', phoneNumber: form.phoneNumber3 },
          { speedCode: '4', phoneNumber: form.phoneNumber4 },
          { speedCode: '5', phoneNumber: form.phoneNumber5 },
          { speedCode: '6', phoneNumber: form.phoneNumber6 },
          { speedCode: '7', phoneNumber: form.phoneNumber7 },
          { speedCode: '8', phoneNumber: form.phoneNumber8 },
          { speedCode: '9', phoneNumber: form.phoneNumber9 }
        ]
      },
      users
    }
    update(bulk)
  }

  function onSelect(rows) {
    setShowSelect(false)
    setForm({
      phoneNumber2: '',
      phoneNumber3: '',
      phoneNumber4: '',
      phoneNumber5: '',
      phoneNumber6: '',
      phoneNumber7: '',
      phoneNumber8: '',
      phoneNumber9: ''
    })
    if (rows.length === 1) {
      const row = rows[0]
      setForm({
        phoneNumber2: row[2] ? row[2] : '',
        phoneNumber3: row[3] ? row[3] : '',
        phoneNumber4: row[4] ? row[4] : '',
        phoneNumber5: row[5] ? row[5] : '',
        phoneNumber6: row[6] ? row[6] : '',
        phoneNumber7: row[7] ? row[7] : '',
        phoneNumber8: row[8] ? row[8] : '',
        phoneNumber9: row[9] ? row[9] : ''
      })
    }
    if (rows.length > 0) setShowModal(true)
    setUsers(
      rows.map(u => {
        return { userId: u.userId }
      })
    )
  }

  async function update(data) {
    showLoadingModal()
    try {
      await updateUserSpeedDial8Bulk(data)
      alertSuccess('Speed Dial 8 Code Updated')
      setShowModal(false)
    } catch (error) {
      alertDanger(error)
    } finally {
      hideLoadingModal()
    }
  }

  /*
    Map the speedCodes into an object with speedcode as key
  */
  const rows = userSpeedDial8Bulk.map(({ speedCodes = [], ...row }) => {
    for (let i = 2; i < 10; i++) {
      const codeStr = String(i)
      const code = speedCodes.find(s => s.speedCode === codeStr)
      row[codeStr] = code && code.phoneNumber
    }
    return row
  })

  return (
    <> {isBreadcrumb && (
      <AppBreadcrumb>
        <Breadcrumb.Item>Speed Dial 8</Breadcrumb.Item>
      </AppBreadcrumb>
)}
      {rows.length === 0 && !hasRun ? (
        <UiLoadingCard />
      ) : (
        <UiCard
          title="Bulk Speed Dial 8"
          helpModule={<AppHelp module='Speed Dial 8'/>}
          buttons={
            rows.length > 0 && (
              <UiButton
                color="link"
                icon="cogs"
                size="small"
                onClick={() => setShowSelect(!showSelect)}
              />
            )
          }
        >
          <UiDataTable
            columns={columns}
            rows={rows}
            rowKey="userId"
            onClick={edit}
            showSelect={showSelect}
            onSelect={onSelect}
          />
        </UiCard>
      )}
      <UiCardModal
        title={'Edit Speed Codes'}
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
      >
        <form>
          <Column.Group>
            <Column>
              <Field>
                <Control>
                  <UiButton fullwidth static>
                    Speed Code 2
                  </UiButton>
                </Control>
              </Field>
              <Field>
                <Control>
                  <UiButton fullwidth static>
                    Speed Code 3
                  </UiButton>
                </Control>
              </Field>
              <Field>
                <Control>
                  <UiButton fullwidth static>
                    Speed Code 4
                  </UiButton>
                </Control>
              </Field>
              <Field>
                <Control>
                  <UiButton fullwidth static>
                    Speed Code 5
                  </UiButton>
                </Control>
              </Field>
              <Field>
                <Control>
                  <UiButton fullwidth static>
                    Speed Code 6
                  </UiButton>
                </Control>
              </Field>
              <Field>
                <Control>
                  <UiButton fullwidth static>
                    Speed Code 7
                  </UiButton>
                </Control>
              </Field>
              <Field>
                <Control>
                  <UiButton fullwidth static>
                    Speed Code 8
                  </UiButton>
                </Control>
              </Field>
              <Field>
                <Control>
                  <UiButton fullwidth static>
                    Speed Code 9
                  </UiButton>
                </Control>
              </Field>
            </Column>
            <Column>
              <Field>
                <Control>
                  <Input
                    type="text"
                    name="phoneNumber2"
                    value={form.phoneNumber2}
                    onChange={e =>
                      setForm({ ...form, phoneNumber2: e.target.value })
                    }
                    placeholder="Phone Number 2"
                  />
                </Control>
              </Field>
              <Field>
                <Control>
                  <Input
                    type="text"
                    name="phoneNumber3"
                    value={form.phoneNumber3}
                    onChange={e =>
                      setForm({ ...form, phoneNumber3: e.target.value })
                    }
                    placeholder="Phone Number 3"
                  />
                </Control>
              </Field>
              <Field>
                <Control>
                  <Input
                    type="text"
                    name="phoneNumber4"
                    value={form.phoneNumber4}
                    onChange={e =>
                      setForm({ ...form, phoneNumber4: e.target.value })
                    }
                    placeholder="Phone Number 4"
                  />
                </Control>
              </Field>
              <Field>
                <Control>
                  <Input
                    type="text"
                    name="phoneNumber5"
                    value={form.phoneNumber5}
                    onChange={e =>
                      setForm({ ...form, phoneNumber5: e.target.value })
                    }
                    placeholder="Phone Number 5"
                  />
                </Control>
              </Field>
              <Field>
                <Control>
                  <Input
                    type="text"
                    name="phoneNumber6"
                    value={form.phoneNumber6}
                    onChange={e =>
                      setForm({ ...form, phoneNumber6: e.target.value })
                    }
                    placeholder="Phone Number 6"
                  />
                </Control>
              </Field>
              <Field>
                <Control>
                  <Input
                    type="text"
                    name="phoneNumber7"
                    value={form.phoneNumber7}
                    onChange={e =>
                      setForm({ ...form, phoneNumber7: e.target.value })
                    }
                    placeholder="Phone Number 7"
                  />
                </Control>
              </Field>
              <Field>
                <Control>
                  <Input
                    type="text"
                    name="phoneNumber8"
                    value={form.phoneNumber8}
                    onChange={e =>
                      setForm({ ...form, phoneNumber8: e.target.value })
                    }
                    placeholder="Phone Number 8"
                  />
                </Control>
              </Field>
              <Field>
                <Control>
                  <Input
                    type="text"
                    name="phoneNumber9"
                    value={form.phoneNumber9}
                    onChange={e =>
                      setForm({ ...form, phoneNumber9: e.target.value })
                    }
                    placeholder="Phone Number 9"
                  />
                </Control>
              </Field>
            </Column>
          </Column.Group>
        </form>
      </UiCardModal>
    </>
  )
}
GroupSpeedDial8.propTypes = {
  match: PropTypes.object.isRequired,
  isBreadcrumb : PropTypes.bool
}
