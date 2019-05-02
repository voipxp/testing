import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { Field, Control, Button, Input, Icon } from 'rbx'
import { useReduxDispatch, useReduxState } from 'reactive-react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faList } from '@fortawesome/free-solid-svg-icons'
import { UiSpinner, UiDataTable, UiModalCard } from '@/components/ui'
import acl from '@/utils/acl'
import { alertDanger } from '@/store/alerts'
import { userPath } from '@/utils/routes'
import phoneNumberApi from '@/api/phone-numbers/system'
import ServiceProviderSelect from './service-provider-select'

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

  const [searchString, setSearchString] = React.useState('')
  const [serviceProviderId, setServiceProviderId] = React.useState('')
  const [showServiceProvider, setShowServiceProvider] = React.useState(false)
  const [users, setUsers] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [initialized, setInitialized] = React.useState(false)

  const hasProvisioning = acl.hasProvisioning(loginType)

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
      const filtered = users.filter(u => userPath(u))
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
