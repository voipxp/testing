import React from 'react'
import PropTypes from 'prop-types'
import { Field, Control, Button, Input, Select, Icon } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { UiLoading, UiDataTable } from '@/components/ui'
import { useAlerts } from '@/store/alerts'
import { useSession } from '@/store/session'
import { useAsyncCallback } from 'react-async-hook'

import groupApi from '@/api/groups'

const searchTypes = [
  { key: 'groupName', name: 'Group Name' },
  { key: 'groupId', name: 'Group ID' }
]

const columns = [
  { key: 'groupId', label: 'Group Id' },
  { key: 'groupName', label: 'Group Name' },
  { key: 'serviceProviderId', label: 'Service Provider Id' }
]

export const GroupSearch = ({ onSelect }) => {
  const { alertDanger } = useAlerts()
  const [searchKey, setSearchKey] = React.useState('groupName')
  const [searchString, setSearchString] = React.useState('')
  const [initialized, setInitialized] = React.useState(false)
  const { session } = useSession()
  const { serviceProviderId } = session

  const { execute, result, loading, error } = useAsyncCallback(() =>
    groupApi.search({ [searchKey]: `*${searchString}*`, serviceProviderId })
  )
  if (error) alertDanger(error)

  const handleSearchKey = e => {
    setSearchKey(e.target.value)
  }
  const handleSearchString = e => {
    setSearchString(e.target.value)
  }

  const search = async e => {
    e.preventDefault()
    await execute()
    setInitialized(true)
  }

  const SearchResults = () => {
    return loading ? (
      <UiLoading />
    ) : (
      <UiDataTable
        columns={columns}
        rows={result || []}
        rowKey="groupId"
        pageSize={50}
        onClick={onSelect}
      />
    )
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
      {initialized ? <SearchResults /> : ''}
    </>
  )
}

GroupSearch.propTypes = {
  onSelect: PropTypes.func
}
