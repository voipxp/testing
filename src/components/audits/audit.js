import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useAsync } from 'react-async-hook'
import { useAlerts } from '@/store/alerts'
import auditApi from '@/api/audits'
import { AppBreadcrumb } from '@/components/app'
import { Breadcrumb } from 'rbx'
import {
  UiCard,
  UiButton,
  UiLoadingCard,
  UiLoadingModal,
  UiDataTable,
  UiListItem,
  UiCardModal
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

export const Audit = ({ history, match }) => {
  const id = match.params.id
  const { alertDanger } = useAlerts()
  const [showModal, setShowModal] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [data, setData] = useState('')
  const [serviceType, setServiceType] = useState('')

  const { result, error, loading } = useAsync(() => auditApi.show(id), [id])

  if (error) alertDanger(error)

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
  async function open(data) {
    try {
      setShowLoading(true)
      setShowModal(true)
      const result = await auditApi.show(data.id, {})
      console.log('data.id', data.id)
      console.log('data', data)
      console.log('result', result)
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
      <AppBreadcrumb>
        <Breadcrumb.Item href="/#!/audits">Audits</Breadcrumb.Item>
        <Breadcrumb.Item>Audit {id}</Breadcrumb.Item>
      </AppBreadcrumb>
      {loading ? (
        <UiLoadingCard />
      ) : (
        <>
          <UiCard title={`Audit ${id}`}>
            <div className="columns">
              <div className="column">
                <UiListItem label="Service Provider">
                  {audit.serviceProviderId}
                </UiListItem>
                <UiListItem label="Group">{audit.groupId}</UiListItem>
                <UiListItem label="Status">{audit.status}</UiListItem>
              </div>
            </div>
          </UiCard>
          <br />
          <UiCard
            title="Jobs"
            buttons={
              <UiButton
                color="link"
                icon="download"
                size="small"
                onClick={downloadFile}
              />
            }
          >
            <UiDataTable
              columns={columns}
              rows={audit.children}
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
    </>
  )
}

Audit.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
}
