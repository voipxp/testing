import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useAsync } from 'react-async-hook'
import { useAlerts } from '@/store/alerts'
import auditApi from '@/api/audits'
import { AppBreadcrumb } from '@/components/app'
import { Breadcrumb, Column, Field, Input, Control, Icon, Button } from 'rbx'
import { GroupSearch } from '@/components/group-search'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {
  UiCard,
  UiButton,
  UiLoadingCard,
  UiDataTable,
  UiCardModal,
  UiInputCheckbox
} from '@/components/ui'

const AUDIT_LIMIT = 500

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'serviceProviderId', label: 'Service Provider' },
  { key: 'groupId', label: 'Group' },
  { key: 'status', label: 'Status' },
  { key: 'description', label: 'Description' },
  { key: 'created_at', label: 'Created' }
]
const audits = [
  'audit.system',
  'audit.serviceProvider',
  'audit.group.devices',
  'audit.group'
]

export const Audits = ({ history, match, isBreadcrumb = true }) => {
  const initialForm = {
    'serviceProviderId': '',
    'groupId': '',
    'audit.system': true,
    'audit.serviceProvider': true,
    'audit.group.devices': false,
    'audit.group': false
  }

  const serviceProviderId = match.params.serviceProviderId
  const groupId = match.params.groupId
  const [form, setForm] = useState(initialForm)
  const [showModal, setShowModal] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const { alertDanger } = useAlerts()
  const [search, setSearch] = React.useState()
  const [initialized, setInitialized] = React.useState(false)

  const { result, error, loading, execute } = useAsync(
    () => auditApi.list(AUDIT_LIMIT, { serviceProviderId, groupId }),
    []
  )

  if (error) alertDanger(error)

  function handleInput(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setForm({ ...form, [name]: value })
  }

  const open = ({ id }) => history.push(`/audits/${id}`)
  function add() {
    setShowModal(true)
  }
  const show = group => {
    setForm({ ...form, ...group })
    setSearch(null)
    setInitialized(false)
    setShowModal(true)
  }

  function handleClick() {
    console.log('handleClick')
    setInitialized(true)
    setShowModal(false)
    console.log('initialized', initialized)
  }

  function onCancel() {
    setInitialized(false)
    setShowModal(false)
    setSearch(false)
  }

  async function save(settings) {
    const magic = Object.keys(form).reduce(
      (obj, key) => {
        if (key.startsWith('audit')) {
          obj.options.audits[key] = form[key]
        } else {
          obj[key] = form[key]
        }
        return obj
      },
      { options: { audits: {} } }
    )
    try {
      setShowLoading(true)
      await auditApi.create(magic)
      execute()
    } catch (error_) {
      alertDanger(error_)
    } finally {
      setShowLoading(false)
      setShowModal(false)
    }
  }

  return (
    <>
      {isBreadcrumb && (
        <AppBreadcrumb>
          <Breadcrumb.Item>Audits</Breadcrumb.Item>
        </AppBreadcrumb>
      )}
      {loading ? (
        <UiLoadingCard />
      ) : (
        <UiCard
          title="Recent Audits"
          buttons={
            <UiButton color="link" icon="add" size="small" onClick={add} />
          }
        >
          <UiDataTable
            columns={columns}
            rows={result}
            rowKey="id"
            onClick={open}
            pageSize={20}
          />
        </UiCard>
      )}
      {initialized ? (
        <UiCardModal
          isOpen={initialized}
          onCancel={onCancel}
          title={'Select Group'}
        >
          <GroupSearch onSelect={show}></GroupSearch>
        </UiCardModal>
      ) : (
        ''
      )}
      <UiCardModal
        title={'Start Backup'}
        onCancel={onCancel}
        isOpen={showModal}
        onSave={save}
        isLoading={showLoading}
      >
        <form>
          <Column.Group>
            <Column>
              <Field>
                <Control>
                  <UiButton fullwidth static>
                    Service Provider Id
                  </UiButton>
                </Control>
              </Field>
              <Field>
                <Control>
                  <UiButton fullwidth static>
                    Group Id
                  </UiButton>
                </Control>
              </Field>
              <Field>
                <Control>
                  <UiButton fullwidth static>
                    Audit Options
                  </UiButton>
                </Control>
              </Field>
            </Column>
            <Column>
              <Field>
                <Control>
                  <Input
                    type="string"
                    name="serviceProviderId"
                    value={form.serviceProviderId}
                    onChange={handleInput}
                    placeholder="Service Provider Id"
                    disabled={true}
                  />
                </Control>
              </Field>
              <Field>
                <Control>
                  <Input
                    type="string"
                    name="groupId"
                    value={form.groupId}
                    onChange={handleInput}
                    onClick={handleClick}
                    placeholder="Group Id"
                  />
                </Control>
              </Field>
              <Field>
                <Control>
                  {audits.map(audit => {
                    return (
                      <UiInputCheckbox
                        key={audit}
                        name={audit}
                        label={audit}
                        // checked={form[audit] ? true : false}
                        checked={form[audit]}
                        onChange={handleInput}
                      />
                    )
                  })}
                </Control>
              </Field>
            </Column>
          </Column.Group>
        </form>
      </UiCardModal>
    </>
  )
}

Audits.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  isBreadcrumb: PropTypes.bool
}
