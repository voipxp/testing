import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'rbx'
import { AppBreadcrumb } from '@/components/app'
import PropTypes from 'prop-types'
import apiCommProfile from '@/api/group-communication-barring-profiles'
import apiComm from '@/api/group-communication-barring'
import { hideLoadingModal } from '@/store/ui'
import { Select } from 'rbx'
import { useAlerts } from '@/store/alerts'
import {
  UiCard,
  UiLoadingCard,
  UiSection,
  UiButton,
  UiListItem,
  UiCheckbox,
  UiInputCheckbox,
  UiCardModal,
  UiFormField
} from '@/components/ui'

export const GroupCommunicationBarring = ({ match }) => {
  const { serviceProviderId, groupId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const [loading, setLoading] = useState(true)
  const [communicationProfiles, setCommunicationProfiles] = useState([])
  const [communicationBarring, setCommunicationBarring] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({})

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const data = await apiCommProfile.show(serviceProviderId, groupId)
        setCommunicationProfiles(data.profiles)
        const barring = await apiComm.show(serviceProviderId, groupId)
        setCommunicationBarring(barring)
      } catch (error) {
        alertDanger(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [serviceProviderId, groupId, alertDanger])

  function handleInput(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setForm({ ...form, [name]: value })
  }

  function edit() {
    setForm({ ...communicationBarring })
    setShowModal(true)
  }

  function save() {
    update(form)
  }

  async function update(profile) {
    setShowModal(false)
    setLoading(true)
    try {
      const data = await apiComm.update(serviceProviderId, groupId, profile)
      setCommunicationBarring(data)
      alertSuccess('Communication Barring Profile Updated')
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
        <Breadcrumb.Item>Communication Barring</Breadcrumb.Item>
      </AppBreadcrumb>
      {loading ? (
        <UiLoadingCard />
      ) : (
        <>
          <UiCard
            title="Communication Barring Profiles"
            buttons={
              <UiButton color="link" icon="edit" size="small" onClick={edit} />
            }
          >
            <UiSection>
              <UiListItem label="Default Service Provider profile">
                <UiCheckbox
                  isChecked={
                    communicationBarring.useDefaultServiceProviderProfile
                  }
                />
              </UiListItem>
              <UiListItem label="Use This Communication Barring profile">
                {communicationBarring.profile}
              </UiListItem>
            </UiSection>
          </UiCard>
        </>
      )}
      <UiCardModal
        title={'Edit Communication Barring Profile'}
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
      >
        <form>
          <UiSection title="Settings">
            <UiInputCheckbox
              name="useDefaultServiceProviderProfile"
              label="Default Service Provider profile"
              checked={form.useDefaultServiceProviderProfile}
              onChange={handleInput}
            />
            <UiFormField label="Outbound Call Mode">
              <Select.Container fullwidth>
                <Select
                  value={form.profile}
                  onChange={handleInput}
                  name="profile"
                  disabled={!form.useDefaultServiceProviderProfile}
                >
                  {communicationProfiles.map(searchType => (
                    <Select.Option key={searchType} value={searchType}>
                      {searchType}
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
GroupCommunicationBarring.propTypes = {
  match: PropTypes.object.isRequired
}
