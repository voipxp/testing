import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { useAlerts } from '@/store/alerts'
import { useQuery, queryCache } from 'react-query'
import api from '@/api/user-services-settings/user-busy-lamp-field-service'
import groupDomainAPI from '@/api/groups/domains'
import { useAsync } from 'react-async-hook'
import {
  UiButton,
  UiCard,
  UiCardModal,
  UiCheckbox,
  UiInputCheckbox,
  UiListItem,
  UiLoadingCard,
  UiSection,
  UiDataTable,
  UiSelectableTable
} from '@/components/ui'
import { Input , Select, Tag } from 'rbx'
const columns = [
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'userId', label: 'User Id' },
  { key: 'phoneNumber', label: 'Phone Number' },
  { key: 'extension', label: 'Extension' },
  { key: 'department', label: 'Department' },
  { key: 'email', label: 'Email' }
]

export const UserBusyLampField = ({ match }) => {
  
  const { userId,groupId, serviceProviderId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [availableUser, setAvailableUser] = useState([])
  const [selectedUser, setSelectedUser] = useState([])
  const [isModUri, setIsModUri] = useState(false)
  const [domains, setDomainsData] = React.useState({})
  const { data: result, isLoading, error } = useQuery(
    'user-busy-lamp-field',
    () => api.show(userId)
  )

  const { data: userListData } = useQuery(
    'users',
    () => api.users(userId)
  )

  useAsync(
    () =>
      groupDomainAPI.domains(groupId, serviceProviderId).then(domains => {
        setDomainsData(domains)
      }),
    []
  )
  // const { data: domainsData } = useQuery(
  //   'domains',
  //   () => api.domains(groupId, serviceProviderId)
  // )
  /*get usersList */
  const userServiceData = result || {}
 const useList = userServiceData.users || []

 const selectedUsers = userListData || []
 console.log('fffffffff')
 console.log(selectedUsers)
  if (error) alertDanger(error)
  if (isLoading) return <UiLoadingCard />
  
  function handleInput(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
	  setForm({ ...form, [name]: value })
  }
  
  function edit() {
      var split = userServiceData.listURI.split('@')
      var prefix = split[0]
      var domain = split[1]
      userServiceData['listURI'] = prefix
      userServiceData['domains'] = domain
      setIsModUri(true)
      setShowModal(true)
      setForm({ ...userServiceData })
  }

  function editUsers() {
    setIsModUri(false)
    setShowModal(true)
  }
  
  function save() { 
    const initialForm = {
      listURI: form['listURI']+'@'+form['domains'],
      enableCallParkNotification: form['enableCallParkNotification'],
      userId: userId  
    }
    //form['listURI'] = form['listURI']+'@'+form['domains']
     update(initialForm)
  }

  async function update(formData) {
    showLoadingModal()
    try {
      const newUserCallingNameRetrieval = await api.update(userId, formData)
      queryCache.setQueryData(['user-busy-lamp-field'], newUserCallingNameRetrieval, {
        shouldRefetch: true
      })
      alertSuccess('Busy Lamp Field Updated Successfully')
      setShowModal(false)
    } catch (error_) {
      alertDanger(error_)
    } finally {
      hideLoadingModal()
    }
  }
  

  return (
    <>
      <UiCard
        title="Busy Lamp Field"
        buttons={
          <UiButton color="link" icon="edit" size="small" onClick={edit} />
        }
      >
	      <UiSection>
		      <UiListItem label="List URI">
            {userServiceData.listURI} 
          </UiListItem>
          <UiListItem label="Enable Call Park Notification">
            <UiCheckbox isChecked={userServiceData.enableCallParkNotification} />
          </UiListItem>
		    </UiSection>
      </UiCard>

      <UiCard
        title="Monitored Users"
        buttons={
          <UiButton color="link" icon="edit" size="small" onClick={editUsers} />
        }
      >
	      <UiDataTable
          columns={columns}
          rows={useList}
          rowKey="userId"
          pageSize={25}
        />
      </UiCard>
      
      <UiCardModal
        title={ 
          isModUri ?
           'Edit Settings' : 
           'Edit Users'}
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onSave={save}
      >
        <form>
        {isModUri ? (
		      <UiSection title="General Settings">
             <Input
                    style={{ width: '5em' }}
                    type="text"
                    name="listURI"
                    onChange={handleInput}
                    value={
                      form.listURI
                    }
                    // eslint-disable-next-line react/jsx-no-duplicate-props
                    style={{ width: '25rem' }}
                  />
                  <Tag color="link" size="medium">
                    @
                  </Tag>
                  <Select.Container>
                    <Select
                      value={form.domains}
                      onChange={handleInput}
                      name="domains"
                      style={{ width: '25rem', marginBottom: '1rem' }}
                    >
                      {domains && domains.default ? (
                        <Select.Option
                          key={domains.default}
                          value={domains.default}
                        >
                          {domains.default}
                        </Select.Option>
                      ) : null}
                      {domains.domains &&
                        domains.domains.map(domain =>
                          domains.default !== domain ? (
                            <Select.Option key={domain} value={domain}>
                              {domain}
                            </Select.Option>
                          ) : null
                        )}
                    </Select>
                  </Select.Container>
              <UiSection title="Other Settings"> 
                <UiInputCheckbox
                  name="enableCallParkNotification"
                  label="Enable Call Park Notification"
                  checked={form.enableCallParkNotification}
                  onChange={handleInput}
                />
            </UiSection>
			    </UiSection>
        ):(
          <>
		        <UiSection title="General Settings">
              <UiSelectableTable
                title="Users"
                availableUser={availableUser}
                setAvailableUser={availableItem =>
                  setAvailableUser(availableItem)
                }
                selectedUser={selectedUser}
                setSelectedUser={selectedItem => setSelectedUser(selectedItem)}
                rowKey="userId"
                showMoveBtn={true}
              />
			    </UiSection>
          </>
        )}

			  </form>
      </UiCardModal>
    </>
  )
}
UserBusyLampField.propTypes = {
  match: PropTypes.object.isRequired
}
