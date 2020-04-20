import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useAsync } from 'react-async-hook'
import { UiCard, UiCardModal, UiButton, UiLoading } from '@/components/ui'
import { Button } from 'rbx'
import { BulkSelectServiceProviderTrunk } from '../bulk-select-service-provider-trunk'
// import { BulkAddEnterpriseTrunk } from '../bulk-add-enterprise-trunk'
import { ServiceProviderTrunkGroupsCallCapacity } from '@/components/service-provider'
import callCapacityApi from '@/api/service-providers-services/service-provider-trunk-group-call-capacity-service'
import { BulkImportService } from '@/components/bulk/service/bulk-import-service'
import { useAlerts } from '@/store/alerts'

export const BulkSipTrunkingTrunkEnterprise = ({
  initialData = {},
  setToNext,
  handleWizData,
  localStorageKey
}) => {
  const { serviceProviderId } = initialData
  const { alertDanger } = useAlerts()
  const [taskData, setTaskData] = React.useState({})
  const [isNextBtnDisabled, setDisableNextButton] = React.useState(false)
  const [addTrunkClicked, setAddTrunkClicked] = React.useState(false)
  const [spMaxActiveCalls, setSpMaxActiveCalls] = React.useState(0)
  const [
    spBurstingMaxActiveCalls,
    setSpBurstingMaxActiveCalls
  ] = React.useState(0)

  const { result, error, loading } = useAsync(
    () => callCapacityApi.show(serviceProviderId),
    []
  )
  useEffect(() => {
    if (!loading && !error) {
      setSpMaxActiveCalls(result.maxActiveCalls)
      setSpBurstingMaxActiveCalls(result.burstingMaxActiveCalls)

      // const tempInitData = {...initialData}
      // tempInitData['serviceProvider.maxActiveCalls'] = result.maxActiveCalls
      // tempInitData['serviceProvider.burstingMaxActiveCalls'] = result.burstingMaxActiveCalls
      // handleWizData(tempInitData)
    }
  }, [result, loading, error])

  useEffect(() => {
    const tempInitData = { ...initialData }
    tempInitData['serviceProvider.maxActiveCalls'] = spMaxActiveCalls
    tempInitData[
      'serviceProvider.burstingMaxActiveCalls'
    ] = spBurstingMaxActiveCalls
    handleWizData(tempInitData)
  }, [spMaxActiveCalls, spBurstingMaxActiveCalls])

  if (loading) return <UiLoading />

  const setStateTaskData = data => {
    setTaskData(data)
  }

  const selectEntTrunk = row => {
    handleWizData({
      ...initialData,
      enterpriseTrunkName: row.enterpriseTrunkName
    })
    setToNext()
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
      'serviceProvider.maxActiveCalls': taskData.maxActiveCalls,
      'serviceProvider.burstingMaxActiveCalls': taskData.burstingMaxActiveCalls
      // "name": taskData.name,
      // "maxRerouteAttempts": taskData.maxRerouteAttempts,
      // "exhaustionAction": taskData.exhaustionAction,
      // "forwardTo": taskData.forwardTo,
      // "routingType": taskData.routingType,
      // "maxReroutesInPriority": taskData.maxReroutesInPriority,
      // "orderingAlgorithm": taskData.orderingAlgorithm
    }
    task['serviceProviderId'] = initialData.serviceProviderId

    tasks.push(task)

    /* SP Call Capacity data  */
    const tempInitData = { ...initialData }
    tempInitData['serviceProvider.maxActiveCalls'] = taskData.maxActiveCalls
    tempInitData['serviceProvider.burstingMaxActiveCalls'] =
      taskData.burstingMaxActiveCalls
    handleWizData(tempInitData)

    return tasks
  }

  const addEnterpriseTrunkModal = (
    <>
      {addTrunkClicked ? (
        <UiCardModal
          title="Edit Call Capacity"
          isOpen={addTrunkClicked}
          onCancel={() => setAddTrunkClicked(false)}
          onSave={clickSaveBtn}
        >
          <ServiceProviderTrunkGroupsCallCapacity
            serviceProviderId={serviceProviderId}
            setData={setStateTaskData}
          />
        </UiCardModal>
      ) : null}
    </>
  )

  return (
    <>
      {addEnterpriseTrunkModal}
      <UiCard
        title="Service Provider Trunk"
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
        <BulkSelectServiceProviderTrunk
          selectEntTrunk={selectEntTrunk}
          serviceProviderId={serviceProviderId}
        />
      </UiCard>
      <div style={{ marginTop: '20px' }}>
        <Button
          style={{ float: 'right' }}
          color="link"
          onClick={setToNext}
          disabled={isNextBtnDisabled}
        >
          Next
        </Button>
      </div>
    </>
  )
}

BulkSipTrunkingTrunkEnterprise.propTypes = {
  localStorageKey: PropTypes.string,
  initialData: PropTypes.object,
  handleWizData: PropTypes.func.isRequired,
  setToNext: PropTypes.func
}
