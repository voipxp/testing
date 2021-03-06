import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useAsync } from 'react-async-hook'
import { useAlerts } from '@/store/alerts'
import api from '@/api/exports'
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

export const Export = ({ history, match, isBreadcrumb = true }) => {
  const id = match.params.id
  const { alertDanger } = useAlerts()
  const [showModal, setShowModal] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [data, setData] = useState('')
  const [serviceType, setServiceType] = useState('')

  const { result, error, loading } = useAsync(() => api.json(id), [id])

  if (error) alertDanger(error)
  const export2 = result || {}

  const downloadFile = async () => {
    const fileName = 'export-' + id
    const json = JSON.stringify(export2)
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
      {loading ? (
        <UiLoadingCard />
      ) : (
        <>
          <UiCard title={`Migration ${id}`}>
            <div className="columns">
              <div className="column">
                <UiListItem label="Service Provider">
                  {export2[0].serviceProviderId}
                </UiListItem>
                <UiListItem label="Group">{export2[0].groupId}</UiListItem>
                <UiListItem label="Status">{export2[0].status}</UiListItem>
                <UiListItem label="Message">{export2[0].error}</UiListItem>
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
              rows={export2}
              rowKey="id"
              pageSize={25}
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

Export.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  isBreadcrumb: PropTypes.bool
}
