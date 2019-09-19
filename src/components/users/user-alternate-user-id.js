import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Field, Input, Column, Control, Label } from 'rbx'
import { useAcl, useAlert, useForm } from '@/utils'
import { useUser, useUserUpdate, useLoadingModal } from '@/graphql'
import { UiCard, UiLoadingCard, UiDataTable, UiButton, UiCardModal } from '@/components/ui'

export const UserAlternateUserId = ({ match }) => {
  const Alert = useAlert()
  const Loading = useLoadingModal()
  const { userId } = match.params

  const { data, loading, error } = useUser(userId)
  const [update] = useUserUpdate()

  const formRef = React.useRef()
  const initialFormState = { alternateUserId: '', description: '' }
  const { form, setForm, onChange, isValid } = useForm(initialFormState, formRef)

  const [showConfirm, setShowConfirm] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const acl = useAcl()
  const hasReseller = acl.hasReseller()

  if (loading || !data) return <UiLoadingCard />
  if (error) Alert.danger(error)

  const { alternateUserIds = [] } = data

  const columns = [
    { key: 'alternateUserId', label: 'Alternate User Id' },
    { key: 'description', label: 'Description' }
  ]

  function add() {
    setForm(initialFormState)
    setShowModal(true)
  }

  function edit(row) {
    setForm({ ...row })
    setShowModal(true)
  }

  function remove() {
    setShowConfirm(false)
    const altIds = alternateUserIds.filter(alt => alt.alternateUserId !== form.alternateUserId)
    saveUser(altIds)
  }

  function save() {
    const { alternateUserId } = form

    // check same as userId
    if (userId === alternateUserId) {
      return Alert.warning('Alternate ID cannot be the same as the User ID')
    }

    // check if alternateId exists already
    const match = alternateUserIds.filter(
      alt => alt.alternateUserId.toLowerCase() === alternateUserId.toLowerCase()
    )

    const altIds =
      match.length === 0
        ? [...alternateUserIds, form]
        : alternateUserIds.map(alt => (alt.alternateUserId === form.alternateUserId ? form : alt))

    saveUser(altIds)
  }

  async function saveUser(alternateUserIds) {
    Loading.show()
    try {
      await update({ variables: { input: { userId, alternateUserIds } } })
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
          alternateUserIds.length < 4 &&
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
        saveDisabled={!isValid}
        onCancel={() => setShowModal(false)}
        onSave={save}
        onDelete={form.alternateUserId ? () => setShowConfirm(true) : null}
      >
        <form ref={formRef}>
          <Column.Group>
            <Column>
              <Field>
                <Label>Alternate ID</Label>
                <Control>
                  <Input
                    type="text"
                    name="alternateUserId"
                    value={form.alternateUserId}
                    onChange={onChange}
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
                    value={form.description || ''}
                    onChange={onChange}
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
