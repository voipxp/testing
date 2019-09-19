import React from 'react'
import PropTypes from 'prop-types'
import { Field, Control, Button, Input, Select, Icon } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { UiLoading, UiDataTable } from '@/components/ui'
import { GROUP_LIST_QUERY } from '@/graphql'
import { useAlert, useSession } from '@/utils'
import { useLazyQuery } from '@apollo/react-hooks'

const searchTypes = [{ key: 'groupName', name: 'Group Name' }, { key: 'groupId', name: 'Group ID' }]

const columns = [
  { key: 'groupId', label: 'Group Id' },
  { key: 'groupName', label: 'Group Name' },
  { key: 'serviceProviderId', label: 'Service Provider Id' }
]

export const GroupSearch = ({ onSelect }) => {
  const Alert = useAlert()
  const [searchKey, setSearchKey] = React.useState('groupName')
  const [searchString, setSearchString] = React.useState('')
  const { serviceProviderId } = useSession()
  const [searchGroups, { data, loading, called, error }] = useLazyQuery(GROUP_LIST_QUERY, {
    fetchPolicy: 'cache-and-network'
  })

  const handleSearchKey = e => {
    setSearchKey(e.target.value)
  }
  const handleSearchString = e => {
    setSearchString(e.target.value)
  }

  const search = async e => {
    e.preventDefault()
    await searchGroups({
      variables: {
        [searchKey]: `*${searchString}*`,
        serviceProviderId
      }
    })
    if (error) Alert.danger(error)
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
      {called && loading && <UiLoading />}
      {called && !loading && (
        <UiDataTable
          columns={columns}
          rows={(data && data.groups) || []}
          rowKey="groupId"
          pageSize={50}
          onClick={onSelect}
        />
      )}
    </>
  )
}

GroupSearch.propTypes = {
  onSelect: PropTypes.func
}
