import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useAsync } from 'react-async-hook'
import { useAlerts } from '@/store/alerts'
import auditApi from '@/api/audits'
import settingsApi from '@/api/settings'
import { AppBreadcrumb } from '@/components/app'
import { Breadcrumb, Column, Input, Select } from 'rbx'
import axios from 'axios'
import {
  UiCard,
  UiButton,
  UiLoadingCard,
  UiLoadingModal,
  UiDataTable,
  UiListItem,
  UiCardModal,
  UiFormField
} from '@/components/ui'

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'type', label: 'Type' },
  { key: 'serviceType', label: 'Backup Type' },
  { key: 'userId', label: 'User Id' },
  { key: 'deviceName', label: 'Device Name' },
  { key: 'status', label: 'Status' },
  { key: 'created_at', label: 'Created' }
]

export const Audit = ({ history, match, isBreadcrumb = true }) => {
  const id = match.params.id
  const { alertDanger } = useAlerts()
  const [showModal, setShowModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [data, setData] = useState('')
  const [serviceType, setServiceType] = useState('')
  const [form, setForm] = useState({})
  const [endpoints, setEndpoints] = useState([])
  const KEY = 'exports'

  const { result, error, loading } = useAsync(() => auditApi.json(id), [id])

  if (error) alertDanger(error)

  function handleInput(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setForm({ ...form, [name]: value })
  }

  const downloadFile = async () => {
    const fileName = 'backup-' + id
    const json = JSON.stringify(audit)
    const blob = new Blob([json], { type: 'application/json' })
    const href = await URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = href
    link.download = fileName + '.json'
    document.body.append(link)
    link.click()
    document.body.removeChild(link)
  }
  async function exportAudit() {
    try {
      setForm({
        endpoint: '',
        bwksUserId: '',
        bwksPassword: ''
      })
      setShowLoading(true)
      const end = await settingsApi.show(KEY)
      setEndpoints(end.endpoints)
      console.log('endpoints', endpoints)
      setShowExportModal(true)
    } catch (error_) {
      setShowLoading(false)
      alertDanger(error_)
    } finally {
      setShowLoading(false)
    }
  }

  async function uploadExport() {
    if (!form.endpoint) {
      console.log('endpoint required')
    }
    console.log('form', form)
    console.log('form.endpoint', form.endpoint)
    setForm({
      endpoint: form.endpoint,
      bwksUserId: form.bwksUserId,
      bwksPassword: form.bwksPassword
    })
    try {
      const api = await axios.create({ baseURL: form.endpoint })
      const token = await api.post('/auth/token', {
        username: form.bwksUserId,
        password: form.bwksPassword,
        encryption: 'plain'
      })
      console.log('token', token)
      setShowLoading(true)
      setShowModal(false)
    } catch (error_) {
      alertDanger(error_)
    } finally {
      setShowLoading(false)
    }
  }

  async function open(data) {
    try {
      setShowLoading(true)
      setShowModal(true)
      const result = await auditApi.show(data.id, {})

      setServiceType(result.serviceType)
      setData(JSON.stringify(result, null, 2))
    } catch (error_) {
      setShowLoading(false)
      alertDanger(error_)
    }
    setShowLoading(false)
  }

  const audit = result || {}

  function onCancel() {
    setShowModal(false)
    setShowLoading(false)
    setData('')
  }

  return (
    <>
      {isBreadcrumb && (
        <AppBreadcrumb>
          <Breadcrumb.Item href="/#!/audits">Audits</Breadcrumb.Item>
          <Breadcrumb.Item>Audit {id}</Breadcrumb.Item>
        </AppBreadcrumb>
      )}

      {loading ? (
        <UiLoadingCard />
      ) : (
        <>
          <UiCard title={`Audit ${id}`}>
            <div className="columns">
              <div className="column">
                <UiListItem label="Service Provider">
                  {audit[0].serviceProviderId}
                </UiListItem>
                <UiListItem label="Group">{audit[0].groupId}</UiListItem>
                <UiListItem label="Status">{audit[0].status}</UiListItem>
              </div>
            </div>
          </UiCard>
          <br />
          <UiCard
            title="Jobs"
            buttons={
              <>
                <UiButton
                  color="link"
                  icon="upload"
                  size="small"
                  onClick={exportAudit}
                />
                <UiButton
                  color="link"
                  icon="download"
                  size="small"
                  onClick={downloadFile}
                />
              </>
            }
          >
            <UiDataTable
              columns={columns}
              rows={audit}
              rowKey="id"
              pageSize={20}
              onClick={open}
            />
          </UiCard>
        </>
      )}
      {showLoading ? (
        <UiLoadingModal isOpen={showLoading} />
      ) : (
        <UiCardModal title={serviceType} onCancel={onCancel} isOpen={showModal}>
          <pre className="prettyprint">{data}</pre>
        </UiCardModal>
      )}
      {showLoading ? (
        <UiLoadingModal isOpen={showLoading} />
      ) : (
        <UiCardModal
          title={`Export Audit to ${form.name}`}
          onCancel={() => setShowExportModal(false)}
          onSave={uploadExport}
          isOpen={showExportModal}
        >
          <form>
            <Column.Group>
              <Column>
                <UiFormField label="odin System">
                  <Select.Container fullwidth>
                    <Select
                      value={form.endpoint}
                      onChange={handleInput}
                      name="endpoint"
                      disabled={showLoading}
                      autoFocus
                    >
                      <Select.Option value="Please select...">
                        {'Please select...'}
                      </Select.Option>
                      {endpoints.map(searchType => (
                        <Select.Option
                          key={searchType.key}
                          value={searchType.url}
                        >
                          {searchType.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Select.Container>
                </UiFormField>
              </Column>
              <Column>
                <UiFormField label="broadworks userId">
                  <Input
                    type="text"
                    name="bwksUserId"
                    value={form.bwksUserId}
                    onChange={handleInput}
                    placeholder="Broadworks User ID"
                  />
                </UiFormField>
              </Column>
              <Column>
                <UiFormField label="broadworks password">
                  <Input
                    type="password"
                    name="bwksPassword"
                    value={form.bwksPassword}
                    onChange={handleInput}
                    placeholder="Broadworks Password"
                  />
                </UiFormField>
              </Column>
            </Column.Group>
          </form>
        </UiCardModal>
      )}
    </>
  )
}

Audit.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  isBreadcrumb: PropTypes.bool
}
