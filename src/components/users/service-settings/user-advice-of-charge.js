import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Input, Select } from 'rbx'
import { useAlerts } from '@/store/alerts'
import apiUserAdviceOfCharge from '@/api/user-services-settings/user-advice-of-charge-service'
import {
  UiCard,
  UiLoadingCard,
  UiButton,
  UiCardModal,
  UiCheckbox,
  UiInputCheckbox,
  UiSection,
  UiListItem,
  UiFormField
} from '@/components/ui'

export const UserAdviceOfCharge = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userServiceData, setUserServiceData] = useState([])
  
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const data = await apiUserAdviceOfCharge.show(userId)
		    setUserServiceData(data)
      } catch (error) {
        alertDanger(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [userId, alertDanger])
  
  const aocTypes = [
    { key: 'During Call', name: 'During Call' },
    { key: 'End Of Call', name: 'End Of Call' }
  ]

  function handleInput(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
	  setForm({ ...form, [name]: value })
  }
  
  function edit() {
    setForm({ ...userServiceData })
    setShowModal(true)
  }
  
  function save() {
    update(form)
  }

  async function update(formData) {
	showLoadingModal()
    try {
	  const updatedData = await apiUserAdviceOfCharge.update(formData)
	  setUserServiceData(updatedData)
      alertSuccess('Advice Of Charge Updated')
      setShowModal(false)
    } catch (error) {
      alertDanger(error)
    } finally {
      hideLoadingModal()
    }
  }

  if (loading) return <UiLoadingCard />

  return (
    <>
      <UiCard
        title="Advice Of Charge"
        buttons={
          <UiButton color="link" icon="edit" size="small" onClick={edit} />
        }
      >
	    <UiSection>
        <UiListItem label="Enabled">
          <UiCheckbox isChecked={userServiceData.isActive} />
        </UiListItem>
        <UiListItem label="Advice Of Charge Type">
          {userServiceData.aocType}
        </UiListItem>
        </UiSection>
      </UiCard>
      <UiCardModal
        title={`Edit Advice Of Charge`}
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
      >
        <form>
          <UiSection title="Enabled">
            <UiInputCheckbox
              name="isActive"
              label="Enable Advice Of Charge"
              checked={form.isActive}
              onChange={handleInput}
            />
            <UiFormField label="Type"> 
              <Select.Container fullwidth>
                <Select
                  value={form.aocType}
                  onChange={handleInput}
                  name="aocType"
                >
                  {aocTypes.map(searchType => (
                    <Select.Option
                      key={searchType.key}
                      value={searchType.key}
                    >
                      {searchType.name}
                    </Select.Option>
                  ))}
                </Select>
              </Select.Container>
            </UiFormField>
          </UiSection>
        </form>
      </UiCardModal>
    </>
  )
}
UserAdviceOfCharge.propTypes = {
  match: PropTypes.object.isRequired
}
