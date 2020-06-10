import React, { useState } from 'react'
import apiSystemDomain from '@/api/system/system-domain-service'
import { useUi } from '@/store/ui'
import PropTypes from 'prop-types'
import { Input , Breadcrumb } from 'rbx'
import { useAsync } from 'react-async-hook'
import { useAlerts } from '@/store/alerts'
import { orderBy } from 'natural-orderby'
import { AppBreadcrumb } from '@/components/app'
import _ from 'lodash'
import {
  UiButton,
  UiCard,
  UiCardModal,
  UiDataTable,
  UiFormField,
  UiLoadingCard,
  UiListItem
} from '@/components/ui'

export const SystemDomains = ({ match , isBreadcrumb = true }) => {
  const initialForm = {
    isCreate: true, 
    domain: [],
  }  
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState(initialForm)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [delDomains, setDelDomains] = useState([])
  const [showSelect, setShowSelect] = React.useState(false)
  const toggle = () => setShowSelect(!showSelect)
  
  const domainNames = []
  const { result, error, loading, execute } = useAsync(
    () => apiSystemDomain.load(),
    []
  )
  const domainsResult = (result && result.domains) || []
  const defaultDomain  = (result && result.default)
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

  function remove() { 
    setShowConfirm(false)
    destroy(form)
  }

  function add() {
    setForm({ ...initialForm })
    setShowModal(true)
  }

  function save() {
    const domains = form.domain
    const domainsAdd = [];
    domainsAdd.push(domains)
    const initialFormAdd = { 
      domains: domainsAdd,
    } 
      create(initialFormAdd) 
  }

  function deleteDomains() {
    setShowSelect(true)
}
 
async function create(domain) { 
   showLoadingModal()
    try {
      await apiSystemDomain.create(domain)
      alertSuccess('Domain Created')
      setShowModal(false)
      hideLoadingModal()
      await execute()
    } catch (error_) {
      alertDanger(error_)
      hideLoadingModal()
    }
  } 

  async function destroy() {  
    showLoadingModal()
    try {
      await apiSystemDomain.destroy(
        delDomains
      )
	    alertSuccess('Domains Deleted')
      setShowModal(false)
      hideLoadingModal()
      await execute()
    } catch (error_) {
      alertDanger(error_)
      hideLoadingModal()
    }
  }
 
  const stemDeleteDomain = row => { 
    if( row.length>0 ){
      const delDomainArr = [];
      _.forEach(row, function(value) {
        delDomainArr.push(value.domain)
      });
      setDelDomains(delDomainArr)
      setShowConfirm(true)
    }
  }
  return (
    <>
		{(isBreadcrumb &&
		<AppBreadcrumb>
			<Breadcrumb.Item>Domains</Breadcrumb.Item>
		</AppBreadcrumb>
	  )}
      <UiCard
        title="Domains"
        buttons={
          <>
          <UiButton color="link" icon="add" size="small" onClick={add} />
          <UiButton 
          color="link"
          icon="cogs" 
          size="small"
          onClick={deleteDomains} />
          </>
        }
      >
        <UiListItem label="Default Domain">
          {defaultDomain}
        </UiListItem>

        <UiDataTable
          columns={columns}
          rows={domainNames}
          rowKey="domain"
          hideSearch={false} 
          pageSize={25}
          showSelect ={ showSelect }
          onSelect = {row => {
            stemDeleteDomain(row) || toggle()
          }} 
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
              Are you sure you want to Remove Domain ?
            </blockquote>
      </UiCardModal>
    </>
  )
}
SystemDomains.propTypes = {
  match: PropTypes.object.isRequired,
  isBreadcrumb : PropTypes.bool
}
