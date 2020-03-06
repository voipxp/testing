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
  const { alertSuccess, alertDanger, alertWarning } = useAlerts()
  const [numbers, setNumbers] = React.useState({})
  const [isNextBtnDisabled, setDisableNextButton] = React.useState(false)
  const [createNumberClicked, setCreateNumberClicked] = React.useState(false)

  const setStateTaskData = (data) => {
    setNumbers(data)
  }

	const saveTask = () => {
		setCreateNumberClicked(false)
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

        tasks.push(task)

      return tasks
  }

  const assignNumberModal = (
    <>
      {
        (createNumberClicked)
        ?
        <UiCardModal
          title="Add Numbers in bulk"
          isOpen={createNumberClicked}
          onCancel={() => setCreateNumberClicked(false)}
          onSave={saveTask}
        >
          <BulkAddNumbers
            setData={setStateTaskData}
          />
        </UiCardModal>
        :
        null
      }

    </>
  )

  return (
    <>
      { (createNumberClicked) ? assignNumberModal : null}
      <UiCard
        title="Numbers"
        buttons={
          <>
            <UiButton
              color="link"
              icon="bulk"
              size="small"
              onClick={() => setCreateNumberClicked(true)}
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
