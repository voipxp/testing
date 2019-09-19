import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'rbx'
import { useAlert, useForm, generatePassword } from '@/utils'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  useLoadingModal,
  RESELLER_ADMIN_LIST_QUERY,
  RESELLER_ADMIN_CREATE_MUTATION,
  RESELLER_ADMIN_UPDATE_MUTATION,
  RESELLER_ADMIN_DELETE_MUTATION
} from '@/graphql'
import {
  UiCard,
  UiLoadingCard,
  UiDataTable,
  UiButton,
  UiCardModal,
  UiFormField,
  UiInputPassword
} from '@/components/ui'

export const ResellerAdmins = ({ match }) => {
  const Alert = useAlert()
  const Loading = useLoadingModal()
  const { resellerId } = match.params

  // form
  const ref = useRef()
  const initialForm = { userId: '', password: '', lastName: '', firstName: '' }
  const { form, setForm, onChange, isValid } = useForm(initialForm, ref)

  // modal
  const [showConfirm, setShowConfirm] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // graphql
  const variables = { resellerId }
  const refetchQueries = [{ query: RESELLER_ADMIN_LIST_QUERY, variables }]
  const [updateAdmin] = useMutation(RESELLER_ADMIN_UPDATE_MUTATION)
  const [createAdmin] = useMutation(RESELLER_ADMIN_CREATE_MUTATION, { refetchQueries })
  const [deleteAdmin] = useMutation(RESELLER_ADMIN_DELETE_MUTATION, { refetchQueries })
  const { data, loading, error } = useQuery(RESELLER_ADMIN_LIST_QUERY, { variables })

  if (error) Alert.danger(error)
  if (!data && loading) return <UiLoadingCard />

  const { resellerAdmins } = data

  const columns = [
    { key: 'userId', label: 'User Id' },
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' }
  ]

  function edit(row) {
    setForm({ ...row, password: '' })
    setShowModal(true)
  }

  function remove() {
    setShowConfirm(false)
    destroy(form.userId)
  }

  function add() {
    setForm(initialForm)
    setShowModal(true)
  }

  function save() {
    form.resellerId ? update(form) : create(form)
  }

  async function create(admin) {
    Loading.show()
    const input = { ...admin, resellerId }
    try {
      await createAdmin({ variables: { input } })
      Alert.success('Admin Updated')
      setShowModal(false)
    } catch (error_) {
      Alert.danger(error_)
      setShowModal(true)
    } finally {
      Loading.hide()
    }
  }

  async function update(admin) {
    // strip resellerId not in schema
    const { resellerId, ...input } = admin
    Loading.show()
    try {
      await updateAdmin({ variables: { input } })
      Alert.success('Admin Updated')
      setShowModal(false)
    } catch (error_) {
      Alert.danger(error_)
      setShowModal(true)
    } finally {
      Loading.hide()
    }
  }

  async function destroy(userId) {
    Loading.show()
    try {
      await deleteAdmin({ variables: { userId } })
      Alert.success('Admin Deleted')
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
        title="Reseller Admins"
        buttons={<UiButton color="link" icon="add" size="small" onClick={add} />}
      >
        <UiDataTable
          columns={columns}
          rows={resellerAdmins}
          rowKey="userId"
          hideSearch={true}
          onClick={edit}
        />
      </UiCard>
      <UiCardModal
        title={form.resellerId ? `Edit ${form.userId}` : 'New Admin'}
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
        onDelete={form.resellerId ? () => setShowConfirm(true) : null}
        saveDisabled={!isValid}
      >
        <form ref={ref}>
          <UiFormField label="User ID" horizontal>
            <Input
              type="text"
              name="userId"
              value={form.userId}
              onChange={onChange}
              placeholder="User ID"
              required
              disabled={form.resellerId}
            />
          </UiFormField>
          <UiFormField label="First Name" horizontal>
            <Input
              type="text"
              name="firstName"
              value={form.firstName || ''}
              onChange={onChange}
              placeholder="First Name"
            />
          </UiFormField>
          <UiFormField label="Last Name" horizontal>
            <Input
              type="text"
              name="lastName"
              value={form.lastName || ''}
              onChange={onChange}
              placeholder="Last Name"
            />
          </UiFormField>
          <UiFormField label="Password" horizontal>
            <UiInputPassword
              name="password"
              value={form.password || ''}
              onChange={onChange}
              onGeneratePassword={generatePassword}
              required={!form.resellerId}
            />
          </UiFormField>
        </form>
      </UiCardModal>
      <UiCardModal
        title="Please Confirm"
        isOpen={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onDelete={remove}
        saveDisabled={!isValid}
      >
        <blockquote>Are you sure you want to Remove this Reseller Admin User Id?</blockquote>
      </UiCardModal>
    </>
  )
}
ResellerAdmins.propTypes = {
  match: PropTypes.object.isRequired
}
