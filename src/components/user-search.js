import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Field, Control, Button, Input, Select, Icon } from 'rbx'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Modal, Spinner, Table } from '/components/ui'
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
  { key: 'userIdShort', label: 'Id' },
  { key: 'lastName', label: 'Last' },
  { key: 'firstName', label: 'First' },
  { key: 'phoneNumber', label: 'Phone' },
  { key: 'extension', label: 'Ext' },
  { key: 'serviceProviderId', label: 'Service Provider' },
  { key: 'groupId', label: 'Group' }
]

const UserSearch = ({ isOpen, onClose, dispatch, history }) => {
  const [state, setState] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState
    }),
    {
      searchKey: 'lastName',
      searchString: '',
      loading: false,
      users: [],
      initialized: false
    }
  )

  const handleInput = e => {
    setState({ [e.target.name]: e.target.value })
  }

  const openUser = user => {
    const path = [
      '/users',
      user.serviceProviderId,
      user.groupId,
      user.userId
    ].join('/')
    history.push(path)
    onClose()
  }

  const search = async () => {
    const { searchKey, searchString } = state
    setState({ loading: true, initialized: true })
    try {
      const query =
        searchKey === 'macAddress' ? searchString : `*${searchString}*`
      const users = await User.search({ [searchKey]: query })
      setState({ users })
    } catch (error) {
      dispatch(alertDanger(error))
    } finally {
      setState({ loading: false })
    }
  }

  return (
    <Modal title="User Search" isOpen={isOpen} onCancel={onClose}>
      <form style={{ marginBottom: '1rem' }}>
        <Field kind="addons">
          <Control>
            <Select.Container>
              <Select
                disabled={state.loading}
                value={state.searchKey}
                onChange={handleInput}
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
              onChange={handleInput}
              disabled={state.loading}
              name="searchString"
              value={state.searchString}
              autoFocus
            />
          </Control>
          <Control>
            <Button
              type="submit"
              state={state.loading ? 'loading' : ''}
              disabled={
                !state.searchString || !state.searchKey || state.loading
              }
              onClick={search}
            >
              <Icon size="small" align="left">
                <FontAwesomeIcon icon={faSearch} />
              </Icon>
            </Button>
          </Control>
        </Field>
      </form>
      {!state.initialized ? (
        ''
      ) : state.loading ? (
        <Spinner />
      ) : (
        <Table
          columns={columns}
          rows={state.users}
          rowKey="userId"
          pageSize={25}
          onClick={openUser}
        />
      )}
    </Modal>
  )
}

UserSearch.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  dispatch: PropTypes.func,
  history: PropTypes.object
}

export default withRouter(connect()(UserSearch))
