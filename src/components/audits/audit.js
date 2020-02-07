import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useAsync } from 'react-async-hook'
import { useAlerts } from '@/store/alerts'
import auditApi from '@/api/audits'
import exportApi from '@/api/exports'
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
  UiFormField,
  UiInputPassword,
  UiInputPasscode
} from '@/components/ui'
import { generatePassword, generatePasscode } from '@/utils'

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'type', label: 'Type' },
  { key: 'serviceType', label: 'Backup Type' },
  { key: 'userId', label: 'User Id' },
  { key: 'deviceName', label: 'Device Name' },
  { key: 'status', label: 'Status' },
  { key: 'attempt', label: 'Attempt' },
  { key: 'created_at', label: 'Run At' },
  { key: 'next_at', label: 'Next Run' },
  { key: 'error', label: 'Error' }
]

export const Audit = ({ history, match, isBreadcrumb = true }) => {
  const id = match.params.id
  const formRef = React.useRef()
  const { alertDanger, alertSuccess } = useAlerts()
  const [showModal, setShowModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [data, setData] = useState('')
  const [serviceType, setServiceType] = useState('')
  const [form, setForm] = useState({})
  const [export2, setExport2] = useState({})
  const [endpoints, setEndpoints] = useState([])
  const [formValid, setFormValid] = React.useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const KEY = 'exports'

  const { result, error, loading } = useAsync(() => auditApi.json(id), [id])

  React.useEffect(() => {
    if (formRef.current) setFormValid(formRef.current.checkValidity())
  }, [form])

  if (error) alertDanger(error)
  const audit = result || {}

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
        id: id,
        endpoint: '',
        bwksUserId: '',
        bwksPassword: '',
        serviceProviderId: audit[0].serviceProviderId,
        groupId: audit[0].groupId,
        password: '',
        sipAuthenticationPassword: '',
        groupMailServerPassword: '',
        passcode: ''
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
    setShowLoading(true)
    setShowConfirm(false)
    setShowModal(false)
    setShowExportModal(false)
    setForm({
      endpoint: form.endpoint,
      bwksUserId: form.bwksUserId,
      bwksPassword: form.bwksPassword,
      password: form.password,
      sipAuthenticationPassword: form.sipAuthenticationPassword,
      groupMailServerPassword: form.groupMailServerPassword,
      passcode: form.passcode
    })
    try {
      const iResult = exportApi.create({
        endpoint: form.endpoint,
        auditId: id,
        username: form.bwksUserId,
        password: form.bwksPassword,
        encryption: 'plain',
        serviceProviderId: audit[0].serviceProviderId,
        groupId: audit[0].groupId,
        options: {
          password: form.password,
          sipAuthenticationPassword: form.sipAuthenticationPassword,
          groupMailServerPassword: form.groupMailServerPassword,
          passcode: form.passcode
        }
      })
      setExport2(iResult)
      alertSuccess('Export sent successfully to ' + form.endpoint)
    } catch (error_) {
      setShowExportModal(true)
      alertDanger(error_)
    } finally {
      setShowLoading(false)
      setShowConfirm(false)
      setShowModal(false)
      setShowExportModal(false)
    }
  }

  async function open(data) {
    try {
      setShowLoading(true)
      setShowModal(true)
      const result = await auditApi.show(data.id, {})
      console.log('result', result)
      setServiceType(result.serviceType)
      setData(JSON.stringify(result, null, 2))
    } catch (error_) {
      setShowLoading(false)
      alertDanger(error_)
    }
    setShowLoading(false)
  }

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
                <UiListItem label="Message">{audit[0].error}</UiListItem>
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
          title={`Export Audit ${form.groupId} (${form.id})`}
          onCancel={() => setShowExportModal(false)}
          // onSave={uploadExport}
          onSave={
            form.endpoint &&
            form.bwksUserId &&
            form.bwksPassword &&
            form.password &&
            form.groupMailServerPassword &&
            form.passcode
              ? () => setShowConfirm(true)
              : null
          }
          saveText="Export"
          isOpen={showExportModal}
        >
          <form>
            <UiFormField label="odin System" horizontal>
              <Select.Container fullwidth>
                <Select
                  value={form.endpoint}
                  onChange={handleInput}
                  name="endpoint"
                  disabled={showLoading}
                  autoFocus
                  required
                >
                  <Select.Option value="Please select...">
                    {'Please select...'}
                  </Select.Option>
                  {endpoints.map(searchType => (
                    <Select.Option key={searchType.key} value={searchType.url}>
                      {searchType.name}
                    </Select.Option>
                  ))}
                </Select>
              </Select.Container>
            </UiFormField>
            <UiFormField label="BroadWorks UserId" horizontal>
              <Input
                type="text"
                name="bwksUserId"
                value={form.bwksUserId}
                onChange={handleInput}
                placeholder="BroadWorks User ID"
                required
              />
            </UiFormField>
            <UiFormField label="BroadWorks Password" horizontal>
              <Input
                type="password"
                name="bwksPassword"
                value={form.bwksPassword}
                onChange={handleInput}
                placeholder="BroadWorks Password"
                required
              />
            </UiFormField>
            <UiFormField label="Service Provider Id" horizontal>
              <Input
                type="text"
                name="serviceProviderId"
                value={form.serviceProviderId}
                onChange={handleInput}
                placeholder="Service Provider Id"
                required
              />
            </UiFormField>
            <UiFormField label="Group Id" horizontal>
              <Input
                type="text"
                name="groupId"
                value={form.groupId}
                onChange={handleInput}
                placeholder="Group Id"
                required
              />
            </UiFormField>
            <UiFormField label="User Password" horizontal>
              <UiInputPassword
                name="password"
                label="user password"
                placeholder="User Password"
                value={form.password}
                minLength={6}
                onChange={handleInput}
                required
                onGeneratePassword={generatePassword}
              />
            </UiFormField>
            <UiFormField label="SIP Auth Password" horizontal>
              <UiInputPassword
                name="sipAuthenticationPassword"
                label="SIP Authentication Password"
                placeholder="SIP Authentication Password"
                value={form.sipAuthenticationPassword}
                minLength={6}
                onChange={handleInput}
                required
                onGeneratePassword={generatePassword}
              />
            </UiFormField>
            <UiFormField label="User Group Mail Server Password" horizontal>
              <UiInputPassword
                name="groupMailServerPassword"
                label="user group mail service password"
                placeholder="user group mail service password"
                value={form.groupMailServerPassword}
                minLength={6}
                onChange={handleInput}
                onGeneratePassword={generatePassword}
                required
              />
            </UiFormField>
            <UiFormField label="User Passcode" horizontal>
              <UiInputPasscode
                name="passcode"
                label="user passcode"
                placeholder="user passcode"
                minLength={4}
                value={form.passcode}
                onChange={handleInput}
                onGeneratePasscode={generatePasscode}
                required
              />
            </UiFormField>
          </form>
        </UiCardModal>
      )}
      <UiCardModal
        title="Please Confirm"
        isOpen={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onSave={uploadExport}
        saveText="Export"
      >
        <blockquote>
          Are you sure you want to upload this audit {form.id} {form.groupId}?
        </blockquote>
      </UiCardModal>
    </>
  )
}

Audit.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  isBreadcrumb: PropTypes.bool
}
