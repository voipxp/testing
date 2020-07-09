import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { UiCard, UiButton } from '@/components/ui'
import { BulkSelectServiceProviderId } from '../bulk-select-service-provider-id'
import { useAcl } from '@/utils'
import { useSession } from '@/store/session'

export const BulkUserPasswordServiceProvider = ({
  initialData = {},
  setToNext,
  whenTaskIsCompleted,
  handleWizData,
  name
}) => {
  const isNextBtnDisabled = true
  const acl = useAcl()
  const { session } = useSession()

  useEffect(() => {
    whenTaskIsCompleted(name, false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectServiceProvider = spRow => {
    handleWizData({ ...initialData, 'serviceProviderId': spRow.serviceProviderId })
    setToNext()
    whenTaskIsCompleted(name, true)
  }

  useEffect(() => {
    if(acl.is('Service Provider') || acl.is('Group')) {
      handleWizData({ ...initialData, 'serviceProviderId': session.serviceProviderId})
      setToNext()
      whenTaskIsCompleted(name, true)
    }
  }, [acl, session.serviceProviderId, handleWizData, initialData, name, setToNext, whenTaskIsCompleted])

  return (
    <>
      <UiCard title="Service Providers">
        <BulkSelectServiceProviderId selectSP={selectServiceProvider} />
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

BulkUserPasswordServiceProvider.propTypes = {
  initialData: PropTypes.object,
  handleWizData: PropTypes.func.isRequired,
  setToNext: PropTypes.func,
  whenTaskIsCompleted: PropTypes.func,
  name: PropTypes.string
}
