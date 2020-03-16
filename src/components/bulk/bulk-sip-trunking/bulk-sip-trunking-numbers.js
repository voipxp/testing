import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { UiCard, UiCardModal, UiButton, UiLoading, UiDataTable } from '@/components/ui'
import { Button } from 'rbx'
import { BulkImportService } from '@/components/bulk/service/bulk-import-service'
import { BulkAddNumbers } from '../bulk-add-numbers'
import { BulkGroupNumbers } from '../bulk-group-numbers'
import { useAlerts } from '@/store/alerts'


export const BulkSipTrunkingNumbers = (props) => {
  const { serviceProviderId, groupId } = props.initialData
  const { alertSuccess, alertDanger } = useAlerts()
  const [numbers, setNumbers] = React.useState({})
  const [isNextBtnDisabled, setDisableNextButton] = React.useState(false)
  // const [createNumberClicked, setCreateNumberClicked] = React.useState(false)
  const [add, setAdd] = React.useState(false)
  const [numbersArray, setNumbersArray] = React.useState([])
  const setStateTaskData = (data) => {
    setNumbers(data)
  }

	const saveTask = () => {
		setAdd(false)
		prepareImportData().then((data) => {
      Promise.all([BulkImportService.handleFileData(data, props.localStorageKey)]).then( (data) => {
        props.setToNext()
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
          task: 'group.dns.assign',
          dns: numbers
        }
        task['serviceProviderId'] = serviceProviderId
        task['groupId'] = groupId
        props.handleWizData({...props.initialData, phoneNumbers : numbersArray})
        tasks.push(task)

      return tasks
  }

  const assignNumberModal = (
    <>
      {
        (add)
        ?
        <UiCardModal
          title="Add Numbers in bulk"
          isOpen={add}
          onCancel={() => setAdd(false)}
          onSave={saveTask}
        >
          <BulkAddNumbers
            setData={setStateTaskData}
            numbersArray={(numbers) => setNumbersArray(numbers)}
          />
        </UiCardModal>
        :
        null
      }

    </>
  )

  return (
    <>
      { (add) ? assignNumberModal : null}
      <UiCard
        title="Numbers"
        buttons={
          <>
            <UiButton
              color="link"
              icon="bulk"
              size="small"
              onClick={() => setAdd(true)}
            />
          </>
        }
      >
      <BulkGroupNumbers
        serviceProviderId={serviceProviderId}
        groupId={groupId}
      />
      </UiCard>
      <div style={{marginTop: '20px'}}>
        <Button style={{float: 'right'}}
              color="link"
              onClick={ props.setToNext}
              disabled = { isNextBtnDisabled }
            >
              Next
        </Button>
      </div>
    </>
	)
}

BulkSipTrunkingNumbers.propTypes = {
  localStorageKey: PropTypes.string,
  initialData: PropTypes.object,
  handleWizData: PropTypes.func.isRequired,
  setToNext: PropTypes.func
}
