import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { UiCard, UiButton } from '@/components/ui'
import { Button } from 'rbx'
import { BulkSelectGroupServices } from '../bulk-select-group-services'
import { BulkImportService } from '@/components/bulk/service/bulk-import-service'
import { useAlerts } from '@/store/alerts'

export const AssignGroupServices = ({
	initialData={},
	setToNext,
  handleWizData,
  localStorageKey
}) => {
  const { serviceProviderId, groupId, sourceServiceProviderId, sourceGroupId } = initialData
  const newServiceProviderId = (sourceServiceProviderId && sourceServiceProviderId!== '') ? sourceServiceProviderId : serviceProviderId
  const newGroupId = (sourceGroupId && sourceGroupId!=='') ? sourceGroupId : groupId
  // const serviceProviderId = 'reseler-sp'
  // const groupId = 'test007R'
  const { alertSuccess, alertDanger } = useAlerts()
  const [taskData, setTaskData] = React.useState([])
  const [isTaskCreated, setIsTaskCreated] = React.useState(false)
  const [isNextBtnDisabled, setDisableNextButton] = React.useState(false)
  const [showSelect, setShowSelect] = React.useState(false)

  const setStateTaskData = (data) => {
    setTaskData(data)
    setIsTaskCreated(true)
  }

  useEffect(() => {
    if(isTaskCreated) createTask();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTaskCreated]);

	const createTask = () => {
		prepareImportData().then((data) => {
      Promise.all([BulkImportService.handleFileData(data, localStorageKey)]).then( (data) => {
        alertSuccess('Task is created Successfully.')
        setIsTaskCreated(false)
        setDisableNextButton(false)
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
          task: 'group.services.update',
        }
        task['groupServices'] = taskData
        task['serviceProviderId'] = serviceProviderId
        task['groupId'] = groupId
        tasks.push(task)

      return tasks
  }

  return (
    <>
      <UiCard
        title="Group Services"
        buttons={
          <>
            <UiButton
              color="link"
              icon="edit"
              size="small"
              onClick={() => setShowSelect(!showSelect)}
            />
          </>
        }
      >
        <BulkSelectGroupServices
          serviceProviderId = {newServiceProviderId}
          groupId={newGroupId}
          showSelect={showSelect}
          setData={setStateTaskData}
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

AssignGroupServices.propTypes = {
  localStorageKey: PropTypes.string,
  initialData: PropTypes.object,
  handleWizData: PropTypes.func.isRequired,
  setToNext: PropTypes.func
}
