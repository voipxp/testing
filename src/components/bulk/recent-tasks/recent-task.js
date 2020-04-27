import React from 'react'
import PropTypes from 'prop-types'
import { UiCard, UiDataTable, UiLoadingCard } from '@/components/ui'
import { TaskService } from '@/api/task/task-service'
import { useAsync } from 'react-async-hook'

const RecentTask = ({ id }) => {
  const { result, loading } = useAsync(() => TaskService.show(id), [id])

  const task = (result && result.data) || []

  if (loading) return <UiLoadingCard />

  const errorKeys = [
    { key: 'task', label: 'Type' },
    { key: 'status', label: 'Status' },
    { key: 'error', label: 'Error' }
  ]

  return (
    <UiCard title="Job Details">
      <UiDataTable
        columns={errorKeys}
        rows={task || []}
        rowKey="index"
        pageSize={20}
      />
    </UiCard>
  )
}

RecentTask.propTypes = {
  id: PropTypes.number.isRequired
}

export default RecentTask
