import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { UiCard, UiCardModal, UiButton, UiLoading, UiDataTable } from '@/components/ui'
import { Button } from 'rbx'
import { BulkEnterpriseCloneAllControls } from '../bulk-enterprise-clone/bulk-enterprise-clone-all-controls'
import { BulkSelectServiceProviderId } from '../bulk-select-service-provider-id'
import { BulkImportService } from '@/components/bulk/service/bulk-import-service'
import { useAlerts } from '@/store/alerts'

export const BulkSipServiceProvider = (
  {
    initialData={},
    setToNext,
    handleWizData,
    localStorageKey
  }
) => {
  const { alertDanger } = useAlerts()
	const [taskData, setTaskData] = React.useState({})
  const [isNextBtnDisabled, setDisableNextButton] = React.useState(true)
  const [cloneEnterpriseClicked, setCloneEnterpriseClicked] = React.useState(false)

  const setStateTaskData = (data) => {
    setTaskData(data)
  }

  const selectServiceProvider = (spRow) => {
    const serviceProviderId = spRow.serviceProviderId
    const tempData = { ...initialData }
    tempData['serviceProviderId'] = serviceProviderId
    tempData['sourceServiceProviderId'] = ''
    handleWizData({...tempData })
    // handleWizData({...initialData, serviceProviderId: serviceProviderId })
	  setToNext()
  }

	const clickCloneEnterpriseModalSaveBtn = () => {
		setCloneEnterpriseClicked(false)
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
        task: 'service.provider.bulk.clone',
        'source.serviceProviderId': taskData.cloneServiceProviderId || null,
        'destination.serviceProviderId': taskData.newServiceProviderId || null,
        'destination.serviceProviderName': taskData.newServiceProviderName,
      }

      const options = {}
      taskData.cloneOptions.forEach(function(el) {
        options[el.name] = el.value
      })

      task['options'] = options
      tasks.push(task)

    const tempData = { ...initialData }
    tempData['serviceProviderId'] = taskData.newServiceProviderId
    tempData['sourceServiceProviderId'] = taskData.cloneServiceProviderId
    /* Set to props which will be used in the next component, This is HOC */
    handleWizData({...tempData })

    return tasks
  }

  const cloneEnterpriseModal = (
    <>
      <UiCardModal
        title="Clone Enterprise"
        isOpen={cloneEnterpriseClicked}
        onCancel={() => setCloneEnterpriseClicked(false)}
		    onSave={clickCloneEnterpriseModalSaveBtn}
      >
      <BulkEnterpriseCloneAllControls
	      setTaskData={setStateTaskData}
	   />
      </UiCardModal>
    </>
  )

  return (
    <>
      { cloneEnterpriseModal }
      <UiCard
        title="Service Providers"
        buttons={
          <>
            <UiButton
              color="link"
              icon="clone"
              size="small"
              onClick={() => setCloneEnterpriseClicked(true)}
            />
          </>
        }
      >
      <BulkSelectServiceProviderId
        selectSP={selectServiceProvider}
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

BulkSipServiceProvider.propTypes = {
  localStorageKey: PropTypes.string,
  initialData: PropTypes.object,
  handleWizData: PropTypes.func.isRequired,
  setToNext: PropTypes.func
}
