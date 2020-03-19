import React, { useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { StorageService, UtilityService } from '@/utils'
import { Button } from 'rbx'
import { BulkImportStorage } from '@/components/bulk'
import {
  UiDataTable
} from '@/components/ui'

export const BulkMultipleTasksImport = (props) => {
  const [isNextBtnDisabled, setDisableNextButton] = React.useState(true)

  const memoizedValue = useMemo(() =>
    <BulkImportStorage
    {...props}
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
              disabled = { isNextBtnDisabled }
            >
              Next
        </Button>
      </div>
		</>
	)
}


BulkMultipleTasksImport.propTypes = {
  localStorageKey: PropTypes.string,
  setToNext: PropTypes.func
}
