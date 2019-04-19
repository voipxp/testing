import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import { Field, Control, Button, Input, Icon } from 'rbx'
import { useReduxDispatch, useReduxState } from 'reactive-react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faList } from '@fortawesome/free-solid-svg-icons'
import { UiSpinner, UiDataTable, UiModalCard } from '/components/ui'
import { hasLevel } from '/store/session'
import { alertDanger } from '/store/alerts'
import phoneNumberApi from '/api/phone-numbers/system'
import ServiceProviderSelect from './service-provider-select'

const userTypes = {
  'Normal': 'users',
  'Auto Attendant': 'autoAttendants/autoAttendant',
  'Call Center': 'callCenters/callCenter',
  'Collaborate Bridge': 'collaborate/bridge',
  'Meet-Me Conferencing': 'meetMe/bridge',
  'Group Paging': 'paging/group',
  'Hunt Group': 'huntGroups/huntGroup',
  'BroadWorks Anywhere': null,
  'Find-me/Follow-me': null,
  'Flexible Seating Host': null,
  'Instant Group Call': null,
  'Music On Hold': null,
  'Route Point': null,
  'Voice Messaging': null
}

const columns = [
  { key: 'userIdShort', label: 'User Id' },
  { key: 'lastName', label: 'Last' },
  { key: 'firstName', label: 'First' },
  { key: 'phoneNumbers', label: 'Phone' },
  { key: 'extension', label: 'Extension' },
  { key: 'userType', label: 'Type' },
  { key: 'serviceProviderId', label: 'Service Provider' },
  { key: 'groupId', label: 'Group' }
]

const SystemDnSearch = ({ onSelect }) => {
  const dispatch = useReduxDispatch()
  const state = useReduxState()
  const { loginType } = state.session

  const [searchString, setSearchString] = useState('')
  const [serviceProviderId, setServiceProviderId] = useState()
  const [showServiceProvider, setShowServiceProvider] = useState(false)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [initialized, setInitialized] = useState(false)

  const hasProvisioning = hasLevel(loginType, 'Provisioning')

  const handleSearchString = e => {
    setSearchString(e.target.value)
  }

  const selectServiceProvider = e => {
    if (e) e.preventDefault()
    setShowServiceProvider(true)
  }

  const handleServiceProviderSelect = serviceProvider => {
    setShowServiceProvider(false)
    setServiceProviderId(get(serviceProvider, 'serviceProviderId', ''))
  }

  const search = async e => {
    e.preventDefault()
    setLoading(true)
    setInitialized(true)
    try {
      const _serviceProviderId = state.serviceProviderId || serviceProviderId
      const dn = _serviceProviderId ? `*${searchString}*` : searchString
      const users = await phoneNumberApi.search({
        dn,
        serviceProviderId: _serviceProviderId
      })
      // strip out users we can't link to
      const filtered = users.filter(user => userTypes[user.userType])
      setUsers(filtered)
    } catch (error) {
      dispatch(alertDanger(error))
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form style={{ marginBottom: '1rem' }}>
        {hasProvisioning && (
          <Field kind="addons">
            <Control>
              <Button type="button" style={{ width: '175px' }} static>
                Service Provider
              </Button>
            </Control>
            <Control expanded>
              <Input
                type="search"
                placeholder="Any Service Provider"
                onClick={selectServiceProvider}
                value={serviceProviderId}
                readOnly
              />
            </Control>
            <Control>
              <Button
                type="button"
                disabled={loading}
                onClick={selectServiceProvider}
              >
                <Icon size="small" align="left">
                  <FontAwesomeIcon icon={faList} />
                </Icon>
              </Button>
            </Control>
          </Field>
        )}
        <Field kind="addons">
          <Control>
            <Button type="button" style={{ width: '175px' }} static>
              Phone Number
            </Button>
          </Control>
          <Control expanded>
            <Input
              type="search"
              placeholder="search"
              onChange={handleSearchString}
              disabled={loading}
              value={searchString}
              autoFocus
            />
          </Control>
          <Control>
            <Button
              type="submit"
              state={loading ? 'loading' : ''}
              disabled={!searchString || loading}
              onClick={search}
            >
              <Icon size="small" align="left">
                <FontAwesomeIcon icon={faSearch} />
              </Icon>
            </Button>
          </Control>
        </Field>
      </form>
      {!initialized ? (
        ''
      ) : loading ? (
        <UiSpinner />
      ) : (
        <UiDataTable
          columns={columns}
          rows={users}
          rowKey="userId"
          pageSize={50}
          onClick={onSelect}
        />
      )}
      <UiModalCard
        title="Select Service Provider"
        isOpen={showServiceProvider}
        onCancel={handleServiceProviderSelect}
      >
        <ServiceProviderSelect onSelect={handleServiceProviderSelect} />
      </UiModalCard>
    </>
  )
}

SystemDnSearch.propTypes = {
  onSelect: PropTypes.func
}

export default SystemDnSearch
