import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'rbx'
import { BulkImportStorage } from '@/components/bulk'
import _ from 'lodash'
export const BulkSipTrunkingUserServicesTask = (
  {
    localStorageKey,
    initialData,
    setToNext
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
      // onLoad = {updateTaskData}
      initialData={initialData}
      addUsers={true}
  />,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [localStorageKey]);

	return (
		<>
      { memoizedValue }
      <div style={{marginTop: '20px'}}>
        <Button style={{float: 'right'}}
              color="link"
              onClick={setToNext}
              disabled = { isNextBtnDisabled }
            >
              Next
        </Button>
      </div>
		</>
	)
}

BulkSipTrunkingUserServicesTask.propTypes = {
  localStorageKey: PropTypes.string,
  initialData: PropTypes.object,
  setToNext: PropTypes.func
}