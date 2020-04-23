import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'rbx'
import { BulkImportUpload } from '@/components/bulk/bulk-sip-trunking-upload/bulk-import-upload'

export const BulkSipTrunkingUploadTask = props => {

  const memoizedValue = useMemo(
    () => (
      <BulkImportUpload
        {...props}
        expectedTaskType={props.task}
      />
    ),
    [props]
  )

  return (
    <>
      {memoizedValue}
      <div style={{ marginTop: '20px' }}>
        <Button
          style={{ float: 'right' }}
          color="link"
          onClick={props.setToNext}
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
