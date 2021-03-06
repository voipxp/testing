import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useAsync } from 'react-async-hook'
import { UiCard, UiCardModal, UiButton, UiLoading } from '@/components/ui'
import { Button } from 'rbx'
import callCapacityApi from '@/api/group-services/group-trunk-group-call-capacity-service'
import { GroupTrunkGroupsCallCapacity } from '@/components/groups'
import { BulkImportService } from '@/components/bulk/service/bulk-import-service'
import { useAlerts } from '@/store/alerts'

export const BulkSipTrunkingGroupCallCapacity = ({
  initialData = {},
  setToNext,
  handleWizData,
  localStorageKey
}) => {
  const { serviceProviderId, groupId } = initialData
  const spMaxActiveCalls = initialData['serviceProvider.maxActiveCalls']
  const spBurstingMaxActiveCalls = initialData['serviceProvider.burstingMaxActiveCalls']
  const { alertDanger } = useAlerts()
  const [taskData, setTaskData] = React.useState({})
  const [addTrunkClicked, setAddTrunkClicked] = React.useState(false)
  const [groupMaxActiveCalls, setGroupMaxActiveCalls] = React.useState(0)
  const [
    groupBurstingMaxActiveCalls,
    setGroupBurstingMaxActiveCalls
  ] = React.useState(0)

  const { result, error, loading } = useAsync(
    () => callCapacityApi.show(serviceProviderId, groupId),
    []
  )

  useEffect(() => {
    if (!loading && !error) {
      const maxActiveCalls = result.maxActiveCalls || 0
      const burstingMaxActiveCalls = result.burstingMaxActiveCalls || 0
      setGroupMaxActiveCalls(maxActiveCalls)
      setGroupBurstingMaxActiveCalls(burstingMaxActiveCalls)
    }
  }, [result, loading, error])

  if (loading) return <UiLoading />

  const setStateTaskData = data => {
    setTaskData(data)
  }

  const clickSaveBtn = () => {
    setAddTrunkClicked(false)
    prepareImportData().then(data => {
      Promise.all([BulkImportService.handleFileData(data, localStorageKey)])
        .then(data => {
          setToNext()
        })
        .catch(error_ => {
          alertDanger(error_ || 'Data Import Error')
        })
    })
  }

  const prepareImportData = () => {
    return Promise.all(prepareImport()).then(data => {
      return data
    })
  }

  const prepareImport = () => {
    const tasks = []
    const task = {
      'task': 'trunk.group.call.capacity',
      'group.maxActiveCalls': taskData.maxActiveCalls,
      'group.burstingMaxActiveCalls': taskData.burstingMaxActiveCalls
    }
    task['serviceProviderId'] = initialData.serviceProviderId
    task['groupId'] = initialData.groupId
    tasks.push(task)

    return tasks
  }

  const callCapacityModal = (
    <>
      {addTrunkClicked ? (
        <UiCardModal
          title="Edit Call Capacity"
          isOpen={addTrunkClicked}
          onCancel={() => setAddTrunkClicked(false)}
          onSave={clickSaveBtn}
        >
          <GroupTrunkGroupsCallCapacity
            serviceProviderId={serviceProviderId}
            groupId={groupId}
            maxActiveCall={spMaxActiveCalls}
            maxBurstCall={spBurstingMaxActiveCalls}
            setData={setStateTaskData}
          />
        </UiCardModal>
      ) : null}
    </>
  )

  return (
    <>
      {callCapacityModal}
      <UiCard
        title="Group Call Capacity"
        buttons={
          <>
            <UiButton
              color="link"
              icon="add"
              size="small"
              onClick={() => setAddTrunkClicked(true)}
            />
          </>
        }
      >
        <p>
          Max Active Calls: {groupMaxActiveCalls} /{' '}
          <strong>{spMaxActiveCalls}</strong>
        </p>
        <p>
          Max Bursting Calls: {groupBurstingMaxActiveCalls} /{' '}
          <strong>{spBurstingMaxActiveCalls}</strong>
        </p>
      </UiCard>
      <div style={{ marginTop: '20px' }}>
        <Button
          style={{ float: 'right' }}
          color="link"
          onClick={setToNext}
        >
          Next
        </Button>
      </div>
    </>
  )
}

BulkSipTrunkingGroupCallCapacity.propTypes = {
  localStorageKey: PropTypes.string,
  initialData: PropTypes.object,
  handleWizData: PropTypes.func.isRequired,
  setToNext: PropTypes.func
}
