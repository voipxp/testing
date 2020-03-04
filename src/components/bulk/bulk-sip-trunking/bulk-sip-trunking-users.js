import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { UiCard, UiCardModal, UiButton, UiLoading, UiDataTable } from '@/components/ui'
import { useAsync } from 'react-async-hook'
import { Button } from 'rbx'
import { BulkCloneGroupAllControl } from '../bulk-group-clone/bulk-clone-group-all-control'
// import { BulkSelectServiceProviderId } from '../bulk-select-service-provider-id'
import { BulkSelectGroupId } from '../bulk-select-group-id'
import { BulkImportService } from '@/components/bulk/service/bulk-import-service'
import { BulkSelectUserId } from '../bulk-select-user-id'
import { BulkCreateUser } from '../bulk-create-user'
import { useAlerts } from '@/store/alerts'
import { prototype } from 'clipboard'


export const BulkSipTrunkingUsers = (props) => {

  const { serviceProviderId, groupId, enterpriseTrunkName, groupTrunk} = props.initialData
  const { alertSuccess, alertDanger, alertWarning } = useAlerts()
  const [taskData, setTaskData] = React.useState({})
  const [isNextBtnDisabled, setDisableNextButton] = React.useState(true)
  const [createUserClicked, setCreateUserClicked] = React.useState(false)
  const [selectedItems, setSelectedItems] = React.useState({availableUser:[], selectedUser: []})
  // const [selectedServiceProviderId, setSelectedGroupId] = React.useState('')

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

	const saveCloneGroup = () => {
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
        const task = {
          task: 'user.create',
          numberofUsers: taskData.numberofUsers,
          userId: taskData.userId,
          lastName: taskData.lastName,
          firstName: taskData.firstName,
          callingLineIdLastName: taskData.callingLineIdLastName,
          callingLineIdFirstName: taskData.callingLineIdFirstName,
          password: taskData.password,
          phoneNumber: taskData.phoneNumber,
          activatePhoneNumber: taskData.activatePhoneNumber,
          extension: taskData.extension,
          callingLineIdPhoneNumber: taskData.callingLineIdPhoneNumber,
          timeZone: taskData.timeZone,
          language: taskData.language,
          networkClassOfService: taskData.networkClassOfService,
          mobilePhoneNumber: taskData.mobilePhoneNumber,
          pagerPhoneNumber: taskData.pagerPhoneNumber,
          emailAddress: taskData.emailAddress,
          addressLocation: taskData.addressLocation,
          department: taskData.department,
          address: taskData.address,
          domain: taskData.domain,
          endpointType: 'trunkAddressing',
          'trunkAddressing.enterpriseTrunkName': taskData.trunkAddressing.enterpriseTrunkName,
          'trunkAddressing.trunkGroupDeviceEndpoint.name': taskData.trunkAddressing.trunkGroupDeviceEndpoint.name,
          'trunkAddressing.trunkGroupDeviceEndpoint.linePort': taskData.trunkAddressing.trunkGroupDeviceEndpoint.linePort,
          allowAccessDeviceUpdate: taskData.allowAccessDeviceUpdate
        }

        task['trunkAddressing.enterpriseTrunkName'] = enterpriseTrunkName
        task['trunkAddressing.trunkGroupDeviceEndpoint.name'] = groupTrunk
        // task['trunkAddressing.trunkGroupDeviceEndpoint.linePort'] = serviceProviderId
        task['serviceProviderId'] = serviceProviderId
        task['groupId'] = groupId
        tasks.push(task)

      return tasks
  }

  const createUserModal = (
    <>
      <UiCardModal
        title="Create Users"
        isOpen={createUserClicked}
        onCancel={() => setCreateUserClicked(false)}
		    onSave={saveCloneGroup}
      >
        <BulkCreateUser
          {...props}
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
