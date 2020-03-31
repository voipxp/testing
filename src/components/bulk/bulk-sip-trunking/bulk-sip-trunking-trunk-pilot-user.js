import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { UiSelectableTable } from '@/components/ui'
import { Button } from 'rbx'
import _ from 'lodash'
import { BulkImportService } from '@/components/bulk/service/bulk-import-service'
import { useAlerts } from '@/store/alerts'
import { BulkSipTrunkingTrunkPilotUserTask } from './tasks/bulk-sip-trunking-trunk-pilot-user-task'

export const BulkSipTrunkingTrunkPilotUser = (props) => {
const {
  serviceProviderId,
  groupId,
  groupTrunk,
  users
} = props.initialData

const alluser = []
users.forEach( (userId) => {
  alluser.push({userId: userId})
})

const [availableUser, setAvailableUser] = useState([...alluser])
const [selectedUser, setSelectedUser] = useState([])
const [taskIsCreated, setTaskIsCreated] = useState(false)
const { alertSuccess, alertDanger } = useAlerts()
const [isNextBtnDisabled, setDisableNextButton] = React.useState(false)

const createTask = () => {
  prepareImportData().then((data) => {
    Promise.all([BulkImportService.handleFileData(data, props.localStorageKey)]).then( (data) => {
      setTaskIsCreated(true)
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
        "task": "group.trunk.group.update",
        "pilotUserId": selectedUser[0].userId,
        "serviceProviderId": serviceProviderId,
        "groupId": groupId,
        "name": groupTrunk,
    }
    tasks.push(task)

    return tasks
}

  const handleTask = () => {
    if( selectedUser.length > 0 ) {
      createTask()
    }
    else props.setToNext()
  }

  const setSelected = (items) => {
      setSelectedUser(items)
  }
  const setAvailable = (items) => {
      setAvailableUser(items)
  }

  return (
    <>
      {
        taskIsCreated
        ?
        <BulkSipTrunkingTrunkPilotUserTask
          localStorageKey={ props.localStorageKey }
          initialData={props.initialData}
          setToNext={props.setToNext}
        />
        :
        <>
          <UiSelectableTable
            title="Trunking Pilot Users"
            availableUser={availableUser}
            setAvailableUser={(availableItem) => setAvailable(availableItem)}
            selectedUser={selectedUser}
            setSelectedUser={(selectedItem) =>  setSelected(selectedItem)}
            rowKey='userId'
          />

          <div style={{marginTop: '20px'}}>
            <Button style={{float: 'right'}}
                color="link"
                onClick={ handleTask }
                disabled = { isNextBtnDisabled }
              >
                Next
            </Button>
          </div>
        </>
      }
    </>
	)
}

BulkSipTrunkingTrunkPilotUser.propTypes = {
  localStorageKey: PropTypes.string,
  initialData: PropTypes.object,
  handleWizData: PropTypes.func.isRequired,
  setToNext: PropTypes.func
}
