import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useAsync } from 'react-async-hook'
import { useAlerts } from '@/store/alerts'
import api from '@/api/imports'
import { AppBreadcrumb } from '@/components/app'
import { Breadcrumb, Column, Field, Input, Control } from 'rbx'
import { GroupSearch } from '@/components/group-search'
import {
  UiCard,
  UiButton,
  UiLoadingCard,
  UiDataTable,
  UiCardModal,
  UiInputCheckbox
} from '@/components/ui'

const IMPORT_LIMIT = 500

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'serviceProviderId', label: 'Service Provider' },
  { key: 'groupId', label: 'Group' },
  { key: 'status', label: 'Status' },
  { key: 'description', label: 'Description' },
  { key: 'error', label: 'Errors' },
  { key: 'created_at', label: 'Created' }
]
const imports = [
  'import.system',
  'import.serviceProvider',
  'import.group.devices',
  'import.group'
]

export const Imports = ({ history, match, isBreadcrumb = true }) => {
  const initialForm = {
    'serviceProviderId': '',
    'groupId': '',
    'import.system': true,
    'import.serviceProvider': true,
    'import.group.devices': false,
    'import.group': false
  }

  const serviceProviderId = match.params.serviceProviderId
  const groupId = match.params.groupId
  const [form, setForm] = useState(initialForm)
  const [showModal, setShowModal] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const { alertDanger } = useAlerts()
  const [initialized, setInitialized] = React.useState(false)

  const { result, error, loading, execute } = useAsync(
    () => api.list(IMPORT_LIMIT, { serviceProviderId, groupId }),
    []
  )

  if (error) alertDanger(error)

  function handleInput(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setForm({ ...form, [name]: value })
  }

  const open = ({ id }) => history.push(`/imports/${id}`)
  const show = group => {
    setForm({ ...form, ...group })
    setInitialized(false)
    setShowModal(true)
  }

  function handleClick() {
    setInitialized(true)
    setShowModal(false)
  }

  function onCancel() {
    setInitialized(false)
    setShowModal(false)
  }

  async function save(settings) {
    const magic = Object.keys(form).reduce(
      (obj, key) => {
        if (key.startsWith('import')) {
          obj.options.imports[key] = form[key]
        } else {
          obj[key] = form[key]
        }
        return obj
      },
      { options: { imports: {} } }
    )
    try {
      setShowLoading(true)
      await api.create(magic)
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
          <Breadcrumb.Item>Imports (beta)</Breadcrumb.Item>
        </AppBreadcrumb>
      )}
      {loading ? (
        <UiLoadingCard />
      ) : (
        <UiCard
          title="Recent Imports"
          // buttons={
          //   <UiButton color="link" icon="add" size="small" onClick={add} />
          // }
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
        title={'Start Import'}
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
                    Import Options
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
                  {imports.map(import2 => {
                    return (
                      <UiInputCheckbox
                        key={import2}
                        name={import2}
                        label={import2}
                        // checked={form[import] ? true : false}
                        checked={form[import2]}
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

Imports.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  isBreadcrumb: PropTypes.bool
}
