import React, { useState, useEffect } from 'react'
import apiResellers from '@/api/resellers'
import { AppBreadcrumb } from '@/components/app'
import { Breadcrumb } from 'rbx'
import { useUi } from '@/store/ui'
import PropTypes from 'prop-types'
import { Field, Input, Column, Control, Label } from 'rbx'
import { useAlerts } from '@/store/alerts'
import {
  UiCard,
  UiLoadingCard,
  UiDataTable,
  UiButton,
  UiCardModal
} from '@/components/ui'

export const Resellers = ({ match }) => {
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [resellers, setResellers] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({})
  const [showConfirm, setShowConfirm] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showDisabled, setDisabled] = useState('')

  const columns = [
    { key: 'resellerId', label: 'Reseller Id' },
    { key: 'resellerName', label: 'resellerName' }
  ]

  function handleInput(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setForm({ ...form, [name]: value })
  }

  /*
    Load the resellers, alert on error
  */
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const data = await apiResellers.list()
        setResellers(data)
      } catch (error) {
        alertDanger(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [alertDanger])

  function edit(row) {
    setDisabled('disabled')
    setForm({ ...row, resellerId: row.resellerId })
    setShowModal(true)
  }

  /*
    Remove the current selected altId
  */
  function remove() {
    setShowConfirm(false)
    destroy(form.resellerId)
  }
  function add() {
    setForm({
      resellerId: '',
      resellerName: ''
    })
    setDisabled('')
    setShowModal(true)
    // create(form)
  }

  function save() {
    if (showDisabled === 'disabled') update(form)
    else create(form)
  }

  async function create(reseller) {
    showLoadingModal()
    try {
      const data = await apiResellers.create(reseller)
      setResellers(data)
      alertSuccess('Reseller Updated')
      setShowModal(false)
    } catch (error) {
      alertDanger(error)
      setShowModal(true)
    } finally {
      setLoading(false)
      hideLoadingModal()
    }
  }

  async function update(reseller) {
    showLoadingModal()
    try {
      const response = await apiResellers.update(reseller)
      const data = await apiResellers.list()
      setResellers(data)
      alertSuccess('Reseller Updated')
      setShowModal(false)
    } catch (error) {
      alertDanger(error)
      setShowModal(true)
    } finally {
      setLoading(false)
      hideLoadingModal()
    }
  }

  async function destroy(resellerId) {
    showLoadingModal()
    try {
      const response = await apiResellers.destroy(resellerId)
      const data = await apiResellers.list()
      setResellers(data)
      alertSuccess('Reseller Deleted')
      setShowModal(false)
    } catch (error) {
      alertDanger(error)
      setShowModal(true)
    } finally {
      setLoading(false)
      hideLoadingModal()
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
            buttons={
              <UiButton
                color="link"
                icon="add"
                size="small"
                onClick={add}
                // disabled={alternateUserIds.length > 3}
              />
            }
          >
            <UiDataTable
              columns={columns}
              rows={resellers}
              rowKey="resellerId"
              hideSearch={true}
              onClick={edit}
            />
          </UiCard>
          <UiCardModal
            title="Resellers"
            isOpen={showModal}
            onCancel={() => setShowModal(false)}
            onSave={save}
            onDelete={form.resellerId ? () => setShowConfirm(true) : null}
          >
            <form>
              <Column.Group>
                <Column>
                  <Field>
                    <Label>Reseller ID</Label>
                    <Control>
                      <Input
                        type="text"
                        name="resellerId"
                        value={form.resellerId}
                        onChange={handleInput}
                        placeholder="resellerId"
                        disabled={showDisabled}
                      />
                    </Control>
                  </Field>
                </Column>
                <Column>
                  <Field>
                    <Label>Reseller Name</Label>
                    <Control>
                      <Input
                        type="text"
                        name="resellerName"
                        value={form.resellerName}
                        onChange={handleInput}
                        placeholder="resellerName"
                      />
                    </Control>
                  </Field>
                </Column>
              </Column.Group>
            </form>
          </UiCardModal>
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
      )}
    </>
  )
}
Resellers.propTypes = {
  match: PropTypes.object.isRequired
}
