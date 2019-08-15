import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useAlerts } from '@/store/alerts'
import { useUi } from '@/store/ui'
import apiResellers from '@/api/resellers'
import { UiCardModal } from '@/components/ui'

export const ResellerDelete = ({ match }) => {
  const { resellerId } = match.params
  const { alertWarning, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [showConfirm, setShowConfirm] = useState(false)

  const remove = () => {
    setShowConfirm(false)
    destroy(resellerId)
  }

  async function destroy(resellerId) {
    showLoadingModal()
    try {
      await apiResellers.destroy(resellerId)
      alertWarning('Reseller Deleted')
    } catch (error) {
      alertDanger(error)
    } finally {
      hideLoadingModal()
    }
  }

  return (
    <>
      <h1>Delete Me</h1>

      <UiCardModal
        title="Please Confirm"
        isOpen={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onDelete={remove}
      >
        <blockquote>
          Are you sure you want to Remove this Alternate User Id?
        </blockquote>
      </UiCardModal>
    </>
  )
}

ResellerDelete.propTypes = {
  match: PropTypes.object.isRequired
}
