import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'rbx'
import { BulkImportStorage } from '@/components/bulk'

export const BulkSipTrunkingUserServicesTask = (
  {
    localStorageKey,
    initialData,
    complete
  }
) => {
  const [isNextBtnDisabled, setDisableNextButton] = useState(true)

  const updateTaskData = (data, setData) => {
    const newData = []
    if(data.length > 0) {
      initialData.users.forEach( (userId, index) => {
        const temp = {...data[0]}
        temp.userId = userId
        newData.push(temp)
      })
      if(! _.isEqual(data, newData)) setData(newData)
    }
  }

  const memoizedValue = useMemo(() =>
    <BulkImportStorage
      localStorageKey={ localStorageKey }
      setDisableNextButton={ (boolValue) => setDisableNextButton(boolValue) }
      onLoad = {updateTaskData}
  />,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [localStorageKey]);

	return (
		<>
      { memoizedValue }
      <div style={{marginTop: '20px'}}>
        <Button style={{float: 'right'}}
              color="success"
              onClick={complete}
              disabled = { isNextBtnDisabled }
            >
              Done
        </Button>
      </div>
		</>
	)
}

BulkSipTrunkingUserServicesTask.propTypes = {
  localStorageKey: PropTypes.string,
  initialData: PropTypes.object,
  complete: PropTypes.func
}
