import React, { useState } from 'react'
import apiResellerAdmins from '@/api/reseller-admins'
import { useUi } from '@/store/ui'
import PropTypes from 'prop-types'
import { Input } from 'rbx'
import { useAsync } from 'react-async-hook'
import { useAlerts } from '@/store/alerts'
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
import { useSession } from '@/store/session'
import { Redirect } from 'react-router-dom'

export const ResellerAdmins = ({ match }) => {
  const initialForm = {
    isCreate: true,
    userId: '',
    password: '',
    lastName: '',
    firstName: ''
  }
  const { session, clearSession } = useSession()
  const { resellerId } = match.params
  const { alertSuccess, alertDanger, alertWarning } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState(initialForm)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const { result, error, loading, execute } = useAsync(
    () => apiResellerAdmins.list(resellerId),
    [resellerId]
  )
  const admins = (result && result.resellers) || []

  if (error) alertDanger(error)
  if (loading) return <UiLoadingCard />

  const columns = [
    { key: 'administratorID', label: 'User Id' },
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' }
  ]

  function handleInput(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setForm({ ...form, [name]: value })
  }

  function edit(row) {
    setForm({
      ...row,
      resellerId,
      userId: row.administratorID,
      password: '',
      isCreate: false
    })
    setShowModal(true)
  }

  function remove() {
    setShowConfirm(false)
    destroy(form.userId)
  }

  function add() {
    setForm({ ...initialForm, resellerId })
    setShowModal(true)
  }

  function save() {
    form.isCreate ? create(form) : update(form)
  }

  async function create(admin) {
    showLoadingModal()
    try {
      await apiResellerAdmins.create(admin)
      alertSuccess('Admin Created')
      setShowModal(false)
      hideLoadingModal()
      await execute()
    } catch (error_) {
      alertDanger(error_)
      hideLoadingModal()
    }
  }

  async function update(admin) {
    showLoadingModal()
    try {
      await apiResellerAdmins.update(admin)
      alertSuccess('Admin Updated')
      if( admin.administratorID === session.userId && (admin.password && admin.password !== '') ) {
        logout()    /* Force to logout if password has changed. */
      }
      setShowModal(false)
      hideLoadingModal()
      await execute()
    } catch (error_) {
      alertDanger(error_)
      hideLoadingModal()
    }
  }

  async function destroy(userId) {
    showLoadingModal()
    try {
      await apiResellerAdmins.destroy(userId)
      alertWarning('Admin Deleted')
      setShowModal(false)
      hideLoadingModal()
      await execute()
    } catch (error_) {
      alertDanger(error_)
      hideLoadingModal()
    }
  }

  const logout = () => {
    clearSession()
    return <Redirect to='/' />
  }

  return (
    <>
      <UiCard
        title="Reseller Admins"
        buttons={
          <UiButton color="link" icon="add" size="small" onClick={add} />
        }
      >
        <UiDataTable
          columns={columns}
          rows={admins}
          rowKey="administratorID"
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
      >
        <form>
          {form.isCreate && (
            <UiFormField label="User ID" horizontal>
              <Input
                type="text"
                name="userId"
                value={form.userId}
                onChange={handleInput}
                placeholder="User ID"
              />
            </UiFormField>
          )}
          <UiFormField label="First Name" horizontal>
            <Input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleInput}
              placeholder="First Name"
            />
          </UiFormField>
          <UiFormField label="Last Name" horizontal>
            <Input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleInput}
              placeholder="Last Name"
            />
          </UiFormField>
          <UiFormField label="Password" horizontal>
            <UiInputPassword
              name="password"
              value={form.password}
              onChange={handleInput}
              onGeneratePassword={generatePassword}
            />
          </UiFormField>
        </form>
      </UiCardModal>
      <UiCardModal
        title="Please Confirm"
        isOpen={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onDelete={remove}
      >
        <blockquote>
          Are you sure you want to Remove this Reseller Admin User Id?
        </blockquote>
      </UiCardModal>
    </>
  )
}
ResellerAdmins.propTypes = {
  match: PropTypes.object.isRequired
}
