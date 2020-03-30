import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { UiCard, UiCardModal, UiButton, UiLoading, UiDataTable } from '@/components/ui'
import serviceProviderApi from '@/api/service-providers'
import { useAsync } from 'react-async-hook'
import { Button } from 'rbx'
import { BulkEnterpriseCloneAllControls } from '../bulk-enterprise-clone/bulk-enterprise-clone-all-controls'
// import { BulkSelectServiceProviderId } from '../bulk-select-service-provider-id'
import { BulkSelectGroupId } from '../bulk-select-group-id'
import { BulkSelectGroupTrunk } from '../bulk-trunk-group/bulk-select-group-trunk'
import { BulkAddTrunkGroup } from '../bulk-trunk-group/bulk-add-trunk-group'
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

export const BulkSipTrunkingTrunkGroups = ({
  initialData={},
  setToNext,
  handleWizData,
  localStorageKey
}) => {

  const { alertSuccess, alertDanger, alertWarning } = useAlerts()
	const [taskData, setTaskData] = React.useState({})
  const [isNextBtnDisabled, setDisableNextButton] = React.useState(false)
  const [add, setAdd] = React.useState(false)

  const setTaskDataHandler = (data) => {
    setTaskData(data)
  }

  const selectGroupTrunk = (row) => {
    const groupTrunk = row.name
    handleWizData({...initialData, groupTrunk: groupTrunk })
	  setToNext()
  }

  const createTask = () => {
		setAdd(false)
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
        "task": 'group.trunk.group.add',
        "name": taskData.name,
        "allowTerminationToDtgIdentity": taskData.allowTerminationToDtgIdentity,
        "allowTerminationToTrunkGroupIdentity": taskData.allowTerminationToTrunkGroupIdentity,
        "allowUnscreenedCalls": taskData.allowUnscreenedCalls,
        "allowUnscreenedEmergencyCalls": taskData.allowUnscreenedEmergencyCalls,
        "capacityExceededTrapInitialCalls": taskData.capacityExceededTrapInitialCalls,
        "capacityExceededTrapOffsetCalls": taskData.capacityExceededTrapOffsetCalls,
        "clidSourceForScreenedCallsPolicy": taskData.clidSourceForScreenedCallsPolicy,
        "continuousOptionsSendingIntervalSeconds": taskData.continuousOptionsSendingIntervalSeconds,
        "enableBursting": taskData.enableBursting,
        "enableNetworkAddressIdentity": taskData.enableNetworkAddressIdentity,
        "failureOptionsSendingIntervalSeconds": taskData.failureOptionsSendingIntervalSeconds,
        "failureThresholdCounter": taskData.failureThresholdCounter,
        "includeDtgIdentity": taskData.includeDtgIdentity,
        "includeOtgIdentityForNetworkCalls": taskData.includeOtgIdentityForNetworkCalls,
        "includeTrunkGroupIdentity": taskData.includeTrunkGroupIdentity,
        "includeTrunkGroupIdentityForNetworkCalls": taskData.includeTrunkGroupIdentityForNetworkCalls,
        "invitationTimeout": taskData.invitationTimeout,
        "inviteFailureThresholdCounter": taskData.inviteFailureThresholdCounter,
        "inviteFailureThresholdWindowSeconds": taskData.inviteFailureThresholdWindowSeconds,
        "pilotUserCallOptimizationPolicy": taskData.pilotUserCallOptimizationPolicy,
        "pilotUserCallingLineAssertedIdentityPolicy": taskData.pilotUserCallingLineAssertedIdentityPolicy,
        "pilotUserCallingLineIdentityForEmergencyCallsPolicy": taskData.pilotUserCallingLineIdentityForEmergencyCallsPolicy,
        "pilotUserCallingLineIdentityForExternalCallsPolicy": taskData.pilotUserCallingLineIdentityForExternalCallsPolicy,
        "pilotUserChargeNumberPolicy": taskData.pilotUserChargeNumberPolicy,
        "prefix": taskData.prefix,
        "prefixEnabled": taskData.prefixEnabled,
        "requireAuthentication": taskData.requireAuthentication,
        "routeToPeeringDomain": taskData.routeToPeeringDomain,
        "sendContinuousOptionsMessage": taskData.sendContinuousOptionsMessage,
        "statefulReroutingEnabled": taskData.statefulReroutingEnabled,
        "successThresholdCounter": taskData.successThresholdCounter,
        "trunkGroupIdentity": taskData.trunkGroupIdentity,
        "useSystemCLIDSourceForScreenedCallsPolicy": taskData.useSystemCLIDSourceForScreenedCallsPolicy,
        "useSystemCallingLineAssertedIdentityPolicy": taskData.useSystemCallingLineAssertedIdentityPolicy,
        "useSystemUserLookupPolicy": taskData.useSystemUserLookupPolicy,
        "userLookupPolicy": taskData.userLookupPolicy,
        "maxActiveCalls": taskData.maxActiveCalls,
        "maxIncomingCalls": taskData.maxIncomingCalls,
        "maxOutgoingCalls": taskData.maxOutgoingCalls,
        "otgDtgIdentity": taskData.otgDtgIdentity
      }

      if(!taskData.accessDevice.newDevice) {
        task["accessDevice.deviceName"] = taskData.accessDevice.selectedDevice
        task["accessDevice.deviceLevel"] = "Group"
      }
      else {
        task["accessDevice.deviceType"] = taskData.accessDevice.accessDeviceType
        task["accessDevice.deviceName"] = taskData.accessDevice.accessDeviceName
        task["accessDevice.deviceLevel"] = "Group"
      }
      task['serviceProviderId'] = initialData.serviceProviderId
      task['groupId'] = initialData.groupId

      tasks.push(task)

      /* Set to props which will be used in the next component, This is HOC */
      handleWizData({...initialData, groupTrunk:  task.name})

      return tasks
  }

  const cloneGroupModal = (
    <>
      <UiCardModal
        title="Add Trunk Group"
        isOpen={add}
        onCancel={() => setAdd(false)}
		    onSave={createTask}
      >
        <BulkAddTrunkGroup
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
        title="Group Trunk"
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
      <BulkSelectGroupTrunk
        selectGroupTrunk={selectGroupTrunk}
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

BulkSipTrunkingTrunkGroups.propTypes = {
  localStorageKey: PropTypes.string,
  initialData: PropTypes.object,
  handleWizData: PropTypes.func.isRequired,
  setToNext: PropTypes.func
}
