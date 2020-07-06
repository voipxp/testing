import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { UiCard, UiButton } from '@/components/ui'
import { BulkSelectGroupId } from '../bulk-select-group-id'
import { useAcl } from '@/utils'
import { useSession } from '@/store/session'

export const BulkUserPasswordGroup = ({
  initialData = {},
  setToNext,
  whenTaskIsCompleted,
  handleWizData,
  name
}) => {
  const { serviceProviderId } = initialData
  const isNextBtnDisabled = true
  const acl = useAcl()
  const { session } = useSession()

  useEffect(() => {
    whenTaskIsCompleted(name, false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectGroupId = spRow => {
    handleWizData({ ...initialData, groupId: spRow.groupId })
    setToNext()
    whenTaskIsCompleted(name, true)
  }

  useEffect(() => {
    if(acl.is('Group')) {
      handleWizData({ ...initialData, 'groupId': session.groupId})
      setToNext()
      whenTaskIsCompleted(name, true)
    }
  }, [acl, session.groupId, handleWizData, initialData, name, setToNext, whenTaskIsCompleted])

  return (
    <>
      <UiCard title="Select Group">
        <BulkSelectGroupId
          serviceProviderId={serviceProviderId}
          selectGroup={selectGroupId}
        />
      </UiCard>
      <div style={{ marginTop: '20px' }}>
        <UiButton
          icon='right'
          style={{ float: 'right' }}
          color="link"
          onClick={setToNext}
          disabled={isNextBtnDisabled}
        >
          Next
        </UiButton>
      </div>
    </>
  )
}

BulkUserPasswordGroup.propTypes = {
  initialData: PropTypes.object,
  handleWizData: PropTypes.func.isRequired,
  setToNext: PropTypes.func,
  whenTaskIsCompleted: PropTypes.func,
  name: PropTypes.string
}
