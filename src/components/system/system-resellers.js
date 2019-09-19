import React, { useState, useRef } from 'react'
import { AppBreadcrumb } from '@/components/app'
import { Breadcrumb } from 'rbx'
import PropTypes from 'prop-types'
import { useAlert, useLoadingModal, useResellers, useResellerCreate } from '@/graphql'
import { useForm } from '@/utils'
import { Input, Column } from 'rbx'
import {
  UiFormField,
  UiCard,
  UiLoadingCard,
  UiDataTable,
  UiButton,
  UiCardModal
} from '@/components/ui'

export const SystemResellers = ({ match, history }) => {
  const Alert = useAlert()
  const Loading = useLoadingModal()
  const [showModal, setShowModal] = useState(false)

  const formRef = useRef()
  const initialFormState = { resellerId: '', resellerName: '' }
  const { form, setForm, onChange, isValid } = useForm(initialFormState, formRef)

  const { data, loading, error } = useResellers()
  const [create] = useResellerCreate()

  if (!data && loading) return <UiLoadingCard />
  if (error) Alert.danger(error)

  const columns = [
    { key: 'resellerId', label: 'Reseller Id' },
    { key: 'resellerName', label: 'resellerName' }
  ]

  const open = reseller => {
    history.push(`/resellers/${reseller.resellerId}`)
  }

  const add = () => {
    setForm(initialFormState)
    setShowModal(true)
  }

  async function createReseller() {
    Loading.show()
    try {
      await create({ variables: { input: form } })
      Alert.success('Reseller Created')
      setShowModal(false)
      open(form)
    } catch (error_) {
      Alert.danger(error_)
    } finally {
      Loading.hide()
    }
  }

  return (
    <>
      <AppBreadcrumb>
        <Breadcrumb.Item>Resellers</Breadcrumb.Item>
      </AppBreadcrumb>

      <>
        <UiCard
          title="Resellers"
          buttons={<UiButton color="link" icon="add" size="small" onClick={add} />}
        >
          <UiDataTable
            columns={columns}
            rows={data}
            rowKey="resellerId"
            hideSearch={true}
            onClick={open}
          />
        </UiCard>

        <UiCardModal
          title="Add Reseller"
          isOpen={showModal}
          onCancel={() => setShowModal(false)}
          onSave={() => createReseller()}
          saveDisabled={!isValid}
        >
          <form ref={formRef}>
            <Column.Group>
              <Column>
                <UiFormField label="Reseller ID">
                  <Input
                    type="text"
                    name="resellerId"
                    value={form.resellerId}
                    onChange={onChange}
                    placeholder="Reseller ID"
                    required
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
    </>
  )
}
SystemResellers.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object
}
