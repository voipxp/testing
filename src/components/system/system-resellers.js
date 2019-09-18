import React, { useState, useEffect } from 'react'
import apiResellers from '@/api/resellers'
import { AppBreadcrumb } from '@/components/app'
import { Breadcrumb } from 'rbx'
import PropTypes from 'prop-types'
import { useAlert, useLoadingModal } from '@/graphql'
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
  const [resellers, setResellers] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({})

  const columns = [
    { key: 'resellerId', label: 'Reseller Id' },
    { key: 'resellerName', label: 'resellerName' }
  ]

  const open = reseller => {
    history.push(`/resellers/${reseller.resellerId}`)
  }

  const handleInput = event => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  const loadResellers = React.useCallback(async () => {
    try {
      const data = await apiResellers.list()
      setResellers(data)
    } catch (error) {
      Alert.danger(error)
    } finally {
      setLoading(false)
    }
  }, [Alert])

  useEffect(() => {
    setLoading(true)
    loadResellers()
  }, [loadResellers])

  const add = () => {
    setForm({ resellerId: '', resellerName: '' })
    setShowModal(true)
  }

  async function create() {
    Loading.show()
    try {
      await apiResellers.create(form)
      await loadResellers()
      Alert.success('Reseller Created')
      setShowModal(false)
      open(form)
    } catch (error) {
      Alert.danger(error)
    } finally {
      Loading.hide()
    }
  }

  return (
    <>
      <AppBreadcrumb>
        <Breadcrumb.Item>Resellers</Breadcrumb.Item>
      </AppBreadcrumb>

      {loading ? (
        <UiLoadingCard />
      ) : (
        <>
          <UiCard
            title="Resellers"
            buttons={<UiButton color="link" icon="add" size="small" onClick={add} />}
          >
            <UiDataTable
              columns={columns}
              rows={resellers}
              rowKey="resellerId"
              hideSearch={true}
              onClick={open}
            />
          </UiCard>

          <UiCardModal
            title="Add Reseller"
            isOpen={showModal}
            onCancel={() => setShowModal(false)}
            onSave={() => create(form)}
          >
            <form>
              <Column.Group>
                <Column>
                  <UiFormField label="Reseller ID">
                    <Input
                      type="text"
                      name="resellerId"
                      value={form.resellerId}
                      onChange={handleInput}
                      placeholder="Reseller ID"
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
      )}
    </>
  )
}
SystemResellers.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object
}
