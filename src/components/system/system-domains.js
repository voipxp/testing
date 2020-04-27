import React, { useState } from 'react'
//import apiResellerAdmins from '@/api/reseller-admins'
import apiGroupDomain from '@/api/system/domains'
import { useUi } from '@/store/ui'
import PropTypes from 'prop-types'
import { Input , Breadcrumb } from 'rbx'
import { useAsync } from 'react-async-hook'
import { useAlerts } from '@/store/alerts'
import { orderBy } from 'natural-orderby'
import { AppBreadcrumb } from '@/components/app'
import {
  UiButton,
  UiCard,
  UiCardModal,
  UiDataTable,
  UiFormField,
  UiLoadingCard
} from '@/components/ui'
import { useSession } from '@/store/session'
import { Redirect } from 'react-router-dom'

export const SystemDomains = ({ match }) => {
  const initialForm = {
    isCreate: true, 
    domain: ''
  }
  const { session, clearSession } = useSession()
  //const { resellerId } = match.params
  const { alertSuccess, alertDanger, alertWarning } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState(initialForm)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const domainNames = []
  const { result, error, loading, execute } = useAsync(
    () => apiGroupDomain.load(),
    []
  )
  const domainsResult = (result && result.domains) || []

  const sortedValues = orderBy(
    domainsResult,
    shortedValue => shortedValue
  )
  // eslint-disable-next-line array-callback-return
  sortedValues.map(function(el) {
    domainNames.push({
      "domain": el
    })
  })

  if (error) alertDanger(error)
  if (loading) return <UiLoadingCard />

  const columns = [
    { key: 'domain', label: 'Domain Name' }
  ]

  function handleInput(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setForm({ ...form, [name]: value })
  }

  function edit(row) {
    setForm({...row})
    setShowConfirm(true)
  }

  function remove() { 
    setShowConfirm(false)
    destroy(form)
  }

  function add() {
    setForm({ ...initialForm })
    setShowModal(true)
  }

  function save() {
      create(form) 
  }

  async function create(domain) {
    showLoadingModal()
    try {
      await apiGroupDomain.create(domain)
      alertSuccess('Domain Created')
      setShowModal(false)
      hideLoadingModal()
      await execute()
    } catch (error_) {
      alertDanger(error_)
      hideLoadingModal()
    }
  } 

  async function destroy(domain) {
    showLoadingModal()
    try {
      await apiGroupDomain.destroy(form)
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
    <AppBreadcrumb>
        <Breadcrumb.Item>Domains</Breadcrumb.Item>
      </AppBreadcrumb>
      <UiCard
        title="Domains"
        buttons={
          <UiButton color="link" icon="add" size="small" onClick={add} />
        }
      >
        <UiDataTable
          columns={columns}
          rows={domainNames}
          rowKey="domain"
          hideSearch={false}
          onClick={edit}
        />
      </UiCard>
      <UiCardModal
        title={form.isCreate ? 'New Domain ' : ''}
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
        onDelete={form.isCreate ? null : () => setShowConfirm(true)}
      >
        <form>
          {form.isCreate && (
            <UiFormField label="Domain Name" horizontal>
              <Input
                type="text"
                name="domain"
                value={form.domain}
                onChange={handleInput}
                placeholder="Domain Name"
              />
            </UiFormField>
          )}
           
        </form>
      </UiCardModal>
      <UiCardModal
        title="Please Confirm"
        isOpen={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onDelete={remove}
      >
       <blockquote>
              Are you sure you want to Remove this Domain{' '}
              {form.domain} ?
            </blockquote>
      </UiCardModal>
    </>
  )
}
SystemDomains.propTypes = {
  match: PropTypes.object.isRequired
}
