import React from 'react'
import PropTypes from 'prop-types'
import { UiCard, UiCardModal, UiButton } from '@/components/ui'
import { Button } from 'rbx'
import _ from 'lodash'
import { BulkImportService } from '@/components/bulk/service/bulk-import-service'
import { BulkSelectUserId } from '../bulk-select-user-id'
import { BulkCreateUser } from '../bulk-create-user'
import { useAlerts } from '@/store/alerts'

export const BulkSipTrunkingUsers = (props) => {

  const {
    serviceProviderId,
    groupId,
    enterpriseTrunkName,
    groupTrunk,
    phoneNumbers,
    sourceServiceProviderId,
    sourceGroupId
  } = props.initialData

  const newServiceProviderId = sourceServiceProviderId !== '' ? sourceServiceProviderId : serviceProviderId
  const newGroupId = sourceGroupId !== '' ? sourceGroupId : groupId

  const { alertDanger } = useAlerts()
  const [taskData, setTaskData] = React.useState({})
  const [isNextBtnDisabled, setDisableNextButton] = React.useState(true)
  const [createUserClicked, setCreateUserClicked] = React.useState(false)
  const [selectedItems, setSelectedItems] = React.useState({availableUser:[], selectedUser: []})

  const setStateTaskData = (data) => {
    setTaskData(data)
  }

  const settUsers = (usersData) => {
    const temp = {
      availableUser: usersData.availableUser,
      selectedUser: usersData.selectedUser
    }
    setSelectedItems(temp)
    setDisableNextButton(false)
    //setDisableNextButton(temp.selectedUser.length <= 0)
  }

	const createTask = () => {
		setCreateUserClicked(false)
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
      for (var i = 0; i < taskData.userCount; i++) {
        const task = {
          task: 'user.create',
          userId: taskData.userId + '@{{ domain }}',
          lastName: taskData.lastName,
          firstName: taskData.firstName,
          callingLineIdLastName: taskData.callingLineIdLastName,
          callingLineIdFirstName: taskData.callingLineIdFirstName,
          password: taskData.password,
          passcode: taskData.passcode,
          phoneNumber: _.get(taskData, 'phoneNumber.' + i, null),
          activatePhoneNumber: taskData.activatePhoneNumber,
          extension: taskData.extension,
          callingLineIdPhoneNumber: taskData.callingLineIdPhoneNumber,
          timeZone: taskData.timeZone,
          language: taskData.language,
          networkClassOfService: taskData.networkClassOfService,
          mobilePhoneNumber: taskData.mobilePhoneNumber,
          stateOrProvince: taskData.stateOrProvince,
          pagerPhoneNumber: taskData.pagerPhoneNumber,
          emailAddress: taskData.emailAddress,
          addressLocation: taskData.addressLocation,
          department: taskData.department,
          address: taskData.address,
          domain: taskData.domain,
          endpointType: 'trunkAddressing',
          // 'trunkAddressing.enterpriseTrunkName': taskData.trunkAddressing.enterpriseTrunkName,
          // 'trunkAddressing.trunkGroupDeviceEndpoint.name': taskData.trunkAddressing.trunkGroupDeviceEndpoint.name,
          // 'trunkAddressing.trunkGroupDeviceEndpoint.linePort': taskData.trunkAddressing.trunkGroupDeviceEndpoint.linePort,
          allowAccessDeviceUpdate: taskData.allowAccessDeviceUpdate
        }

        task['trunkAddressing.enterpriseTrunkName'] = enterpriseTrunkName
        task['trunkAddressing.trunkGroupDeviceEndpoint.name'] = groupTrunk
        task['serviceProviderId'] = serviceProviderId
        task['groupId'] = groupId

        if(groupTrunk) {
          const linePortDomain = taskData.linePortDomain
          task['trunkAddressing.trunkGroupDeviceEndpoint.linePort'] = (taskData.trunkAddressing.trunkGroupDeviceEndpoint.linePort + '@' + linePortDomain)
        }

        if(task.extension === "extensionRange") {
          task.extension = parseInt(taskData.extensionRange) + i
        }

        // make strings so they are editable in review page
        if (taskData.activatePhoneNumber) {
          task.activatePhoneNumber = 'true'
        } else if (taskData.activatePhoneNumber === false) {
          task.activatePhoneNumber = 'false'
        }

        tasks.push(task)
      }

      return tasks
  }

  const createUserModal = (
    <>
      <UiCardModal
        title="Create Users"
        isOpen={createUserClicked}
        onCancel={() => setCreateUserClicked(false)}
		    onSave={createTask}
      >
        <BulkCreateUser
          serviceProviderId={newServiceProviderId}
          groupId={newGroupId}
          enterpriseTrunkName={enterpriseTrunkName}
          groupTrunk={groupTrunk}
          phoneNumbers={phoneNumbers}
          setTaskData={setStateTaskData}
        />
      </UiCardModal>
    </>
  )

  return (
    <>
      { (createUserClicked) ? createUserModal : null}
      <UiCard
        title="Select Users"
        buttons={
          <>
            <UiButton
              color="link"
              icon="add"
              size="small"
              onClick={() => setCreateUserClicked(true)}
            />
          </>
        }
      >
      <BulkSelectUserId
        // serviceProviderId = {props.initialData.serviceProviderId}
        // groupId = {props.initialData.groupId}
        serviceProviderId = {serviceProviderId}
        groupId = {groupId}
        settUsers={settUsers}
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

BulkSipTrunkingUsers.propTypes = {
  localStorageKey: PropTypes.string,
  initialData: PropTypes.object,
  handleWizData: PropTypes.func.isRequired,
  setToNext: PropTypes.func
}
