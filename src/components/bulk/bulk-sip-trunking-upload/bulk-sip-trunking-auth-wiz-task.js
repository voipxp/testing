import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'rbx'
import { BulkImportUpload } from '@/components/bulk/bulk-sip-trunking-upload/bulk-import-upload'

export const BulkSipTrunkingAuthWizTask = props => {

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
          color="success"
          onClick={props.complete}
        >
          Done
        </Button>
      </div>
    </>
  )
}

BulkSipTrunkingAuthWizTask.propTypes = {
  localStorageKey: PropTypes.string,
  task: PropTypes.string,
  complete: PropTypes.func
}
