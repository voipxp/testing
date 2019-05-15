import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Field, Input, Column, Control } from 'rbx'
import { useAlerts } from '@/store/alerts'
import {
  UiCard,
  UiLoadingCard,
  UiDataTable,
  UiButton,
  UiCardModal
} from '@/components/ui'
import apiUserService from '@/api/user-alternate-user-id'
export const UserAlternateUserId = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const [alternateUserIds, setAlternateUserIds] = React.useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = React.useState([])
  const [showModal, setShowModal] = useState(false)

  const columns = [
    { key: 'userId', label: 'Alternate User Id' },
    { key: 'description', label: 'Description' }
  ]

  /*
    Load the alternate Ids, alert on error
  */
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const data = await apiUserService.show(userId)
        setAlternateUserIds(data.users)
      } catch (error) {
        alertDanger(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [alertDanger, userId])

  /*
    Create a copy of the original list
    Create a copy of the new object and update the attribute
    Set the new form data which will update the input fields
  */
  function handleInput(index, attribute, value) {
    const editForm = form.slice(0)
    const newObj = { ...editForm[index], [attribute]: value }
    editForm[index] = newObj
    setForm(editForm)
  }

  /*
    Create an array of alternateUserIds with a length of 4
    Make a copy so we aren't modifying the original data
    in the edit screen
  */
  function edit() {
    setShowModal(true)
    const editForm = []
    for (let i = 0; i < 4; i++) {
      const altId = alternateUserIds[i] || { userId: '', description: '' }
      editForm.push({ ...altId })
    }
    setForm(editForm)
  }

  /*
    Filter out any alternate ids that had the userId removed
  */
  function save() {
    const newIds = form.filter(alternateId => alternateId.userId)
    setAlternateUserIds(newIds)
    alertSuccess('Alternate User IDs Updated')
    setShowModal(false)
  }

  return (
    <>
      {loading ? (
        <UiLoadingCard />
      ) : (
        <>
          <UiCard
            title="Alternate User IDs"
            buttons={
              <UiButton color="link" icon="edit" size="small" onClick={edit} />
            }
          >
            <UiDataTable
              columns={columns}
              rows={alternateUserIds}
              rowKey="userId"
              hideSearch={true}
              onClick={edit}
            />
          </UiCard>
          <UiCardModal
            title="Alternate User IDs"
            isOpen={showModal}
            onCancel={() => setShowModal(false)}
            onSave={save}
          >
            <form style={{ marginBottom: '1rem' }}>
              {form.map((alternateId, index) => (
                <Column.Group key={index}>
                  <Column size="one-quarter">
                    <Field>
                      <Control>
                        <UiButton static fullwidth>
                          Alternate ID {index + 1}
                        </UiButton>
                      </Control>
                    </Field>
                  </Column>
                  <Column>
                    <Field>
                      <Control>
                        <Input
                          type="text"
                          name="userId"
                          value={alternateId.userId}
                          onChange={e =>
                            handleInput(index, 'userId', e.target.value)
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
                          name="description"
                          value={alternateId.description}
                          onChange={e =>
                            handleInput(index, 'description', e.target.value)
                          }
                          placeholder="description"
                        />
                      </Control>
                    </Field>
                  </Column>
                </Column.Group>
              ))}
            </form>
          </UiCardModal>
        </>
      )}
    </>
  )
}
UserAlternateUserId.propTypes = {
  match: PropTypes.object.isRequired
}
