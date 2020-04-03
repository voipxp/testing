import React, { useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'rbx'
import { BulkImportUpload } from '@/components/bulk/bulk-sip-trunking-upload/bulk-import-upload'
import {TaskService} from '@/api/task/task-service'
import { useAlerts } from '@/store/alerts'
import GroupDeviceAPI from '@/api/groups/group-device-service'

export const BulkSipTrunkingTrunkGroupsTask = (props) => {
  const { alertDanger } = useAlerts()
  const { serviceProviderId, groupId, localStorageKey } = {...props}
  const [isNextBtnDisabled, setDisableNextButton] = React.useState(false)

  const forceToCreateDeviceProfile = (serviceProviderId, groupId, deviceData) => {
    return GroupDeviceAPI.store(serviceProviderId, groupId, deviceData)
    .then(function(data) {
      return data
    })
    .finally(function(data) {
      return data
    })
    .catch(function(error) {
      //alertDanger('Access Device Creation is failed ' + error)
    })
  }

  const finalActions = (data) => {
  const deviceData = {
      "deviceType": data['accessDevice.deviceType'],
      "deviceName": data['accessDevice.deviceName'],
      "deviceLevel": data['accessDevice.deviceLevel'],
      "serviceProviderId": data.serviceProviderId,
      "groupId": data.groupId
  }
  if(!deviceData['deviceType']) return Promise.resolve()
	return forceToCreateDeviceProfile(data.serviceProviderId, data.groupId, deviceData)
  }

  const memoizedValue = useMemo(() =>
    <BulkImportUpload
		{...props}
		expectedTaskType={props.task}
		setDisableNextButton={ (boolValue) => setDisableNextButton(boolValue) }
		beforComplete = {(data) => finalActions(data[0])}
	/>,
  [props]);

	return (
		<>
      { memoizedValue }
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

BulkSipTrunkingTrunkGroupsTask.propTypes = {
  localStorageKey: PropTypes.string,
  setToNext: PropTypes.func
}
