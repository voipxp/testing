import React, { useState, useEffect } from 'react'
import apiUserService from '@/api/user-alternate-user-id'
import { useUi } from '@/store/ui'
import PropTypes from 'prop-types'
import { Field, Input, Column, Control, Label } from 'rbx'
import { useAlerts } from '@/store/alerts'
import { useAcl } from '@/utils'
import {
  UiCard,
  UiLoadingCard,
  UiDataTable,
  UiButton,
  UiCardModal
} from '@/components/ui'

export const UserAlternateUserId = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertWarning, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [alternateUserIds, setAlternateUserIds] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({})
  const [showConfirm, setShowConfirm] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [disabledAdd, setDisabledAdd] = useState(false)
  const acl = useAcl()
  const hasReseller = acl.hasReseller()

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
        if (alternateUserIds.length > 3) {
          setDisabledAdd(true)
        } else {
          setDisabledAdd(false)
        }
        if (!hasReseller) {
          setDisabledAdd(true)
        }
      } catch (error) {
        alertDanger(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [alertDanger, alternateUserIds.length, hasReseller, userId])

  /*
    Leave the userId blank so we know this is a new
    one.  We will copy newUserId over on save.
  */
  function add() {
    setForm({ newUserId: '', description: '' })
    setShowModal(true)
  }

  /*
    Copy userId to newUserId for editing that so we can
    keep track of this object
  */
  function edit(row) {
    if (!disabledAdd) {
      setForm({ ...row, newUserId: row.userId })
      setShowModal(true)
    }
  }

  /*
    Remove the current selected altId
  */
  function remove() {
    setShowConfirm(false)
    const newAltIds = alternateUserIds.filter(
      altId => altId.userId !== form.userId
    )
    // TODO: send to API
    saveAlternateUserIds(newAltIds)
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
    const newAltIds = form.userId
      ? alternateUserIds.map(altId =>
          altId.userId !== form.userId ? altId : newAltId
        )
      : [...alternateUserIds, newAltId]

    // TODO: send to API
    saveAlternateUserIds(newAltIds)
  }

  async function saveAlternateUserIds(newAltIds) {
    showLoadingModal()
    try {
      const data = await apiUserService.update({
        userId: userId,
        users: newAltIds
      })
      alertSuccess('Alternate User IDs Updated')
      setAlternateUserIds(data.users)
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
            title="Alternate User IDs"
            buttons={
              <UiButton
                color="link"
                icon="add"
                size="small"
                onClick={add}
                // disabled={alternateUserIds.length > 3}
                disabled={disabledAdd}
              />
            }
          >
            <UiDataTable
              columns={columns}
              rows={alternateUserIds}
              rowKey="userId"
              hideSearch={true}
              onClick={edit}
              showSelect={disabledAdd}
            />
          </UiCard>
          <UiCardModal
            title="Alternate User IDs"
            isOpen={showModal}
            onCancel={() => setShowModal(false)}
            onSave={save}
            onDelete={form.userId ? () => setShowConfirm(true) : null}
          >
            <form>
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
UserAlternateUserId.propTypes = {
  match: PropTypes.object.isRequired
}
