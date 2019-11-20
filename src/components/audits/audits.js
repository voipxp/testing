import React from 'react'
import PropTypes from 'prop-types'
import { useAsync } from 'react-async-hook'
import { useAlerts } from '@/store/alerts'
import auditApi from '@/api/audits'
import { AppBreadcrumb } from '@/components/app'
import { Breadcrumb } from 'rbx'
import { UiCard, UiButton, UiLoadingCard, UiDataTable } from '@/components/ui'

const AUDIT_LIMIT = 50

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'serviceProviderId', label: 'Service Provider' },
  { key: 'groupId', label: 'Group' },
  { key: 'status', label: 'Status' },
  { key: 'description', label: 'Description' },
  { key: 'created_at', label: 'Created' }
]

export const Audits = ({ history, match }) => {
  const serviceProviderId = match.params.serviceProviderId
  const groupId = match.params.groupId
  const { alertDanger } = useAlerts()

  const { result, error, loading } = useAsync(
    () => auditApi.list(AUDIT_LIMIT, { serviceProviderId, groupId }),
    []
  )

  if (error) alertDanger(error)

  const add = () => alertDanger('Not Ready')
  const open = ({ id }) => history.push(`/audits/${id}`)

  return (
    <>
      <AppBreadcrumb>
        <Breadcrumb.Item>Audits</Breadcrumb.Item>
      </AppBreadcrumb>
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
          />
        </UiCard>
      )}
    </>
  )
}

Audits.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
}
