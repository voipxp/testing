import React, { useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'rbx'
import { BulkImportStorage } from '@/components/bulk'
import {TaskService} from '@/api/task/task-service'
import { useAlerts } from '@/store/alerts'
import GroupDeviceAPI from '@/api/groups/group-device-service'

export const BulkSipTrunkingTrunkGroupsTask = (props) => {
  const { alertDanger } = useAlerts()
  const { serviceProviderId, groupId, localStorageKey } = {...props}
  const [isNextBtnDisabled, setDisableNextButton] = React.useState(true)

  const forceToCreateDeviceProfile = (deviceData) => {
    return GroupDeviceAPI.store(serviceProviderId, groupId, deviceData)
    .then(function(data) {
      return data
    })
    .finally(function(data) {
      return data
    })
    .catch(function(error) {
      alertDanger('Access Device Creation is failed ' + error)
    })
  }

  const finalActions = (data) => {
  const deviceData = {
      "deviceType": data.accessDeviceType,
      "deviceName": data.accessDeviceName,
      "serviceProviderId": data.serviceProviderId,
      "groupId": data.groupId
  }
    forceToCreateDeviceProfile(deviceData)
  }

  const memoizedValue = useMemo(() =>
    <BulkImportStorage
      localStorageKey={ localStorageKey }
      setDisableNextButton={ (boolValue) => setDisableNextButton(boolValue) }
      onImportComplete = {(data) => finalActions(data)}
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
