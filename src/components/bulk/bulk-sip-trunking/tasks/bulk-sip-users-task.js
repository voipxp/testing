import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'rbx'
import { BulkImportStorage } from '@/components/bulk'

export const BulkSipUsersTask = ({
  localStorageKey,
  initialData,
  setToNext,
  handleWizData
}) => {
  const [isNextBtnDisabled, setDisableNextButton] = React.useState(true)

  const setUsers = data => {
    const users = []
    data.forEach(el => {
      users.push(el['userId'])
    })

    const tempInitData = { ...initialData }
    tempInitData['users'] = users
    handleWizData(tempInitData)
  }

  const memoizedValue = useMemo(
    () => (
      <BulkImportStorage
        localStorageKey={localStorageKey}
        setDisableNextButton={boolValue => setDisableNextButton(boolValue)}
        onComplete={(data, setData) => setUsers(data)}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [localStorageKey]
  )

  return (
    <>
      {memoizedValue}
      <div style={{ marginTop: '20px' }}>
        <Button
          style={{ float: 'right' }}
          color="link"
          onClick={setToNext}
          disabled={isNextBtnDisabled}
        >
          Next
        </Button>
      </div>
    </>
  )
}

BulkSipUsersTask.propTypes = {
  localStorageKey: PropTypes.string,
  initialData: PropTypes.object,
  setToNext: PropTypes.func,
  handleWizData: PropTypes.func
}
