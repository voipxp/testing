import React, { useState, useEffect } from 'react'
import apiResellerAdmins from '@/api/reseller-admins'
import PropTypes from 'prop-types'
import { Input } from 'rbx'
import { Alert, Loading } from '@/utils'
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
  const [resellerAdmins, setResellerAdmins] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(initialForm)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showModal, setShowModal] = useState(false)

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

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const data = await apiResellerAdmins.list(resellerId)
        setResellerAdmins(data.resellers)
      } catch (error) {
        Alert.danger(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [resellerId])

  function edit(row) {
    setForm({
      ...row,
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
    setForm(initialForm)
    setShowModal(true)
  }

  function save() {
    form.isCreate ? create(form) : update(form)
  }

  async function create(admin) {
    Loading.show()
    try {
      await apiResellerAdmins.create(admin)
      const data = await apiResellerAdmins.list(resellerId)
      setResellerAdmins(data.resellers)
      Alert.success('Admin Updated')
      setShowModal(false)
    } catch (error) {
      Alert.danger(error)
      setShowModal(true)
    } finally {
      setLoading(false)
      Loading.hide()
    }
  }

  async function update(admin) {
    Loading.show()
    try {
      await apiResellerAdmins.update(admin)
      const data = await apiResellerAdmins.list(resellerId)
      setResellerAdmins(data.resellers)
      Alert.success('Admin Updated')
      setShowModal(false)
    } catch (error) {
      Alert.danger(error)
      setShowModal(true)
    } finally {
      setLoading(false)
      Loading.hide()
    }
  }

  async function destroy(userId) {
    Loading.show()
    try {
      await apiResellerAdmins.destroy(userId)
      const data = await apiResellerAdmins.list(resellerId)
      setResellerAdmins(data.resellers)
      Alert.success('Admin Deleted')
      setShowModal(false)
    } catch (error) {
      Alert.danger(error)
      setShowModal(true)
    } finally {
      setLoading(false)
      Loading.hide()
    }
  }

  return (
    <>
      {loading ? (
        <UiLoadingCard />
      ) : (
        <>
          <UiCard
            title="Reseller Admins"
            buttons={<UiButton color="link" icon="add" size="small" onClick={add} />}
          >
            <UiDataTable
              columns={columns}
              rows={resellerAdmins}
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
                    name="firstName"
                    value={form.firstName}
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
            <blockquote>Are you sure you want to Remove this Reseller Admin User Id?</blockquote>
          </UiCardModal>
        </>
      )}
    </>
  )
}
ResellerAdmins.propTypes = {
  match: PropTypes.object.isRequired
}
