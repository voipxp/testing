import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Field, Control, Button, Input, Select, Icon } from 'rbx'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { UiSpinner, UiDataTable } from '/components/ui'
import User from '/api/users'
import { alertDanger } from '/store/alerts'

const searchTypes = [
  { key: 'dn', name: 'Phone Number' },
  { key: 'extension', name: 'Extension' },
  { key: 'lastName', name: 'Last Name' },
  { key: 'firstName', name: 'First Name' },
  { key: 'emailAddress', name: 'Email Address' },
  { key: 'userId', name: 'User ID' },
  { key: 'macAddress', name: 'MAC Address' }
]

const columns = [
  { key: 'userIdShort', label: 'User Id' },
  { key: 'lastName', label: 'Last' },
  { key: 'firstName', label: 'First' },
  { key: 'phoneNumber', label: 'Phone' },
  { key: 'extension', label: 'Ext' },
  { key: 'serviceProviderId', label: 'Service Provider' },
  { key: 'groupId', label: 'Group' }
]

const UserSearch = ({ alertDanger, onSelect }) => {
  const [searchKey, setSearchKey] = useState('lastName')
  const [searchString, setSearchString] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [initialized, setInitialized] = useState(false)

  const handleSearchKey = e => {
    setSearchKey(e.target.value)
  }
  const handleSearchString = e => {
    setSearchString(e.target.value)
  }

  const search = async () => {
    setLoading(true)
    setInitialized(true)
    try {
      const query =
        searchKey === 'macAddress' ? searchString : `*${searchString}*`
      const users = await User.search({ [searchKey]: query })
      setUsers(users)
    } catch (error) {
      alertDanger(error)
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form style={{ marginBottom: '1rem' }}>
        <Field kind="addons">
          <Control>
            <Select.Container>
              <Select
                disabled={loading}
                value={searchKey}
                onChange={handleSearchKey}
                name="searchKey"
              >
                {searchTypes.map(searchType => (
                  <Select.Option key={searchType.key} value={searchType.key}>
                    {searchType.name}
                  </Select.Option>
                ))}
              </Select>
            </Select.Container>
          </Control>
          <Control expanded>
            <Input
              type="search"
              placeholder="search"
              onChange={handleSearchString}
              disabled={loading}
              name="searchString"
              value={searchString}
              autoFocus
            />
          </Control>
          <Control>
            <Button
              type="submit"
              state={loading ? 'loading' : ''}
              disabled={!searchString || !searchKey || loading}
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
    </>
  )
}

UserSearch.propTypes = {
  alertDanger: PropTypes.func,
  onSelect: PropTypes.func
}

export default connect(
  null,
  { alertDanger }
)(UserSearch)
