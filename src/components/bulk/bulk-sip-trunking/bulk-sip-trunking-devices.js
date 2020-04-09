import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { UiCard, UiCardModal, UiButton, UiLoading, UiDataTable } from '@/components/ui'
import serviceProviderApi from '@/api/service-providers'
import { useAsync } from 'react-async-hook'
import { Button } from 'rbx'
import { BulkEnterpriseCloneAllControls } from '../bulk-enterprise-clone/bulk-enterprise-clone-all-controls'
// import { BulkSelectServiceProviderId } from '../bulk-select-service-provider-id'
import { BulkSelectGroupId } from '../bulk-select-group-id'
import { BulkSelectDevices } from '../bulk-select-devices'
import { BulkAddNewDevice } from '../bulk-add-new-device'
import { BulkImportService } from '@/components/bulk/service/bulk-import-service'
import { useAlerts } from '@/store/alerts'
import { prototype } from 'clipboard'

const columns = [
  {
    key: 'serviceProviderId',
    label: 'serviceProviderId'
  },
  {
    key: 'serviceProviderName',
    label: 'serviceProviderName'
  },
  {
    key: 'resellerId',
    label: 'resellerId'
  }
]

export const BulkSipTrunkingDevices = ({
  initialData={},
  setToNext,
  handleWizData,
  localStorageKey
}) => {

  const { alertSuccess, alertDanger, alertWarning } = useAlerts()
	const [taskData, setTaskData] = React.useState({})
  const [isNextBtnDisabled, setDisableNextButton] = React.useState(true)
  const [add, setAdd] = React.useState(false)

  const setTaskDataHandler = (data) => {
    setTaskData(data)
  }

  const selectDevice = (row) => {
    const deviceName = row.deviceName
    handleWizData({...initialData, deviceName: deviceName })
	  setToNext()
  }

  const createTask = () => {
		setAdd(false)
		prepareImportData().then((data) => {
      Promise.all([BulkImportService.handleFileData(data, localStorageKey)]).then( (data) => {
        alertSuccess('Task created successfully.')
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
        "task": 'group.device.create',
        "deviceType": taskData.deviceType,
        "deviceName": taskData.deviceName,
        "accessDeviceEndpoint.accessDevice.deviceType": taskData.deviceType,
        "accessDeviceEndpoint.accessDevice.deviceName": taskData.deviceName,
        "accessDeviceEndpoint.accessDevice.protocol": taskData.protocol,
        "accessDeviceEndpoint.accessDevice.netAddress": taskData.netAddress,
        "accessDeviceEndpoint.accessDevice.port": taskData.port,
        "accessDeviceEndpoint.accessDevice.outboundProxyServerNetAddress": taskData.outboundProxyServerNetAddress,
        "accessDeviceEndpoint.accessDevice.stunServerNetAddress": taskData.stunServerNetAddress,
        "accessDeviceEndpoint.accessDevice.macAddress": taskData.macAddress,
        "accessDeviceEndpoint.accessDevice.serialNumber": taskData.serialNumber,
        "accessDeviceEndpoint.accessDevice.description": taskData.description,
        "accessDeviceEndpoint.accessDevice.physicalLocation": taskData.physicalLocation,
        "accessDeviceEndpoint.accessDevice.transportProtocol": taskData.transportProtocol,
      }

      if(taskData.credentials === 'custom') {
        task["accessDeviceEndpoint.accessDevice.accessDeviceCredentials.userName"] = taskData.userName
        task["accessDeviceEndpoint.accessDevice.accessDeviceCredentials.password"] = taskData.password
      }
      task['serviceProviderId'] = initialData.serviceProviderId
      task['groupId'] = initialData.groupId

      tasks.push(task)

      /* Set to props which will be used in the next component, This is HOC */
      handleWizData({...initialData, deviceName:  task.deviceName})

      return tasks
  }

  const cloneGroupModal = (
    <>
      <UiCardModal
        title="New Device"
        isOpen={add}
        onCancel={() => setAdd(false)}
		    onSave={createTask}
      >
        <BulkAddNewDevice
         setTaskData={setTaskDataHandler}
         serviceProviderId={initialData.serviceProviderId}
         groupId={initialData.groupId}
        />
      </UiCardModal>
    </>
  )

  return (
    <>
      { cloneGroupModal }
      <UiCard
        title="Devices"
        buttons={
          <>
            <UiButton
              color="link"
              icon="add"
              size="small"
              onClick={() => setAdd(true)}
            />
          </>
        }
      >
      <BulkSelectDevices
        selectGroupTrunk={selectDevice}
        initialData={initialData}
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

BulkSipTrunkingDevices.propTypes = {
  localStorageKey: PropTypes.string,
  initialData: PropTypes.object,
  handleWizData: PropTypes.func.isRequired,
  setToNext: PropTypes.func
}
