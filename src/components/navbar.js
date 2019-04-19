import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useReduxDispatch, useReduxState } from 'reactive-react-redux'
import { withRouter } from 'react-router-dom'
import { Navbar } from 'rbx'
import { clearSession, hasLevel } from '/store/session'
import { UiModalCard } from '/components/ui'
import { stringify } from 'query-string'
import UserSearch from './user-search'
import SystemDnSearch from './system-dn-search'
import GroupSearch from './group-search'

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

// TODO: Extract this into a helper
const userPath = user => {
  const path = userTypes[user.userType || 'Normal']
  if (!path) return
  if (path === 'users') {
    return `/users/${user.serviceProviderId}/${user.groupId}/${user.userId}`
  } else {
    return `/groups/${user.serviceProviderId}/${
      user.groupId
    }/${path}?${stringify({ serviceUserId: user.userId })}`
  }
}

const groupPath = group => {
  return `/groups/${group.serviceProviderId}/${group.groupId}`
}

const AppNavbar = ({ history }) => {
  const state = useReduxState()
  const dispatch = useReduxDispatch()

  const { apiUrl, applications } = state.ui
  const { loginType, userId } = state.session
  const { pageTitle } = state.ui.template

  const hasGroup = hasLevel(loginType, 'Group')
  const hasServiceProvider = hasLevel(loginType, 'Service Provider')

  const [showMenu, updateShowMenu] = useState(false)
  const [search, setSearch] = useState()

  const toggleMenu = () => updateShowMenu(!showMenu)

  const logout = () => dispatch(clearSession())

  const openAccount = () => {
    updateShowMenu(false)
    history.push('/account')
  }

  const openSearch = type => {
    updateShowMenu(false)
    setSearch(type)
  }

  const openApplication = application => {
    updateShowMenu(false)
    // TODO: add token getter
    const url = application.url
    if (application.window) {
      window.open(url, '_blank', 'noopener')
    } else {
      window.open(url, '_self')
    }
  }

  const openUser = user => {
    setSearch(null)
    history.push(userPath(user))
  }

  const openGroup = group => {
    setSearch(null)
    history.push(groupPath(group))
  }

  return (
    <>
      <Navbar color="link" managed active={showMenu}>
        <Navbar.Brand>
          <Navbar.Item href="/">
            <img
              src={`${apiUrl}/ui/images/imageIcon.png?size=50x51`}
              alt="odin Web"
            />
          </Navbar.Item>
          <Navbar.Burger color="link" onClick={toggleMenu} />
        </Navbar.Brand>
        <Navbar.Menu>
          <Navbar.Segment align="start">
            <Navbar.Item href="/">
              {pageTitle} ({userId})
            </Navbar.Item>
          </Navbar.Segment>
          <Navbar.Segment align="end">
            {applications.length > 0 && (
              <Navbar.Item dropdown hoverable>
                <Navbar.Link>Applications</Navbar.Link>
                <Navbar.Dropdown boxed>
                  {applications.map(application => (
                    <Navbar.Item
                      key={application.id}
                      onClick={() => openApplication(application)}
                    >
                      {application.name}
                    </Navbar.Item>
                  ))}
                </Navbar.Dropdown>
              </Navbar.Item>
            )}

            {hasGroup && (
              <Navbar.Item dropdown hoverable>
                <Navbar.Link>Search</Navbar.Link>
                <Navbar.Dropdown boxed>
                  <Navbar.Item onClick={() => openSearch('user')}>
                    Users
                  </Navbar.Item>
                  <Navbar.Item onClick={() => openSearch('dn')}>
                    Phone Numbers
                  </Navbar.Item>
                  {hasServiceProvider && (
                    <>
                      <Navbar.Item onClick={() => openSearch('group')}>
                        Groups
                      </Navbar.Item>
                      <Navbar.Item onClick={() => openSearch('service')}>
                        Services
                      </Navbar.Item>
                    </>
                  )}
                </Navbar.Dropdown>
              </Navbar.Item>
            )}

            <Navbar.Item dropdown hoverable>
              <Navbar.Link>My Account</Navbar.Link>
              <Navbar.Dropdown boxed>
                <Navbar.Item onClick={openAccount}>Profile</Navbar.Item>
                <Navbar.Divider />
                <Navbar.Item onClick={logout}>Logout</Navbar.Item>
              </Navbar.Dropdown>
            </Navbar.Item>
          </Navbar.Segment>
        </Navbar.Menu>
      </Navbar>

      {hasGroup && (
        <>
          <UiModalCard
            title="User Search"
            isOpen={search === 'user'}
            onCancel={() => setSearch()}
          >
            <UserSearch onSelect={openUser} />
          </UiModalCard>
          <UiModalCard
            title="DN Search"
            isOpen={search === 'dn'}
            onCancel={() => setSearch()}
          >
            <SystemDnSearch onSelect={openUser} />
          </UiModalCard>
        </>
      )}
      {hasServiceProvider && (
        <>
          <UiModalCard
            title="Group Search"
            isOpen={search === 'group'}
            onCancel={() => setSearch()}
          >
            <GroupSearch onSelect={openGroup} />
          </UiModalCard>
          <UiModalCard
            title="Service Service"
            isOpen={search === 'service'}
            onCancel={() => setSearch()}
          >
            <p>Group Search</p>
          </UiModalCard>
        </>
      )}
    </>
  )
}

AppNavbar.propTypes = {
  history: PropTypes.object
}

export default withRouter(AppNavbar)
