import React, { useState, useEffect } from 'react'
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
import apiUserService from '@/api/user-alternate-user-id'

export const UserAlternateUserId2 = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertWarning, alertDanger } = useAlerts()
  const [alternateUserIds, setAlternateUserIds] = React.useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = React.useState({})
  const [showConfirm, setShowConfirm] = useState(false)
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
    Leave the userId blank so we know this is a new
    one.  We will copy newUserId over on save.
  */
  function add() {
    setForm({ newUserId: '', description: '' })
    setShowModal(true)
  }

  /*
    Copy userId to newUserId and edit that so we can
    keep track of this object
  */
  function edit(row) {
    setForm({ ...row, newUserId: row.userId })
    setShowModal(true)
  }

  /*
    Still need to call the API
  */
  function remove() {
    setShowConfirm(false)
    const newIds = alternateUserIds.filter(
      altId => altId.userId !== form.userId
    )
    setAlternateUserIds(newIds)
    alertWarning('Alternate User ID Removed')
    setShowModal(false)
  }

  /*
    Check for duplicates first.
    If this is a new altId, then append to the existing array
    If this is existing, then update with the new data
  */
  function save() {
    // check for dups
    if (form.newUserId !== form.userId) {
      const match = alternateUserIds.filter(altId => {
        return altId.userId.toLowerCase() === form.newUserId.toLowerCase()
      })
      if (match.length > 0) return alertWarning('This User ID already exists')
    }

    // update
    const newAltId = { userId: form.newUserId, description: form.description }
    if (form.userId) {
      const newAltIds = alternateUserIds.map(altId => {
        return altId.userId !== form.userId ? altId : newAltId
      })
      setAlternateUserIds(newAltIds)
    } else {
      setAlternateUserIds([...alternateUserIds, newAltId])
    }

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
              <UiButton
                color="info"
                icon="add"
                size="small"
                onClick={add}
                disabled={alternateUserIds.length > 3}
              />
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
            onDelete={form.userId ? () => setShowConfirm(true) : null}
          >
            <form style={{ marginBottom: '1rem' }}>
              <Column.Group>
                <Column>
                  <Field>
                    <Label>User ID</Label>
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
                    <Label>Description</Label>
                    <Control>
                      <Input
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={e =>
                          setForm({ ...form, description: e.target.value })
                        }
                        placeholder="description"
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
              Are you sure you want to Remove this Alternate User Id?
            </blockquote>
          </UiCardModal>
        </>
      )}
    </>
  )
}
UserAlternateUserId2.propTypes = {
  match: PropTypes.object.isRequired
}
