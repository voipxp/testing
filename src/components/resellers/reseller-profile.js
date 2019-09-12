import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useAlert, useReseller, useResellerUpdate } from '@/graphql'
import { Loading } from '@/utils'
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

export const ResellerProfile = ({ match }) => {
  const { resellerId } = match.params
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({})
  const Alert = useAlert()
  const { data, loading, error } = useReseller(resellerId)
  const [updateReseller] = useResellerUpdate()

  if (error) Alert.danger(error)

  function handleInput(event) {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  function edit() {
    setForm({ ...data })
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

  return !data && loading ? (
    <UiLoadingCard />
  ) : (
    <>
      <UiCard
        title="Reseller Profile"
        buttons={<UiButton color="link" icon="edit" size="small" onClick={edit} />}
      >
        <UiSection>
          <UiListItem label="Reseller ID">{data.resellerId}</UiListItem>
          <UiListItem label="Reseller Name">{data.resellerName}</UiListItem>
        </UiSection>
      </UiCard>

      <UiCardModal
        title="Edit Reseller"
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={update}
      >
        <form>
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
                  value={form.resellerName}
                  onChange={handleInput}
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
