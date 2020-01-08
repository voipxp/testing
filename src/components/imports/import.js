import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useAsync } from 'react-async-hook'
import { useAlerts } from '@/store/alerts'
import api from '@/api/imports'
import { AppBreadcrumb } from '@/components/app'
import { Breadcrumb, Column, Input, Select } from 'rbx'
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
  { key: 'attempt', label: 'Attempt' },
  { key: 'created_at', label: 'Run At' },
  { key: 'next_at', label: 'Next Run' },
  { key: 'error', label: 'Error' }
]

export const Import = ({ history, match, isBreadcrumb = true }) => {
  const id = match.params.id
  const { alertDanger } = useAlerts()
  const [showModal, setShowModal] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [data, setData] = useState('')
  const [serviceType, setServiceType] = useState('')

  const { result, error, loading } = useAsync(() => api.json(id), [id])

  if (error) alertDanger(error)
  const import2 = result || {}

  const downloadFile = async () => {
    const fileName = 'import-' + id
    const json = JSON.stringify(import2)
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
      const result = await api.show(data.id, {})
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
          <Breadcrumb.Item href="/#!/imports">Imports</Breadcrumb.Item>
          <Breadcrumb.Item>Import {id}</Breadcrumb.Item>
        </AppBreadcrumb>
      )}

      {loading ? (
        <UiLoadingCard />
      ) : (
        <>
          <UiCard title={`Import ${id}`}>
            <div className="columns">
              <div className="column">
                <UiListItem label="Service Provider">
                  {import2[0].serviceProviderId}
                </UiListItem>
                <UiListItem label="Group">{import2[0].groupId}</UiListItem>
                <UiListItem label="Status">{import2[0].status}</UiListItem>
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
                  icon="download"
                  size="small"
                  onClick={downloadFile}
                />
              </>
            }
          >
            <UiDataTable
              columns={columns}
              rows={import2}
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

Import.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  isBreadcrumb: PropTypes.bool
}
