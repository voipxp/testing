import React from 'react'
import PropTypes from 'prop-types'
import { UiCard, UiCardModal, UiButton } from '@/components/ui'
import { Button } from 'rbx'
import { BulkSelectGroupTrunk } from '../bulk-trunk-group/bulk-select-group-trunk'
import { BulkAddTrunkGroup } from '../bulk-trunk-group/bulk-add-trunk-group'
import { BulkImportService } from '@/components/bulk/service/bulk-import-service'
import { useAlerts } from '@/store/alerts'

export const BulkSipTrunkingTrunkGroups = ({
  initialData={},
  setToNext,
  handleWizData,
  localStorageKey
}) => {
  const { serviceProviderId, sourceServiceProviderId } = initialData
  const sourceSPId = (sourceServiceProviderId && sourceServiceProviderId!== '') ? sourceServiceProviderId : serviceProviderId
  const { alertSuccess, alertDanger } = useAlerts()
	const [taskData, setTaskData] = React.useState({})
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
        "task": 'group.trunk.group.create',
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
        "prefixEnabled": taskData.prefixEnabled,
        "requireAuthentication": taskData.requireAuthentication,
        "sipAuthenticationUserName": taskData.sipAuthenticationUserName,
        "sipAuthenticationPassword": taskData.sipAuthenticationPassword,
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

      task["accessDevice.deviceName"] = taskData.accessDevice.accessDeviceName
      task["accessDevice.deviceLevel"] = "Group"
      if (taskData.prefixEnabled) task["prefix"] = taskData.prefix
      task['serviceProviderId'] = serviceProviderId
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
         serviceProviderId={sourceSPId}
         groupId={initialData.groupId}
         deviceName={initialData.deviceName}
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
