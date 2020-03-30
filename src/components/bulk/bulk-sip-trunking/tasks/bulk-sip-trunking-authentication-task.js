import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'rbx'
import { BulkImportStorage } from '@/components/bulk'
//import _ from 'lodash'
export const BulkSipTrunkingAuthenticationTask = (
  {
    localStorageKey,
    initialData,
    complete
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

BulkSipTrunkingAuthenticationTask.propTypes = {
  localStorageKey: PropTypes.string,
  initialData: PropTypes.object,
  complete: PropTypes.func
}
