import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Input , Select} from 'rbx'
import { useAlerts } from '@/store/alerts'
import apiUserServiceBroadWorksMobility from '@/api/user-services-settings/user-broad-works-mobility-service'
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

export const UserBroadWorksMobility = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userServiceData, loadUserServiceBroadWorksMobility] = useState([])
  
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const data = await apiUserServiceBroadWorksMobility.show(userId)
		    loadUserServiceBroadWorksMobility(data)
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
  
  const phonesRingTypes = [
    { key: 'Fixed', name: 'Fixed' },
    { key: 'Mobile', name: 'Mobile' },
    { key: 'Both', name: 'Both' }
  ]

  const userSettingLevelTypes = [
    { key: 'Group', name: 'Group' },
    { key: 'User', name: 'User' }
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
		  const updatedData = await apiUserServiceBroadWorksMobility.update(formData)
      loadUserServiceBroadWorksMobility(updatedData)
      alertSuccess('BroadWorks Mobility Updated')
      setShowModal(false)
    } catch (error) {
      alertDanger(error)
    } finally {
      hideLoadingModal()
    }
  }

  if (!userServiceData) return <UiLoadingCard />
  return (
    <>
      <UiCard
        title="BroadWorks Mobility"
        buttons={
          <UiButton color="link" icon="edit" size="small" onClick={edit} />
        }
      >
        <UiSection>
          <UiListItem label="Active">
            <UiCheckbox isChecked={userServiceData.isActive} />
          </UiListItem>
          <UiListItem label="Phone To Ring">
            {userServiceData.phonesToRing}
          </UiListItem>
          <UiListItem label="Mobile Phone Number">
            {userServiceData.mobilePhoneNumber}
          </UiListItem>
          <UiListItem label="Alert Click To Dial Calls">
            <UiCheckbox isChecked={userServiceData.alertClickToDialCalls} />
          </UiListItem>
          <UiListItem label="Alert Group Paging Calls">
            <UiCheckbox isChecked={userServiceData.alertGroupPagingCalls} />
          </UiListItem>
          <UiListItem label="Enable Diversion Inhibitor">
            <UiCheckbox isChecked={userServiceData.enableDiversionInhibitor} />
          </UiListItem>
          <UiListItem label="Require Answer Confirmation">
            <UiCheckbox isChecked={userServiceData.requireAnswerConfirmation} />
          </UiListItem>
          <UiListItem label="BroadWorks Call Control">
            <UiCheckbox isChecked={userServiceData.broadworksCallControl} />
          </UiListItem>
          <UiListItem label="Uses Setting Level">
            {userServiceData.useSettingLevel}
          </UiListItem>
          <UiListItem label="Deny Call Originations">
            <UiCheckbox isChecked={userServiceData.denyCallOriginations} />
          </UiListItem>
          <UiListItem label="Deny Call Terminations">
            <UiCheckbox isChecked={userServiceData.denyCallTerminations} />
          </UiListItem>
        </UiSection>
      </UiCard>
    
      <UiCardModal
        title={`Edit BroadWorks Mobility`}
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
      >
        <form>
          <UiSection title="Settings">
            <UiFormField label="New Phone Number">  
              <Input
                type="text"
                name="mobilePhoneNumber"
                value={form.mobilePhoneNumber}
                placeholder="Mobile Phone Number"
                onChange={handleInput}
              />
            </UiFormField>
            <UiFormField label="Use Setting Level"> 
              <Select.Container fullwidth>
                <Select
                  value={form.useSettingLevel}
                  onChange={handleInput}
                  name="useSettingLevel"
                >
                  {userSettingLevelTypes.map(searchType => (
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
          
            <UiFormField label="Phones to Ring"> 
              <Select.Container fullwidth>
                <Select
                  value={form.phonesToRing}
                  onChange={handleInput}
                  name="phonesToRing"
                >
                  {phonesRingTypes.map(searchType => (
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

          <UiSection title="Other Settings">
            <UiInputCheckbox
              name="isActive"
              label="Active"
              checked={form.isActive}
              onChange={handleInput}
            />
            <UiInputCheckbox
              name="denyCallOriginations"
              label="Deny Call Originations"
              checked={form.denyCallOriginations}
              onChange={handleInput}
            />
            <UiInputCheckbox
              name="denyCallTerminations"
              checked={form.denyCallTerminations}
              onChange={handleInput}
              label="Deny Call Terminations"
            />
            <UiInputCheckbox
              name="alertClickToDialCalls"
              checked={form.alertClickToDialCalls}
              onChange={handleInput}
              label="Alert Click To Dial Calls"
            />
            <UiInputCheckbox
              name="alertGroupPagingCalls"
              checked={form.alertGroupPagingCalls}
              onChange={handleInput}
              label="Alert Group Paging Calls"
            />
            <UiInputCheckbox
              name="enableDiversionInhibitor"
              checked={form.enableDiversionInhibitor}
              onChange={handleInput}
              label="Enable Diversion Inhibitor"
            />
            <UiInputCheckbox
              name="requireAnswerConfirmation"
              label="Require Answer Confirmation"
              checked={form.requireAnswerConfirmation}
              onChange={handleInput}
            />
            <UiInputCheckbox
              name="broadworksCallControl"
              label="BroadWorks Call Control"
              checked={form.broadworksCallControl}
              onChange={handleInput}
            />
          </UiSection>
        </form>
      </UiCardModal>
    </>
  )
}
UserBroadWorksMobility.propTypes = {
  match: PropTypes.object.isRequired
}
