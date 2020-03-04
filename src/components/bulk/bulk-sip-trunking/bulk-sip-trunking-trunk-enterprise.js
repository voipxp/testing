import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { UiCard, UiCardModal, UiButton, UiLoading, UiDataTable } from '@/components/ui'
import { Button } from 'rbx'
import { BulkSelectServiceProviderTrunk } from '../bulk-select-service-provider-trunk'
// import { BulkAddEnterpriseTrunk } from '../bulk-add-enterprise-trunk'
import { ServiceProviderTrunkGroupsCallCapacity } from '@/components/service-provider'

import { BulkImportService } from '@/components/bulk/service/bulk-import-service'
import { useAlerts } from '@/store/alerts'
import { prototype } from 'clipboard'

export const BulkSipTrunkingTrunkEnterprise = (
{
  initialData={},
  setToNext,
  handleWizData,
  localStorageKey
}
  ) => {
  const { serviceProviderId } = initialData
  const { alertSuccess, alertDanger, alertWarning } = useAlerts()
	const [taskData, setTaskData] = React.useState({})
  const [isNextBtnDisabled, setDisableNextButton] = React.useState(false)
  const [addTrunkClicked, setAddTrunkClicked] = React.useState(false)

  const setStateTaskData = (data) => {
    setTaskData(data)
  }

  const selectEntTrunk = (row) => {
    handleWizData({...initialData, enterpriseTrunkName: row.enterpriseTrunkName })
	  setToNext()
  }

	const clickSaveBtn = () => {
		setAddTrunkClicked(false)
		prepareImportData().then((data) => {
      Promise.all([BulkImportService.handleFileData(data, localStorageKey)]).then( (data) => {
        setToNext()
      })
      .catch( (error) => {
        alertDanger( error || 'Data Import Error' )
      })
		})
	}

const prepareImportData = () => {
  return Promise.all(prepareImport()).then( (data) => {
    return data
  })
}
	const prepareImport = () => {
    const tasks = []

      const task = {
        "task": 'trunk.group.call.capacity',
        "serviceProvider.maxActiveCalls": taskData.maxActiveCalls,
        "serviceProvider.burstingMaxActiveCalls": taskData.burstingMaxActiveCalls
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

      return tasks
  }

  const addEnterpriseTrunkModal = (
    <>
    { (addTrunkClicked)
    ?
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
      : null
    }
    </>
  )

  return (
    <>
      { addEnterpriseTrunkModal }
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
      <div style={{marginTop: '20px'}}>
        <Button style={{float: 'right'}}
              color="link"
              onClick={ setToNext}
              disabled = { isNextBtnDisabled }
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
