import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { RESELLER_QUERY, RESELLER_UPDATE_MUTATION } from '@/graphql'
import { useAlert, useLoadingModal } from '@/utils'
import { Input, Column } from 'rbx'
import {
  UiLoadingCard,
  UiCard,
  UiButton,
  UiSection,
  UiListItem,
  UiCardModal,
  UiFormField
} from '@/components/ui'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useForm } from '@/utils'

export const ResellerProfile = ({ match }) => {
  const Alert = useAlert()
  const Loading = useLoadingModal()
  const { resellerId } = match.params
  const [showModal, setShowModal] = useState(false)

  // form
  const ref = useRef()
  const initialForm = { resellerId: '', resellerName: '' }
  const { form, setForm, onChange, isValid } = useForm(initialForm, ref)

  // graphql
  const { data, loading, error } = useQuery(RESELLER_QUERY, { variables: { resellerId } })
  const [updateReseller] = useMutation(RESELLER_UPDATE_MUTATION)

  if (!data && loading) return <UiLoadingCard />
  if (error) Alert.danger(error)

  const { reseller } = data

  function edit() {
    setForm({ ...reseller })
    setShowModal(true)
  }

  async function update() {
    Loading.show()
    try {
      await updateReseller({ variables: { input: form } })
      Alert.success('Reseller Updated')
      setShowModal(false)
    } catch (error_) {
      Alert.danger(error_)
    } finally {
      Loading.hide()
    }
  }

  return (
    <>
      <UiCard
        title="Reseller Profile"
        buttons={<UiButton color="link" icon="edit" size="small" onClick={edit} />}
      >
        <UiSection>
          <UiListItem label="Reseller ID">{reseller.resellerId}</UiListItem>
          <UiListItem label="Reseller Name">{reseller.resellerName}</UiListItem>
        </UiSection>
      </UiCard>

      <UiCardModal
        title="Edit Reseller"
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        saveDisabled={!isValid}
        onSave={update}
      >
        <form ref={ref}>
          <Column.Group>
            <Column>
              <UiFormField label="Reseller ID">
                <Input
                  type="text"
                  name="resellerId"
                  value={form.resellerId}
                  placeholder="Reseller ID"
                  readOnly
                  disabled
                />
              </UiFormField>
            </Column>
            <Column>
              <UiFormField label="Reseller Name">
                <Input
                  type="text"
                  name="resellerName"
                  value={form.resellerName || ''}
                  onChange={onChange}
                  placeholder="Reseller Name"
                />
              </UiFormField>
            </Column>
          </Column.Group>
        </form>
      </UiCardModal>
    </>
  )
}

ResellerProfile.propTypes = {
  match: PropTypes.object.isRequired
}
