import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Input, Select} from 'rbx'
import { useAlerts } from '@/store/alerts'
import apiUserServiceGroupNightForwarding from '@/api/user-services-settings/user-group-night-forwarding-service'
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

export const UserGroupNightForwarding = ({ match }) => {
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
        const data = await apiUserServiceGroupNightForwarding.show(userId)
		    setUserServiceData(data)
      } catch (error) {
        alertDanger(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [userId, alertDanger])
  
  function handleInput(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
	  setForm({ ...form, [name]: value })
  }
  const nightForwarding =[
    {key:'Use Group',name : 'Use Group'},
    {key:'On',name : 'On'},
    {key:'Off',name : 'Off'}
  ]
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
		  const updatedData = await apiUserServiceGroupNightForwarding.update(formData)
      setUserServiceData(updatedData)
      alertSuccess(' Group Night Forwarding Updated')
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
        title="Group Night Forwarding"
        buttons={
          <UiButton color="link" icon="edit" size="small" onClick={edit} />
        }
      >
	      <UiSection>
          <UiListItem label="Group Night Forwarding">
             {userServiceData.nightForwarding}
          </UiListItem>
        </UiSection>
      </UiCard>
      <UiCardModal
        title={`Edit Group Night Forwarding`}
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
      >
        <form>
          <UiSection title="">
            <UiFormField label="Night Forwarding" horizontal>
             <Select.Container fullwidth>
                <Select
                  value={form.nightForwarding}
                  onChange={handleInput}
                  name="nightForwarding"
                >
                  {nightForwarding.map(searchType => (
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
UserGroupNightForwarding.propTypes = {
  match: PropTypes.object.isRequired
}
