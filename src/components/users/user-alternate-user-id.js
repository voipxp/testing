import React, { useState } from 'react'
import apiUserService from '@/api/user-alternate-user-id'
import PropTypes from 'prop-types'
import { Field, Input, Column, Control, Label } from 'rbx'
import { useAcl } from '@/utils'
import { useAlert, useUser, useLoadingModal } from '@/graphql'
import { UiCard, UiLoadingCard, UiDataTable, UiButton, UiCardModal } from '@/components/ui'

export const UserAlternateUserId = ({ match }) => {
  const Alert = useAlert()
  const Loading = useLoadingModal()
  const { userId } = match.params
  const { data, loading, error } = useUser(userId)
  const [form, setForm] = useState({})
  const [showConfirm, setShowConfirm] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const acl = useAcl()
  const hasReseller = acl.hasReseller()

  if (loading || !data) return <UiLoadingCard />
  if (error) Alert.danger(error)

  const { alternateUserIds = [] } = data.user

  const columns = [
    { key: 'alternateUserId', label: 'Alternate User Id' },
    { key: 'description', label: 'Description' }
  ]

  /*
    Leave the userId blank so we know this is a new
    one.  We will copy newUserId over on save.
  */
  function add() {
    setForm({ alternateUserId: '', description: '' })
    setShowModal(true)
  }

  /*
    Copy userId to newUserId for editing that so we can
    keep track of this object
  */
  function edit(row) {
    setForm({ ...row })
    setShowModal(true)
  }

  /*
    Remove the current selected altId
  */
  function remove() {
    setShowConfirm(false)
    const newAltIds = data.user.alternateUserIds.filter(altId => altId.userId !== form.userId)
    // TODO [2019-10-01]: send to API
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
      const match = data.user.alternateUserIds.filter(altId => {
        return altId.userId.toLowerCase() === form.newUserId.toLowerCase()
      })
      if (match.length > 0) return Alert.warning('This User ID already exists')
    }

    // update
    const newAltId = { userId: form.newUserId, description: form.description }
    const newAltIds = form.userId
      ? data.user.alternateUserIds.map(altId => (altId.userId !== form.userId ? altId : newAltId))
      : [...data.user.alternateUserIds, newAltId]

    // TODO [2019-10-01]: send to API
    saveAlternateUserIds(newAltIds)
  }

  async function saveAlternateUserIds(newAltIds) {
    Loading.show()
    try {
      await apiUserService.update({
        userId: userId,
        users: newAltIds
      })
      Alert.success('Alternate User IDs Updated')
      setShowModal(false)
    } catch (error_) {
      Alert.danger(error_)
      setShowModal(true)
    } finally {
      Loading.hide()
    }
  }

  return (
    <>
      <UiCard
        title="Alternate User IDs"
        buttons={
          alternateUserIds.length < 3 &&
          hasReseller && <UiButton color="link" icon="add" size="small" onClick={add} />
        }
      >
        <UiDataTable
          columns={columns}
          rows={alternateUserIds}
          rowKey="alternateUserId"
          hideSearch={true}
          onClick={edit}
        />
      </UiCard>

      <UiCardModal
        title="Alternate User IDs"
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
        onDelete={form.alternateUserId ? () => setShowConfirm(true) : null}
      >
        <form>
          <Column.Group>
            <Column>
              <Field>
                <Label>Alternate ID</Label>
                <Control>
                  <Input
                    type="text"
                    name="alternateUserId"
                    value={form.alternateUserId}
                    onChange={e => setForm({ ...form, alternateUserId: e.target.value })}
                    placeholder="Alternate ID"
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
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    placeholder="Description"
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
        <blockquote>Are you sure you want to Remove this Alternate User Id?</blockquote>
      </UiCardModal>
    </>
  )
}
UserAlternateUserId.propTypes = {
  match: PropTypes.object.isRequired
}
