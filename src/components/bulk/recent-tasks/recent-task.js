import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { UiCard, UiListItem, UiLoading, UiDataTable, UiLoadingCard } from '@/components/ui'
import { Button, Select, Input } from 'rbx'
import groupDomainAPI from '@/api/groups/domains'
import { useAlerts } from '@/store/alerts'
import {TaskService} from '@/api/task/task-service'
import { useAsync } from 'react-async-hook'

const RecentTask = (
  {
    id
  }
) => {
  const {result, loading} = useAsync(() => TaskService.show(id)
  , [id])

  const task = result && result.data || []

  if(loading) return <UiLoadingCard />

  const errorKeys = [
    {key: 'task', label: 'Type'},
    {key: 'status', label: 'Status'},
    {key: 'error', label: 'Error'}
  ]

  return (

    <UiCard
      title='Job Details'
    >
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
