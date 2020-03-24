import React, { useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'rbx'
import { BulkImportStorage } from '@/components/bulk'
import {TaskService} from '@/api/task/task-service'
import { useAlerts } from '@/store/alerts'

export const BulkSipTrunkingGroupServicesTask = (props) => {

  const { serviceProviderId, groupId, localStorageKey } = {...props}
  const [isNextBtnDisabled, setDisableNextButton] = React.useState(true)

  const memoizedValue = useMemo(() =>
    <BulkImportStorage
      localStorageKey={ localStorageKey }
      setDisableNextButton={ (boolValue) => setDisableNextButton(boolValue) }
	  excludeElement={['.assigned', '.authorized']}
  />,
  [props]);


	return (
		<>
      { memoizedValue }
      <div style={{marginTop: '20px'}}>
        <Button style={{float: 'right'}}
              color="success"
              onClick={ props.complete}
              disabled = { isNextBtnDisabled }
            >
              Done
        </Button>
      </div>
		</>
	)
}

BulkSipTrunkingGroupServicesTask.propTypes = {
  localStorageKey: PropTypes.string,
  complete: PropTypes.func,
}
