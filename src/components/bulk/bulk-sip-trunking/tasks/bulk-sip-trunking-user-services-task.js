import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'rbx'
import { BulkImportStorage } from '@/components/bulk'
export const BulkSipTrunkingUserServicesTask = (
  {
    localStorageKey,
    initialData,
    setToNext
  }
) => {
  const [isNextBtnDisabled, setDisableNextButton] = useState(true)

  const memoizedValue = useMemo(() =>
    <BulkImportStorage
      localStorageKey={ localStorageKey }
      setDisableNextButton={ (boolValue) => setDisableNextButton(boolValue) }
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
