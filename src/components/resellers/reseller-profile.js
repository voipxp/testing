import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import apiResellers from '@/api/resellers'
import { Alert, Loading } from '@/utils'
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
  const [resellerName, setResellerName] = useState('')
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({})

  const loadReseller = useCallback(async () => {
    try {
      const reseller = await apiResellers.show(resellerId)
      setResellerName(reseller.resellerName)
    } catch (error) {
      Alert.danger(error)
    } finally {
      setLoading(false)
    }
  }, [resellerId])

  useEffect(() => {
    setLoading(true)
    loadReseller()
  }, [loadReseller])

  function handleInput(event) {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  function edit() {
    setForm({ resellerId, resellerName })
    setShowModal(true)
  }

  async function update() {
    Loading.show()
    try {
      await apiResellers.update(form)
      await loadReseller()
      Alert.success('Reseller Updated')
      setShowModal(false)
    } catch (error) {
      Alert.danger(error)
    } finally {
      Loading.hide()
    }
  }

  return loading ? (
    <UiLoadingCard />
  ) : (
    <>
      <UiCard
        title="Reseller Profile"
        buttons={<UiButton color="link" icon="edit" size="small" onClick={edit} />}
      >
        <UiSection>
          <UiListItem label="Reseller ID">{resellerId}</UiListItem>
          <UiListItem label="Reseller Name">{resellerName}</UiListItem>
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
