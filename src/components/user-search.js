import React from 'react'
import PropTypes from 'prop-types'
import { Field, Control, Button, Input, Select, Icon } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { UiLoading, UiDataTable } from '@/components/ui'
import Alert from '@/utils/alerts'
import { useSession } from '@/graphql'
import userApi from '@/api/users'

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
  { key: 'extension', label: 'Extension' },
  { key: 'serviceProviderId', label: 'Service Provider' },
  { key: 'groupId', label: 'Group' }
]

export const UserSearch = ({ onSelect }) => {
  const [searchKey, setSearchKey] = React.useState('lastName')
  const [searchString, setSearchString] = React.useState('')
  const [users, setUsers] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [initialized, setInitialized] = React.useState(false)
  const session = useSession()
  const { serviceProviderId, groupId } = session

  const handleSearchKey = e => {
    setSearchKey(e.target.value)
  }
  const handleSearchString = e => {
    setSearchString(e.target.value)
  }

  const search = async e => {
    e.preventDefault()
    setLoading(true)
    setInitialized(true)
    try {
      const query =
        searchKey === 'macAddress' ? searchString : `*${searchString}*`
      const users = await userApi.search({
        [searchKey]: query,
        serviceProviderId,
        groupId
      })
      setUsers(users)
    } catch (error) {
      Alert.danger(error)
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form style={{ marginBottom: '1rem' }} onSubmit={search}>
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
        <UiLoading />
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
  onSelect: PropTypes.func
}
