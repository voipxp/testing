import React, { useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'rbx'
import { BulkImportStorage } from '@/components/bulk'

export const BulkSipTrunkingCommonViewTask = (props) => {

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

BulkSipTrunkingCommonViewTask.propTypes = {
  localStorageKey: PropTypes.string,
  setToNext: PropTypes.func
}
