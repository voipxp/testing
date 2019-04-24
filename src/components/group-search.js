import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Field, Control, Button, Input, Select, Icon } from 'rbx'
import { useReduxDispatch } from 'reactive-react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { UiSpinner, UiDataTable } from '@/components/ui'
import { alertDanger } from '@/store/alerts'
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

const GroupSearch = ({ onSelect }) => {
  const dispatch = useReduxDispatch()

  const [searchKey, setSearchKey] = useState('groupName')
  const [searchString, setSearchString] = useState('')
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(false)
  const [initialized, setInitialized] = useState(false)

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
      const groups = await groupApi.search({ [searchKey]: `*${searchString}*` })
      setGroups(groups)
    } catch (error) {
      dispatch(alertDanger(error))
      setGroups([])
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
        <UiSpinner />
      ) : (
        <UiDataTable
          columns={columns}
          rows={groups}
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

export default GroupSearch