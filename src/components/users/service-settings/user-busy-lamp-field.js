import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { useAlerts } from '@/store/alerts'
import { useQuery, queryCache } from 'react-query'
import api from '@/api/user-services-settings/user-busy-lamp-field-service'
import groupDomainAPI from '@/api/groups/domains'
import { useAsync } from 'react-async-hook'
import _ from 'lodash'
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
  const [isUsers, isSetUsers] = React.useState(true)
  const { data: result, isLoading, error } = useQuery(
    'user-busy-lamp-field',
    () => api.show(userId)
  )

  const { data: userListData } = useQuery(
    'busy-lamp-available-users',
    () => api.users(userId)
  )

  useAsync(
    () =>
      groupDomainAPI.domains(groupId, serviceProviderId).then(domains => {
        setDomainsData(domains)
      }),
    []
  )
  /*get usersList */
 const userServiceData = result || {}
 const busyFiledLampAssignedUsers = userServiceData.users || []
 const busyFiledLampAvailableUsers = (userListData && userListData.users) || []
 
 if(isUsers && busyFiledLampAvailableUsers.length > 0 ){
   isSetUsers(false)
   setAvailableUser(busyFiledLampAvailableUsers)
  }  
  if (error) alertDanger(error)
  if (isLoading) return <UiLoadingCard />
  
  function handleInput(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
	  setForm({ ...form, [name]: value })
  }
  
  function edit() { 
    let prefix =''
    let domain = ''
    if(userServiceData.listURI){
      const split = userServiceData.listURI.split('@')
      prefix = split[0]
      domain = split[1]
    }
    const listUrl   = prefix ? prefix : form['listURI']
    const domainURI = domain ? domain : domains.default
    const enableCallParkNotification = userServiceData.enableCallParkNotification ? true : false
    const initialForm = {
      listURI: listUrl,
      domain:domainURI,
      enableCallParkNotification: enableCallParkNotification,
      userId: userId
    }
    setForm({...initialForm })
    setIsModUri(true)
    setShowModal(true)
  }
  
  function editUsers() {
    _.pullAllWith(availableUser, selectedUser , _.isEqual)
      setSelectedUser(selectedUser)
      setAvailableUser(availableUser)
       const formWithMonitorUser = {
          listURI: userServiceData.listURI,
          enableCallParkNotification: userServiceData.enableCallParkNotification,
          userId: userId
        }
      setForm({...formWithMonitorUser })
      setIsModUri(false)
      setShowModal(true)
  }
  
  function save() {   
    if(isModUri){
      form['listURI'] = form['listURI']+'@'+form['domain']
    } 
    form['users'] = selectedUser 
    update(form)
  }

  async function update(formData) {
    showLoadingModal()
    try {
      const newUserBusyLampFiledListURI = await api.update(formData)
      queryCache.setQueryData(['user-busy-lamp-field'],newUserBusyLampFiledListURI, {
        shouldRefetch: true
      })
      queryCache.setQueryData(['busy-lamp-available-users'], newUserBusyLampFiledListURI, {
        shouldRefetch: true
      })

      alertSuccess('Setting Updated')
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
          rows={busyFiledLampAssignedUsers}
          rowKey="userId"
          hideSearch={false}
          onClick={editUsers}
          showSelect={true}
          pageSize={25}
        />
      </UiCard>
      
      <UiCardModal
        title={ 
          isModUri ?
           'Edit Settings' : 
           'Edit Users'
        }
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
                <br/>
                <br/>
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
