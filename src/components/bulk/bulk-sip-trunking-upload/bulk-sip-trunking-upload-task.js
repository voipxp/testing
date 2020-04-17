import React, { useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'rbx'
import { BulkImportUpload } from '@/components/bulk/bulk-sip-trunking-upload/bulk-import-upload'

export const BulkSipTrunkingUploadTask = (props) => {
  const [isNextBtnDisabled, setDisableNextButton] = React.useState(false)

  const memoizedValue = useMemo(() =>
    <BulkImportUpload
    {...props}
    expectedTaskType={props.task}
    setDisableNextButton={ (boolValue) => setDisableNextButton(boolValue) }
  />,
  [props]);

	return (
		<>
      { memoizedValue }
      <div style={{marginTop: '20px'}}>
        <Button style={{float: 'right'}}
              color="link"
              onClick={ props.setToNext}
              // disabled = { isNextBtnDisabled }
            >
              Next
        </Button>
      </div>
		</>
	)
}

BulkSipTrunkingUploadTask.propTypes = {
  localStorageKey: PropTypes.string,
  task: PropTypes.string,
  setToNext: PropTypes.func
}
