import React, {useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'
import { UiCard, UiButton } from '@/components/ui'
import _ from 'lodash'
import { BulkSelectUserId } from '../bulk-select-user-id'

export const BulkUserPasswordUsers = (
  {
    initialData = {},
    setToNext,
    handleWizData,
    whenTaskIsCompleted,
    name
  }
) => {
  const { serviceProviderId, groupId, users} = {...initialData}
  const [isNextBtnDisabled, setDisableNextButton] = React.useState(true)

  const setUsers = useCallback(usersData => {
    if(!_.isEqual(users, usersData)) {
      const temp = {...initialData}
      temp['users'] = [...usersData]
      handleWizData({...temp})
    }
  }, [handleWizData, initialData, users])

  useEffect(() => {
    whenTaskIsCompleted(name, false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setDisableNextButton(initialData['users'].length === 0)
  }, [initialData])

  const clickNext = () => {
    setToNext()
    whenTaskIsCompleted(name, true)
  }

  return (
    <>
      <UiCard title="Select Users">
        <BulkSelectUserId
          serviceProviderId={serviceProviderId}
          groupId={groupId}
          settUsers={setUsers}
        />
      </UiCard>
      <div style={{ marginTop: '20px' }}>
        <UiButton
          icon='right'
          style={{ float: 'right' }}
          color="link"
          onClick={clickNext}
          disabled={isNextBtnDisabled}
        >
          Next
        </UiButton>
      </div>
    </>
  )
}

BulkUserPasswordUsers.propTypes = {
  initialData: PropTypes.object,
  handleWizData: PropTypes.func.isRequired,
  setToNext: PropTypes.func,
  whenTaskIsCompleted: PropTypes.func,
  name: PropTypes.string
}
