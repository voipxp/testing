import React from 'react'
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
  UiDataTable,
  UiListItem
} from '@/components/ui'

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'type', label: 'Type' },
  { key: 'status', label: 'Status' },
  { key: 'created_at', label: 'Created' }
]

export const Audit = ({ history, match }) => {
  const id = match.params.id
  const { alertDanger } = useAlerts()

  const { result, error, loading } = useAsync(() => auditApi.show(id), [id])

  if (error) alertDanger(error)

  const download = () => alertDanger('Not Ready')
  const open = ({ id }) => alertDanger('Show the Audit Data')

  const audit = result || {}

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
                <UiListItem label="Description">{audit.description}</UiListItem>
                <UiListItem label="Status">{audit.status}</UiListItem>
              </div>
              <div className="column">
                <UiListItem label="Service Provider">
                  {audit.serviceProviderId}
                </UiListItem>
                <UiListItem label="Group">{audit.groupId}</UiListItem>
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
                onClick={download}
              />
            }
          >
            <UiDataTable
              columns={columns}
              rows={audit.children}
              rowKey="id"
              pageSize={10}
              onClick={open}
            />
          </UiCard>
        </>
      )}
    </>
  )
}

Audit.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
}
