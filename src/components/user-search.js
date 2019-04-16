import React, { useState } from 'react'
import { Field, Control, Button, Input, Select, Icon, Table } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import Spinner from './spinner'

const searchTypes = [
  { key: 'dn', name: 'Phone Number' },
  { key: 'extension', name: 'Extension' },
  { key: 'lastName', name: 'Last Name' },
  { key: 'firstName', name: 'First Name' },
  { key: 'emailAddress', name: 'Email Address' },
  { key: 'userId', name: 'User ID' },
  { key: 'macAddress', name: 'MAC Address' }
]

const UserSearch = ({ isOpen }) => {
  const [searchKey, setSearchKey] = useState(searchTypes[0].key)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])

  const handleSearchKey = e => {
    console.log('handleSearchKey', e.target.value)
    setSearchKey(e.target.value)
  }

  const handleSearch = e => {
    setSearch(e.target.value)
  }

  const runSearch = () => {
    console.log('searchKey', searchKey)
    console.log('search', search)
    setLoading(true)
    console.log('runSearch')
    const users = []
    for (let i = 0; i < 20; i++) {
      users.push({
        userId: `user-${i}`,
        firstName: `first-${i}`,
        lastName: `last=${i}`
      })
    }
    setUsers(users)
    setTimeout(() => setLoading(false), 2000)
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
              onChange={handleSearch}
              disabled={loading}
              value={search}
              autoFocus
            />
          </Control>
          <Control>
            <Button
              type="submit"
              state={loading ? 'loading' : ''}
              disabled={!search || loading}
              onClick={runSearch}
            >
              <Icon size="small" align="left">
                <FontAwesomeIcon icon={faSearch} />
              </Icon>
            </Button>
          </Control>
        </Field>
      </form>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <Table fullwidth bordered striped hoverable>
            <Table.Head>
              <Table.Row>
                <Table.Heading>ID</Table.Heading>
                <Table.Heading>Last</Table.Heading>
                <Table.Heading>First</Table.Heading>
                <Table.Heading>Phone</Table.Heading>
                <Table.Heading>Ext</Table.Heading>
                <Table.Heading>Service Provider</Table.Heading>
                <Table.Heading>Group</Table.Heading>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {users.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan="100">No Users Found</Table.Cell>
                </Table.Row>
              ) : (
                users.map(user => (
                  <Table.Row key={user.userId}>
                    <Table.Cell>{user.userId}</Table.Cell>
                    <Table.Cell>{user.firstName}</Table.Cell>
                    <Table.Cell>{user.lastName}</Table.Cell>
                    <Table.Cell>{user.phoneNumber}</Table.Cell>
                    <Table.Cell>{user.extension}</Table.Cell>
                    <Table.Cell>{user.serviceProviderId}</Table.Cell>
                    <Table.Cell>{user.groupId}</Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table>
          <p>Pagination</p>
        </>
      )}
    </>
  )
}

UserSearch.propTypes = {
  isOpen: PropTypes.bool
}

export default UserSearch

/*
  <td>{user.userIdShort || user.userId}</td>
  <td>{user.lastName}</td>
  <td>{user.firstName}</td>
  <td>{user.phoneNumber}</td>
  <td>{user.extension}</td>
  <td>{user.serviceProviderId}</td>
  <td>{user.groupId}</td>
*/
