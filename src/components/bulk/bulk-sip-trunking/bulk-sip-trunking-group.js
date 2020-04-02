import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { UiCard, UiCardModal, UiButton, UiLoading, UiDataTable } from '@/components/ui'
import { Button } from 'rbx'
import { BulkCloneGroupAllControl } from '../bulk-group-clone/bulk-clone-group-all-control'
// import { BulkSelectServiceProviderId } from '../bulk-select-service-provider-id'
import { BulkSelectGroupId } from '../bulk-select-group-id'
import { BulkImportService } from '@/components/bulk/service/bulk-import-service'
import { useAlerts } from '@/store/alerts'
import { prototype } from 'clipboard'


export const BulkSipTrunkingGroup = ({
	initialData={},
	setToNext,
  handleWizData,
  localStorageKey
}) => {
  const { serviceProviderId, sourceServiceProviderId } = initialData
  const sourceSPId = (sourceServiceProviderId && sourceServiceProviderId!== '') ? sourceServiceProviderId : serviceProviderId

  const { alertSuccess, alertDanger, alertWarning } = useAlerts()
  const [taskData, setTaskData] = React.useState({})
  const [isNextBtnDisabled, setDisableNextButton] = React.useState(true)
  const [cloneGroupClicked, setCloneGroupClicked] = React.useState(false)
  const [selectedServiceProviderId, setSelectedGroupId] = React.useState('')

  const setStateTaskData = (data) => {
    setTaskData(data)
  }

  const selectGroupId = (spRow) => {
    const groupId = spRow.groupId
    setSelectedGroupId(groupId)
    handleWizData({...initialData, groupId: groupId })
	  setToNext()
  }

	const saveCloneGroup = () => {
		setCloneGroupClicked(false)
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
      // initialState.forEach(function(el, i) {
        const task = {
          task: 'group.bulk.clone',
          'source.serviceProviderId': taskData.sourceServiceProviderId || null,
          'source.groupId': taskData.sourceGroupId || null,
          'destination.serviceProviderId': serviceProviderId || null,
          'destination.groupId': taskData.destinationGroupId || null,
          'destination.groupName': taskData.destinationGroupName || null
        }
        if(taskData.userLimit) {
          task['destination.userLimit'] = taskData.userLimit
        }
        const options = {}
        Object.keys(taskData.cloneOptions).forEach(function(el) {
          options[el] = taskData.cloneOptions[el]
        })

        task['options'] = options
        tasks.push(task)
      // })
      /* Set to props which will be used in the next component, This is HOC */

    const tempData = { ...initialData }
    tempData['groupId'] = taskData.destinationGroupId
    tempData['sourceGroupId'] = taskData.sourceGroupId
    /* Set to props which will be used in the next component, This is HOC */
    handleWizData({...tempData })
    // handleWizData({...initialData, groupId: taskData.destinationGroupId })

      return tasks
  }

  const cloneGroupModal = (
    <>
      <UiCardModal
        title="Clone Group"
        isOpen={cloneGroupClicked}
        onCancel={() => setCloneGroupClicked(false)}
		    onSave={saveCloneGroup}
      >
        <BulkCloneGroupAllControl
          setTaskData={setStateTaskData}
          // serviceProviderId={serviceProviderId}
          sourceServiceProviderId={ sourceSPId }
        />
      </UiCardModal>
    </>
  )

  return (
    <>
      { (cloneGroupClicked) ? cloneGroupModal : null}
      <UiCard
        title="Select Group"
        buttons={
          <>
            <UiButton
              color="link"
              icon="clone"
              size="small"
              onClick={() => setCloneGroupClicked(true)}
            />
          </>
        }
      >
      <BulkSelectGroupId
        serviceProviderId = {serviceProviderId}
        selectGroup={selectGroupId}
      />
      </UiCard>
      <div style={{marginTop: '20px'}}>
        <Button style={{float: 'right'}}
              color="link"
              onClick={ setToNext }
              disabled = { isNextBtnDisabled }
            >
              Next
        </Button>
      </div>
    </>
	)
}

BulkSipTrunkingGroup.propTypes = {
  localStorageKey: PropTypes.string,
  initialData: PropTypes.object,
  handleWizData: PropTypes.func.isRequired,
  setToNext: PropTypes.func
}
