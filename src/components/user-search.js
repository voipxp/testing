import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Field, Control, Button, Input, Select, Icon } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { UiLoading, UiDataTable } from '@/components/ui'
import { useAlert, useForm, useSession } from '@/utils'
import { useLazyQuery } from '@apollo/react-hooks'
import { USER_LIST_QUERY } from '@/graphql'

const searchTypes = [
  { key: 'phoneNumber', name: 'Phone Number' },
  { key: 'extension', name: 'Extension' },
  { key: 'lastName', name: 'Last Name' },
  { key: 'firstName', name: 'First Name' },
  { key: 'emailAddress', name: 'Email Address' },
  { key: 'userId', name: 'User ID' },
  { key: 'macAddress', name: 'MAC Address' }
]

const columns = [
  { key: 'userId', label: 'User Id' },
  { key: 'lastName', label: 'Last' },
  { key: 'firstName', label: 'First' },
  { key: 'phoneNumber', label: 'Phone' },
  { key: 'extension', label: 'Extension' },
  { key: 'serviceProviderId', label: 'Service Provider' },
  { key: 'groupId', label: 'Group' }
]

export const UserSearch = ({ onSelect }) => {
  const Alert = useAlert()

  const ref = useRef()
  const initialForm = { key: 'lastName', value: '' }
  const { form, onChange, isValid } = useForm(initialForm, ref)

  const session = useSession()
  const { serviceProviderId, groupId } = session

  const [search, { data, loading, called, error }] = useLazyQuery(USER_LIST_QUERY, {
    fetchPolicy: 'cache-and-network'
  })

  const searchUser = async e => {
    e.preventDefault()
    const { key, value } = form
    const query = key === 'macAddress' ? value : `*${value}*`
    const variables = { [key]: query, serviceProviderId, groupId }
    await search({ variables })
    if (error) Alert.danger(error)
  }

  return (
    <>
      <form style={{ marginBottom: '1rem' }} onSubmit={searchUser} ref={ref}>
        <Field kind="addons">
          <Control>
            <Select.Container>
              <Select disabled={loading} value={form.key} onChange={onChange} name="key" required>
                {searchTypes.map(type => (
                  <Select.Option key={type.key} value={type.key}>
                    {type.name}
                  </Select.Option>
                ))}
              </Select>
            </Select.Container>
          </Control>
          <Control expanded>
            <Input
              type="search"
              placeholder="search"
              onChange={onChange}
              disabled={loading}
              name="value"
              value={form.value}
              autoFocus
              required
            />
          </Control>
          <Control>
            <Button type="submit" state={loading ? 'loading' : ''} disabled={!isValid || loading}>
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
          rows={(data && data.users) || []}
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
