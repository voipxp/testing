import React, { useState, useEffect } from 'react'
import apiResellerAdmins from '@/api/reseller-admins'
import { useUi } from '@/store/ui'
import PropTypes from 'prop-types'
import { Input } from 'rbx'
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

export const ResellerAdmins = ({ match }) => {
  const { resellerId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [resellerAdmins, setResellerAdmins] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({})
  const [showConfirm, setShowConfirm] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showDisabled, setDisabled] = useState('')

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
        console.log('data', data)
        setResellerAdmins(data.resellers)
      } catch (error) {
        alertDanger(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [alertDanger, resellerId])

  function edit(row) {
    setDisabled('disabled')
    setForm({ ...row, userId: row.administratorID, password: '' })
    setShowModal(true)
  }

  function remove() {
    setShowConfirm(false)
    destroy(form.userId)
  }

  function add() {
    setForm({
      userId: '',
      language: '',
      password: '',
      lastName: '',
      firstName: ''
    })
    setDisabled('')
    setShowModal(true)
  }

  function save() {
    if (showDisabled === 'disabled') update(form)
    else create(form)
  }

  async function create(admin) {
    showLoadingModal()
    try {
      await apiResellerAdmins.create(admin)
      const data = await apiResellerAdmins.list(resellerId)
      setResellerAdmins(data.resellers)
      alertSuccess('Admin Updated')
      setShowModal(false)
    } catch (error) {
      alertDanger(error)
      setShowModal(true)
    } finally {
      setLoading(false)
      hideLoadingModal()
    }
  }

  async function update(admin) {
    showLoadingModal()
    try {
      await apiResellerAdmins.update(admin)
      const data = await apiResellerAdmins.list(resellerId)
      setResellerAdmins(data.resellers)
      alertSuccess('Admin Updated')
      setShowModal(false)
    } catch (error) {
      alertDanger(error)
      setShowModal(true)
    } finally {
      setLoading(false)
      hideLoadingModal()
    }
  }

  async function destroy(userId) {
    showLoadingModal()
    try {
      await apiResellerAdmins.destroy(userId)
      const data = await apiResellerAdmins.list(resellerId)
      setResellerAdmins(data.resellers)
      alertSuccess('Admin Deleted')
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
            title="Reseller Admins"
            buttons={
              <UiButton color="link" icon="add" size="small" onClick={add} />
            }
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
            title={`Edit ${form.userId}`}
            isOpen={showModal}
            onCancel={() => setShowModal(false)}
            onSave={save}
            onDelete={form.resellerId ? () => setShowConfirm(true) : null}
          >
            <form>
              <UiFormField label="First Name" horizontal>
                <Input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleInput}
                  placeholder="firstName"
                />
              </UiFormField>
              <UiFormField label="Last Name" horizontal>
                <Input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleInput}
                  placeholder="lastName"
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
      )}
    </>
  )
}
ResellerAdmins.propTypes = {
  match: PropTypes.object.isRequired
}