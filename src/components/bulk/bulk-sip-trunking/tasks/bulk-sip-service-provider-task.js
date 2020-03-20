import React, { useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'rbx'
import { BulkImportStorage } from '@/components/bulk'
import {TaskService} from '@/api/task/task-service'
import { useAlerts } from '@/store/alerts'


export const BulkSipServiceProviderTask = (props) => {

  const { serviceProviderId, groupId, localStorageKey } = {...props}
  const [isNextBtnDisabled, setDisableNextButton] = React.useState(true)

  const forceToAssingServices = () => {
    const users = {
      serviceProviderId: serviceProviderId,
      groupId: groupId,
      groupServices: [
        {
            "serviceName": "Trunk Group",
            "authorized": true,
            "quantity": 30,
            "licensed": true,
            "userAssignable": true,
            "isUnlimited": true
        }
      ]
    }

    const taskTemp = {
      type: 'group.services.update',
      data: users
    }

    return TaskService.create(taskTemp)
    .then(function(data) {
      //alertSuccess('Import Queued: ' + data.id)
      // Route.open('bulk')
      return data
    })
    .finally(function(data) {
      return data
      // Alert.spinner.close()
    })
    .catch(function(error) {
      //alertDanger(error.data)
    })
  }
  const finalActions = () => {
    forceToAssingServices()
  }

  const memoizedValue = useMemo(() =>
    <BulkImportStorage
      localStorageKey={ localStorageKey }
      setDisableNextButton={ (boolValue) => setDisableNextButton(boolValue) }
      onImportComplete = {finalActions}
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

BulkSipServiceProviderTask.propTypes = {
  localStorageKey: PropTypes.string,
  setToNext: PropTypes.func
}
