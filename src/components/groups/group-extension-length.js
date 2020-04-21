import React, { useState } from 'react'
import { Breadcrumb, Column, Field, Input, Control } from 'rbx'
import { AppBreadcrumb } from '@/components/app'
import PropTypes from 'prop-types'
import groupExtensionLengthApi from '@/api/group-extension-length'
import { useUi } from '@/store/ui'
import { useAlerts } from '@/store/alerts'
import { useQuery, setQueryData } from 'react-query'

import {
  UiCard,
  UiLoadingCard,
  UiSection,
  UiButton,
  UiListItem,
  UiCardModal
} from '@/components/ui'

export const GroupExtensionLength = ({ match , isBreadcrumb = true }) => {
  const initialForm = {
    minExtensionLength: '',
    maxExtensionLength: '',
    defaultExtensionLength: ''
  }
  const { serviceProviderId, groupId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState(initialForm)
  const [showModal, setShowModal] = useState(false)

  const { data: result, loading, error } = useQuery(
    'groupExtensionLength',
    () => groupExtensionLengthApi.show(serviceProviderId, groupId)
  )

  const extensionLength = result || {}

  if (error) alertDanger(error)
  if (loading) return <UiLoadingCard />

  function handleInput(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setForm({ ...form, [name]: value })
  }

  function edit() {
    setForm({ ...extensionLength })
    setShowModal(true)
  }

  function save() {
    update(form)
  }

  async function update(extension) {
    showLoadingModal()
    try {
      const newGroupExentionLength = await groupExtensionLengthApi.update(
        serviceProviderId,
        groupId,
        extension
      )
      setQueryData(['groupExtensionLength'], newGroupExentionLength, {
        shouldRefetch: true
      })
      alertSuccess('Extension Length Updated')
      setShowModal(false)
      hideLoadingModal()
    } catch (error_) {
      alertDanger(error_)
      hideLoadingModal()
    }
  }
  return (
    <>
	{isBreadcrumb && (
      <AppBreadcrumb>
        <Breadcrumb.Item>Group Extension Length</Breadcrumb.Item>
      </AppBreadcrumb>
	)}
      <>
        <UiCard
          title="Group Extension Length"
          buttons={
            <UiButton color="link" icon="edit" size="small" onClick={edit} />
          }
        >
          <UiSection>
            <UiListItem label="Minimum Extension Length">
              {extensionLength.minExtensionLength}
            </UiListItem>
            <UiListItem label="Maximum Extension Length">
              {extensionLength.maxExtensionLength}
            </UiListItem>
            <UiListItem label="Default Extension Length">
              {extensionLength.defaultExtensionLength}
            </UiListItem>
          </UiSection>
        </UiCard>
      </>
      <UiCardModal
        title={'Edit Group Extension Length'}
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
      >
        <form>
          <Column.Group>
            <Column>
              <Field>
                <Control>
                  <UiButton fullwidth static>
                    Minimum Extension Length
                  </UiButton>
                </Control>
              </Field>
              <Field>
                <Control>
                  <UiButton fullwidth static>
                    Maximum Extension Length
                  </UiButton>
                </Control>
              </Field>
              <Field>
                <Control>
                  <UiButton fullwidth static>
                    Default Extension Length
                  </UiButton>
                </Control>
              </Field>
            </Column>
            <Column>
              <Field>
                <Control>
                  <Input
                    type="number"
                    name="minExtensionLength"
                    value={form.minExtensionLength}
                    onChange={handleInput}
                    placeholder="Minimum Extension Length"
                  />
                </Control>
              </Field>
              <Field>
                <Control>
                  <Input
                    type="number"
                    name="maxExtensionLength"
                    value={form.maxExtensionLength}
                    onChange={handleInput}
                    placeholder="Maximum Extension Length"
                  />
                </Control>
              </Field>
              <Field>
                <Control>
                  <Input
                    type="number"
                    name="defaultExtensionLength"
                    value={form.defaultExtensionLength}
                    onChange={handleInput}
                    placeholder="Default Extension Length"
                  />
                </Control>
              </Field>
            </Column>
          </Column.Group>
        </form>
      </UiCardModal>
    </>
  )
}
GroupExtensionLength.propTypes = {
  match: PropTypes.object.isRequired,
  isBreadcrumb : PropTypes.bool
}
