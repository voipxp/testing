import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useLoadingModal, RESELLER_DELETE_MUTATION, RESELLER_LIST_QUERY } from '@/graphql'
import { useAlert } from '@/utils'
import { UiCard, UiCardModal, UiButton } from '@/components/ui'
import { useMutation } from '@apollo/react-hooks'

export const ResellerDelete = ({ match, history }) => {
  const Alert = useAlert()
  const Loading = useLoadingModal()
  const { resellerId } = match.params
  const [showConfirm, setShowConfirm] = useState(false)

  const [deleteReseller] = useMutation(RESELLER_DELETE_MUTATION, {
    refetchQueries: [{ query: RESELLER_LIST_QUERY }]
  })

  const remove = () => {
    setShowConfirm(false)
    destroy(resellerId)
  }

  async function destroy(resellerId) {
    Loading.show()
    try {
      await deleteReseller({ variables: { resellerId } })
      Alert.warning('Reseller Deleted')
      history.push('/system/resellers')
    } catch (error) {
      Alert.danger(error)
    } finally {
      Loading.hide()
    }
  }

  return (
    <>
      <UiCard title="Delete Reseller">
        <UiButton
          style={{ float: 'right' }}
          icon="delete"
          color="danger"
          onClick={() => setShowConfirm(true)}
        >
          Delete
        </UiButton>
        <p className="subtitle">Click the delete button to permanently remove this Reseller.</p>
      </UiCard>

      <UiCardModal
        title="Please Confirm"
        isOpen={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onDelete={remove}
      >
        <blockquote>Are you sure you want to Remove this Reseller?</blockquote>
      </UiCardModal>
    </>
  )
}

ResellerDelete.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
