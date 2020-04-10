import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'rbx'
import { BulkImportStorage } from '@/components/bulk'

export const BulkSipTrunkingTrunkGroupsTask = (props) => {
  const { localStorageKey } = {...props}
  const [isNextBtnDisabled, setDisableNextButton] = React.useState(true)

  const memoizedValue = useMemo(() =>
    <BulkImportStorage
      localStorageKey={ localStorageKey }
      setDisableNextButton={ (boolValue) => setDisableNextButton(boolValue) }
  />,
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

BulkSipTrunkingTrunkGroupsTask.propTypes = {
  localStorageKey: PropTypes.string,
  setToNext: PropTypes.func
}
