import React, { useState, useRef } from 'react'
import omit from 'lodash/omit'
import {
  useResellerAdmins,
  useResellerAdminCreate,
  useResellerAdminUpdate,
  useResellerAdminDelete
} from '@/graphql'
import PropTypes from 'prop-types'
import { Input } from 'rbx'
import { Alert, Loading, useForm } from '@/utils'
import {
  UiCard,
  UiLoadingCard,
  UiDataTable,
  UiButton,
  UiCardModal,
  UiFormField,
  UiInputPassword
} from '@/components/ui'
import { generatePassword } from '@/utils'

export const ResellerAdmins = ({ match }) => {
  const initialForm = {
    isCreate: true,
    userId: '',
    language: '',
    password: '',
    lastName: '',
    firstName: ''
  }
  const { resellerId } = match.params
  const ref = useRef()
  const { form, setForm, onChange, isValid } = useForm(initialForm, ref)

  const [showConfirm, setShowConfirm] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const { data, loading, error } = useResellerAdmins(resellerId)
  const [createAdmin] = useResellerAdminCreate(resellerId)
  const [updateAdmin] = useResellerAdminUpdate()
  const [deleteAdmin] = useResellerAdminDelete(resellerId)

  if (error) Alert.danger(error)
  if (!data && loading) return <UiLoadingCard />

  const columns = [
    { key: 'userId', label: 'User Id' },
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' }
  ]

  function edit(row) {
    setForm({ ...row, password: '', isCreate: false })
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
    form.isCreate ? create(form) : update(form)
  }

  async function create(admin) {
    Loading.show()
    try {
      await createAdmin({ ...omit(admin, ['isCreate']), resellerId })
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
    Loading.show()
    try {
      await updateAdmin(omit(admin, ['isCreate', 'resellerId']))
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
      await deleteAdmin(userId)
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
          rows={data}
          rowKey="userId"
          hideSearch={true}
          onClick={edit}
        />
      </UiCard>
      <UiCardModal
        title={form.isCreate ? 'New Admin' : `Edit ${form.userId}`}
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
        onDelete={form.isCreate ? null : () => setShowConfirm(true)}
        saveDisabled={!isValid}
      >
        <form ref={ref}>
          {form.isCreate && (
            <UiFormField label="User ID" horizontal>
              <Input
                type="text"
                name="userId"
                value={form.userId}
                onChange={onChange}
                placeholder="User ID"
                required
              />
            </UiFormField>
          )}
          <UiFormField label="First Name" horizontal>
            <Input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={onChange}
              placeholder="First Name"
            />
          </UiFormField>
          <UiFormField label="Last Name" horizontal>
            <Input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={onChange}
              placeholder="Last Name"
            />
          </UiFormField>
          <UiFormField label="Password" horizontal>
            <UiInputPassword
              name="password"
              value={form.password}
              onChange={onChange}
              onGeneratePassword={generatePassword}
              required={!!form.isCreate}
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
